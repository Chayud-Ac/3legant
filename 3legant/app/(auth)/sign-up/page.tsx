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

const Page = () => {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
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
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="sm:w-[456px]">
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
            className="space-y-[32px] mt-[32px]"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>

                  <FormMessage />
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

                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
              <label
                htmlFor="terms2"
                className="text-sm regular-base text-grey-1 leading-none"
              >
                I agree with{" "}
                <span className="medium-sm text-dark-1">Privacy Policy</span>{" "}
                and <span className="medium-sm text-dark-1">Terms of Use</span>
              </label>
            </div>

            <Button type="submit" className="w-full text-light-2 bg-dark-1">
              {loading ? <Spinner size="small" /> : `Sign up`}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Page;
