"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { SignUpFormSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/shared/Spinner";
import { useToast } from "@/components/ui/use-toast";
import { PasswordField } from "@/components/shared/PasswordField";

const Page = () => {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      privacy: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    setLoading(true);
    const formData = values;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 400) {
        toast({
          title: "Email already used",
        });
      }

      if (response.status === 200) {
        toast({
          title: "Register successful",
        });
        router.push("/sign-in");
      }
    } catch (error) {
      throw error;
    }

    setLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col gap-[24px]">
          <p className="h4-medium">Sign up</p>
          <p className="regular-base text-grey-1">
            Already have an Account?{" "}
            <Link href="/sign-in">
              <span className="text-accent-green medium-base">Sign In</span>{" "}
            </Link>
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-[32px] mt-[32px] w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>

                <FormMessage className="medium-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>

                <FormMessage className="medium-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage className="medium-xs" />
              </FormItem>
            )}
          />
          <PasswordField name="password" placeholder="Password" />

          <FormField
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <FormItem className="flex flex-row  space-x-3 space-y-0 items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm regular-base text-grey-1 leading-none">
                    I agree with{" "}
                    <span className="medium-sm text-dark-1">
                      Privacy Policy
                    </span>{" "}
                    and{" "}
                    <span className="medium-sm text-dark-1">Terms of Use</span>
                  </FormLabel>
                  <FormMessage className="medium-xs" />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full btn-primary">
            {loading ? <Spinner size="small" /> : `Sign up`}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Page;
