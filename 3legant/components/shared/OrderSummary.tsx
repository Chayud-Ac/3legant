"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  applyCouponServerAction,
  removeCouponServerAction,
} from "@/lib/actions/cartaction.action";
import { applyCoupon, removeCoupon } from "@/store/slices/cartSlice";
import { useToast } from "../ui/use-toast";

const OrderSummary = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const coupon = cart.coupon;
  const deliveryOption = cart.deliveryOption;

  const [subTotal, setSubTotal] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const { toast } = useToast();

  const handleRemoveCoupon = async () => {
    try {
      if (cart.cartId) {
        const result = await removeCouponServerAction({
          cartId: cart.cartId,
        });

        if (result.success) {
          const { data } = result;

          dispatch(
            removeCoupon({
              totalCartAmount: data.newTotalCartAmount,
            })
          );
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const handleApplyCoupon = async () => {
    try {
      if (cart.cartId) {
        const result = await applyCouponServerAction({
          cartId: cart.cartId,
          code: couponCode,
        });

        if (result.success) {
          const { data } = result;

          dispatch(
            applyCoupon({
              code: data.code,
              discount: data.discount,
              newTotalCartAmount: data.newTotalCartAmount,
            })
          );
          setCouponCode("");
        } else {
          toast({
            title: result.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const calSubTotal =
      cart.totalCartAmount +
      (coupon?.discount || 0) -
      (deliveryOption?.price || 0);
    const ParseSubTotal = parseFloat(calSubTotal.toFixed(2));
    setSubTotal(ParseSubTotal);
  }, [cart.coupon]);

  return (
    <div className=" flex flex-col gap-8 w-full max-w-[550px] border border-dark-2 rounded-lg p-6 h-fit">
      <div className="flex flex-col gap-5 w-full">
        <h2 className="medium-3xl">Order Summary</h2>
        <div className={`flex flex-col justify-center w-full gap-5 pt-5`}>
          {cart.items.map((item, index) => (
            <div
              className="flex flex-row justify-between w-full items-center"
              key={index}
            >
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

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row w-full items-center gap-2">
            <div className="flex flex-col w-full relative">
              <Input
                placeholder="Having Coupon ? (1 per cart)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
            <Button
              className="btn-primary text-light-2 regular-sm"
              onClick={handleApplyCoupon}
            >
              Apply
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {coupon.code && (
              <>
                <span className="w-full h-[1px] bg-grey-4"></span>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      src="/assets/icons/ticket-percent.svg"
                      alt="coupon"
                      width={24}
                      height={24}
                      className="w-auto h-auto"
                    />
                    <span className="regular-sm">{coupon.code}</span>
                  </div>

                  <div className="flex flex-row gap-2 items-center justify-center">
                    <span className="medium-sm text-accent-green">
                      ${coupon.discount} ({coupon.code})
                    </span>
                    <Image
                      src="/assets/icons/remove.svg"
                      alt="remove"
                      width={20}
                      height={20}
                      className="w-auto h-auto max-w-[20px] max-h-[20px]"
                      onClick={handleRemoveCoupon}
                    />
                  </div>
                </div>
              </>
            )}

            <span className="w-full h-[1px] bg-grey-4"></span>
            <div className="flex flex-row justify-between items-center">
              <span className="regular-lg text-dark-2">Shipping</span>
              <span className="regular-base text-dark-2">
                ${deliveryOption.price}
              </span>
            </div>
            <span className="w-full h-[1px] bg-grey-4"></span>
            <div className="flex flex-row justify-between items-center">
              <span className="regular-lg text-dark-2">Subtotal</span>
              <span className="regular-base text-dark-2">${subTotal}</span>
            </div>
            <span className="w-full h-[1px] bg-grey-4"></span>
            <div className="flex flex-row justify-between items-center">
              <span className="medium-xl text-dark-2">Total</span>
              <span className="medium-lg text-dark-2">
                ${cart.totalCartAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
