"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ContactForm from "./ContactForm";
import { CheckOutFromSchema } from "@/lib/validation";
import AddressForm from "./AddressFrom";
import OrderSummary from "../shared/OrderSummary";
import Link from "next/link";
import Coupon from "../shared/Coupon";

const CheckoutForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof CheckOutFromSchema>>({
    resolver: zodResolver(CheckOutFromSchema),
    defaultValues: {
      contact: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailAddress: "",
      },
      address: {
        street: "",
        country: "",
        city: "",
        state: "",
        zipCode: 0,
      },
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CheckOutFromSchema>) {
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
          <ContactForm control={form.control} />
          <AddressForm control={form.control} />
        </form>
      </Form>
      <div className="flex flex-col gap-5 w-full items-center">
        <OrderSummary />
        <Link href="/payment" className="w-full max-w-[550px]">
          <Button type="submit" className="btn-primary w-full">
            placeorder
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutForm;
{
  /* <Button type="submit">Submit</Button> */
}
