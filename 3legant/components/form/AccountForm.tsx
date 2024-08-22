import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";

import { AccountFormSchema } from "@/lib/validation";
import Link from "next/link";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";

const AccountForm = () => {
  const form = useForm<z.infer<typeof AccountFormSchema>>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      emailAddress: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AccountFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex flex-col gap-3 w-full md:flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-5 px-10 py-5 ">
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
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <span className="text-grey-1 medium-xs">EMAIL ADDRESS</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="btn-primary max-w-[200px]">Save Change</Button>
            <div className="flex flex-row items-center gap-2">
              <p className="regular-xs text-grey-2">
                Do you want to reset pass word ?
              </p>
              <Link
                href="/password"
                className="regular-xs text-dark-1 underline cursor-pointer"
              >
                Click here
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;
