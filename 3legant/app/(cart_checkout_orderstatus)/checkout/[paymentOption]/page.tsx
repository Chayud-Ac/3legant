import CheckoutForm from "@/components/form/CheckoutForm";
import StripePayment from "@/components/form/StripePayment";
import OrderSummary from "@/components/shared/OrderSummary";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-[1440px] py-10 ">
      <StripePayment />
    </div>
  );
};

export default page;
