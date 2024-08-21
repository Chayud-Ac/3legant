import CheckoutForm from "@/components/form/CheckoutForm";
import OrderSummary from "@/components/shared/OrderSummary";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-full max-w-[1440px] py-10 ">
      <CheckoutForm />
    </div>
  );
};

export default page;
