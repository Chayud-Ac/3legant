import CartItemListDesktop from "@/components/list/CartItemListDesktop";
import CartItemListMoblie from "@/components/list/CartItemListMoblie";
import CartSummary from "@/components/shared/CartSummary";
import Coupon from "@/components/shared/Coupon";
import React from "react";

async function getDeliveryOptions() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart/delivery-options`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("cannot fetch the deliveryOptions");
  }
}

const page = async () => {
  const { delivery } = await getDeliveryOptions();

  const parseDelivery = JSON.parse(JSON.stringify(delivery));

  return (
    <div className="flex flex-col gap-10 justify-center w-full py-10 max-w-[1440px] xl:flex-row max-xl:items-center sm:gap-20">
      <div className="flex flex-col justify-start gap-10 sm:gap-6 w-full    xl:max-w-[600px] max-xl:items-center">
        <CartItemListMoblie otherClasses="sm:hidden" />
        <CartItemListDesktop />
      </div>
      <CartSummary deliveryOptions={parseDelivery} />
    </div>
  );
};

export default page;
