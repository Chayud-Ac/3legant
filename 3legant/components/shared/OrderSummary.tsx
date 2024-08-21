"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const OrderSummary = () => {
  const cart = useSelector((state: RootState) => state.cart);

  console.log(cart);
  return (
    <div className=" flex flex-col gap-8 w-full max-w-[550px] border border-dark-2 rounded-lg p-6 h-fit">
      <div className="flex flex-col gap-5 w-full">
        <h2 className="medium-3xl">Order Summary</h2>
        <div className={`flex flex-col justify-center w-full gap-5 pt-5`}>
          {cart.items.map((item) => (
            <div className="flex flex-row justify-between w-full items-center">
              <div className="flex flex-row gap-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${item.category}/${item.slug}/${item.color}.svg`}
                  alt={item.slug}
                  width={80}
                  height={96}
                  className="max-w-[80px] max-h-[96] rounded-md"
                />
                <div className="flex flex-col gap-3  justify-start">
                  <p className="medium-sm text-dark-1">{item.name}</p>
                  <p className="regular-xs text-grey-2">
                    Color : {item.color.toUpperCase()}
                  </p>
                  <div className="flex p-2 bg-grey-2 rounded-3xl items-center justify-center w-20">
                    <span className="text-light-1 medium-base text-center">
                      {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-[50px]  ">
                <p className="medium-sm text-dark-1">${item.totalItemsPrice}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <span className="regular-sm text-dark-2">Subtotal</span>
            <span className="medium-sm text-dark-2">$1234.00</span>
          </div>
          <span className="w-full h-[1px] bg-grey-1"></span>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/assets/icons/ticket-percent.svg"
                alt="coupon"
                width={24}
                height={24}
                className="w-auto h-auto"
              />
              <span className="regular-sm">CouponName</span>
            </div>
            <span className="medium-sm text-accent-green">-25$ [Remove]</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/assets/icons/fast_delivery.svg"
                alt="coupon"
                width={24}
                height={24}
                className="w-auto h-auto"
              />
              <span className="regular-sm">Delivery</span>
            </div>
            <span className="medium-sm text-accent-green">
              $0 (Free Shipping)
            </span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="medium-xl text-dark-2">Total</span>
            <span className="medium-lg text-dark-2">$1345.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
