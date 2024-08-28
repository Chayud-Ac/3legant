import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const CartSummary = () => {
  return (
    <div className=" flex flex-col gap-8 w-full max-w-[470px] border border-dark-2 rounded-lg p-6">
      <div className="flex flex-col gap-5 w-full">
        <h2 className="medium-3xl">Cart Summary</h2>
        <RadioGroup defaultValue="freeShipping">
          <div className="flex flex-row w-full justify-between items-center border-grey-1 border rounded-lg pl-4 pr-4 pt-3 pb-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="freeShipping" id="r1" />
              <Label htmlFor="r1" className="text-dark-1 regular-base">
                Free shipping
              </Label>
            </div>
            <span className="text-dark-1 regular-base">$0</span>
          </div>
          <div className="flex flex-row w-full justify-between items-center border-grey-1 border rounded-lg pl-4 pr-4 pt-3 pb-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expressShipping" id="r2" />
              <Label htmlFor="r1" className="text-dark-1 regular-base">
                Express shipping
              </Label>
            </div>
            <span className="text-dark-1 regular-base">$15.00</span>
          </div>
          <div className="flex flex-row w-full justify-between items-center border-grey-1 border rounded-lg pl-4 pr-4 pt-3 pb-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pickUp" id="r2" />
              <Label htmlFor="r1" className="text-dark-1 regular-base">
                Overnight Shipping
              </Label>
            </div>
            <span className="text-dark-1 regular-base">$30.00</span>
          </div>
        </RadioGroup>
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
            <span className="medium-lg text-dark-2">Total</span>
            <span className="medium-base text-dark-2">$1345.00</span>
          </div>
        </div>
      </div>
      <Link href="/checkout">
        <Button className="w-full btn-primary text-center ">Checkout</Button>
      </Link>
    </div>
  );
};

export default CartSummary;
