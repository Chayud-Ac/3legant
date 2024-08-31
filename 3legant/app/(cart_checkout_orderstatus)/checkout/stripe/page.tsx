"use client";

import StripeCheckOut from "@/components/form/StripeCheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { convertToSubcurrency } from "@/lib/utils";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is undefined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const page = () => {
  const cart = useSelector((state: RootState) => state.cart);

  // Check if totalCartAmount is meaningful
  const isAmountValid = cart.totalCartAmount > 0;

  console.log(cart.totalCartAmount);

  return (
    <div className="flex flex-col items-center w-full max-w-[1440px] pt-10">
      {isAmountValid ? (
        <div className="flex flex-col items-center w-full max-w-[500px]">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(cart.totalCartAmount),
              currency: "usd",
            }}
          >
            <StripeCheckOut amount={cart.totalCartAmount} />
          </Elements>
        </div>
      ) : (
        <div>Loading or invalid amount...</div> // apply Loading later
      )}
    </div>
  );
};

export default page;
