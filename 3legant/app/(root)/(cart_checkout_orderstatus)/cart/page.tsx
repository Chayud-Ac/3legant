import CartItemListDesktop from "@/components/list/CartItemListDesktop";
import CartItemListMoblie from "@/components/list/CartItemListMoblie";
import CartSummary from "@/components/shared/CartSummary";
import Coupon from "@/components/shared/Coupon";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-10 justify-center w-full py-10 max-w-[1440px] xl:flex-row max-xl:items-center sm:gap-10">
      <div className="flex flex-col justify-start gap-10 sm:gap-6 w-full    xl:max-w-[600px] max-xl:items-center">
        <CartItemListMoblie otherClasses="sm:hidden" />
        <CartItemListDesktop />
        <Coupon />
      </div>
      <CartSummary />
    </div>
  );
};

export default page;
