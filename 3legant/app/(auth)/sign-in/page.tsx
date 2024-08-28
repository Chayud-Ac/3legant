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
import { SignInFormSchema } from "@/lib/validation";
import { PasswordField } from "@/components/shared/PasswordField";
import { Spinner } from "@/components/shared/Spinner";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    setLoading(true);
    const { email, password, remember } = values;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        remember,
      });

      if (res?.error) {
        toast({
          title: "Invalid email or password",
        });
      } else {
        router.push("/");
      }
      toast({
        title: "Login Sucessful",
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialLogin(social: string) {
    const res = await signIn(social, { callbackUrl: "/" });
    console.log(res);
  }

  return (
    <>
      <div className="sm:w-[465px]"></div>
      <Form {...form}>
        <div className="flex flex-col gap-[24px]">
          <p className="h4-medium">Sign In</p>
          <p className="regular-base text-grey-1">
            Don't have an account yet?{" "}
            <Link href="/sign-up">
              <span className="text-accent-green medium-base">Sign Up</span>{" "}
            </Link>
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-[32px] mt-[32px] w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your email address" {...field} />
                </FormControl>

                <FormMessage className="medium-xs" />
              </FormItem>
            )}
          />

          <PasswordField name="password" placeholder="Password" />

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between ">
                <div className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm regular-base text-grey-1 leading-none">
                    Remeber me
                  </FormLabel>
                </div>
                <div className="text-sm regular-base text-dark-1 medium-sm">
                  Forget Password?
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full btn-primary">
            {loading ? <Spinner size="small" /> : `Sign In`}
          </Button>
        </form>
      </Form>
      <div className="mt-6">
        <button
          onClick={() => {
            handleSocialLogin("google");
          }}
          className="flex w-full items-center border border-gray-300 justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <FcGoogle />
          <span className="text-sm font-semibold leading-6">Google</span>
        </button>
      </div>
    </>
  );
};

export default Page;
