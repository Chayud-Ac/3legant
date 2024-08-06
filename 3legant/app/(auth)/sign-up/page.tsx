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

const formSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string(),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Page;
