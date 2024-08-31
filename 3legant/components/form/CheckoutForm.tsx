"use client";

import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ContactForm from "./ContactForm";
import { CheckOutFromSchema } from "@/lib/validation";
import AddressForm from "./AddressFrom";
import OrderSummary from "../shared/OrderSummary";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSelectionForm from "./PaymentSelectionForm";
import { useRouter } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is undefined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

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
      payment: "stripe",
    },
  });

  function onSubmit(values: z.infer<typeof CheckOutFromSchema>) {
    console.log("onSubmit called");
    console.log(values);

    console.log(values.payment);

    router.push(`/checkout/${values.payment}`);
  }

  const handlePlaceOrderClick = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full md:flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <ContactForm control={form.control} />
          <AddressForm control={form.control} />
          <PaymentSelectionForm control={form.control} />
          <Button type="submit" ref={submitButtonRef} className="hidden">
            Submit
          </Button>
        </form>
      </Form>
      <div className="flex flex-col gap-5 w-full items-center">
        <OrderSummary />
        <Button
          type="button"
          className="btn-primary w-full max-w-[550px]"
          onClick={handlePlaceOrderClick}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutForm;
