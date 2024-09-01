"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { convertToSubcurrency } from "@/lib/utils";
import { useOrder } from "@/context/OrderProvider";

interface StripeCheckOutProps {
  amount: number;
}

const StripeCheckOut = ({ amount }: StripeCheckOutProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { orderId, setOrderId } = useOrder();

  console.log(orderId);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        });

        if (response.ok) {
          const data = await response.json();
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (amount > 0) {
      createPaymentIntent();
    }
  }, [amount]);

  const handleSubmitPayment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // redirect ไป หน้า return_url ประเด็นคือ จะ อัปเดท document ก่อน redirect ก็ไม่ได้ งั้นไป อัปเดท หน้า orderId ละกัน
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/order?orderId=${orderId}`,
      },
    });

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmitPayment} className="p-2 rounded-md w-full">
      {clientSecret && (
        <div className="flex flex-col w-full items-center justify-center gap-5">
          <PaymentElement className="w-full" />
          <button
            disabled={!stripe || loading}
            className={`btn-primary text-light-2 medium-base w-full py-2 rounded-md disabled:opacity-50 disabled:animate-pulse transition-opacity duration-1000 ${clientSecret ? "opacity-100" : "opacity-0"}  `}
          >
            {!loading ? `Pay $${amount}` : "Processing..."}
          </button>
        </div>
      )}

      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default StripeCheckOut;
