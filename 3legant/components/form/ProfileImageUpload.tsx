"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ImageUploadFormSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "../ui/form";
import { useSession } from "next-auth/react";
import { getUserImage } from "@/lib/actions/user.action";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProfileImageUploadProps {
  userId: string;
}

const ProfileImageUpload = ({ userId }: ProfileImageUploadProps) => {
  const { data: session, update } = useSession();
  const [preview, setPreview] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<
    string | null | undefined
  >(null);

  const form = useForm<z.infer<typeof ImageUploadFormSchema>>({
    resolver: zodResolver(ImageUploadFormSchema),
    mode: "onBlur",
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue("image", file);
    }
  };

  const onSubmit = async (values: z.infer<typeof ImageUploadFormSchema>) => {
    console.log(values);
    const formData = new FormData();
    formData.append("image", values.image); // Append the image file
    formData.append("id", userId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${userId}/image_upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Upload successful!", responseData);
        setProfileImageUrl(responseData.publicUrl);
        update({ ...session!.user, image: responseData.publicUrl });
      } else {
        console.error("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    try {
      const fetchInitialImage = async () => {
        const result = await getUserImage({
          userId: userId,
        });
        if (result) {
          setProfileImageUrl(result.parseUser.image);
        }
      };

      fetchInitialImage();
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 justify-center items-center">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Avatar className="w-[100px] h-[100px]">
                      <AvatarImage
                        src={
                          preview ||
                          profileImageUrl ||
                          "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Image
                        src="/assets/icons/camera.svg"
                        alt="upload Image"
                        width={20}
                        height={20}
                        className="w-[30px] h-[30px] bg-dark-1 rounded-full p-1 absolute right-0 bottom-0 border-light-1 border-2"
                      />
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        handleImageChange(e);
                        field.onChange(e.target.files?.[0]);
                      }}
                    />
                  </div>
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="btn-primary medium-xs text-light-2 p-2 rounded-md"
            >
              Upload Image
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileImageUpload;
