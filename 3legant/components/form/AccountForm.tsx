import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import { AccountFormSchema } from "@/lib/validation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";
import { Spinner } from "../shared/Spinner";

interface AccountFormProps {
  userId: string;
}

async function getUser(userId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${userId}?q=account`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Cannot fetch the user");
    }
  } catch (error) {
    throw error;
  }
}

const AccountForm = ({ userId }: AccountFormProps) => {
  const pathname = usePathname();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const form = useForm<z.infer<typeof AccountFormSchema>>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser(userId);
        if (userData) {
          reset({
            firstName: userData.data.firstName || "",
            lastName: userData.data.lastName || "",
            displayName: userData.data.displayName || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUser();
  }, [userId, reset]);

  async function onSubmit(values: z.infer<typeof AccountFormSchema>) {
    setLoadingSubmit(true);

    try {
      const result = await updateUser({
        userId: userId,
        updateData: values,
        path: pathname,
      });

      if (result.success) {
        // toast
      } else {
        // toast
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full md:flex-row max-w-[900px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-5">
            <p className="text-dark-2 medium-xl">Account Details</p>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <span className="text-grey-1 medium-xs">FIRST NAME</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <span className="text-grey-1 medium-xs">LAST NAME</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <span className="text-grey-1 medium-xs">DISPLAY NAME</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Display name" {...field} />
                  </FormControl>
                  <FormDescription>
                    <span className="regular-xs text-grey-2 italic">
                      This will be how your name will be displayed in the
                      account section and in reviews
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="btn-primary max-w-[200px]"
              disabled={loadingSubmit}
            >
              {loadingSubmit ? <Spinner size="small" /> : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;
