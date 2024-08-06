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
import { SignInFormSchema } from "@/lib/validation";

const Page = () => {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    console.log(values);
  }

  return (
    <section className="sm:w-[465px]">
      <div>
        <Form {...form}>
          <div className="flex flex-col gap-6">
            <p className="h4-medium">Sign In</p>
            <p className="regular-base text-grey-1">
              Don't have an account yet?{" "}
              <Link href="/sign-up">
                <span className="text-accent-green medium-base">Sign up</span>{" "}
              </Link>
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your username or email address"
                      {...field}
                    />
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
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms2" />
                <label
                  htmlFor="terms2"
                  className="text-sm regular-base text-grey-1 leading-none"
                >
                  Remember me
                </label>
              </div>
              <p className="medium-sm text-dark-1">Forgot password?</p>
            </div>
            <Button type="submit" className="w-full text-light-2 bg-dark-1">
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Page;
