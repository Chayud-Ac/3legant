"use client";

import React, { useRef, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { createOrder } from "@/lib/actions/order.action";
import { log } from "console";
import { useOrder } from "@/context/OrderProvider";
import { Spinner } from "../shared/Spinner";

const CheckoutForm = () => {
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);

  const { orderId, setOrderId } = useOrder();

  console.log(orderId);

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

  async function onSubmit(values: z.infer<typeof CheckOutFromSchema>) {
    setLoading(true);
    try {
      if (user.id && cart.cartId) {
        const result = await createOrder({
          cartId: cart.cartId,
          userId: user.id,
          shippingAddress: values.address,
          contact: values.contact,
          paymentMethod: values.payment,
        });

        if (result.success) {
          const { data } = result;
          setOrderId(result.data.orderId);
        } else {
          // toast error
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }

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

          <AddressForm control={form.control} otherClasses="px-10 py-5" />

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
          disabled={loading}
        >
          {loading ? <Spinner size="small" /> : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutForm;
