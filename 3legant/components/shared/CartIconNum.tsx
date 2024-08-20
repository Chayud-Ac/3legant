"use client";

import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

interface CartIconNumProps {
  disableLink?: boolean;
}

const CartIconNum = ({ disableLink }: CartIconNumProps) => {
  const cart = useSelector((state: RootState) => state.cart);
  const lengthCart = cart.items.length;

  console.log(lengthCart);
  return (
    <div
      className={`flex flex-row justify-between items-center ${cart && "w-[49px]"}`}
    >
      {disableLink ? (
        <Image
          src="/assets/icons/shopping_bag.svg"
          alt="cart"
          width={24}
          height={24}
        />
      ) : (
        <Link href="/cart">
          <Image
            src="/assets/icons/shopping_bag.svg"
            alt="cart"
            width={24}
            height={24}
          />
        </Link>
      )}

      {lengthCart > 0 && (
        <div className="bg-dark-1 border rounded-full w-[22px] h-[22px] flex items-center justify-center">
          <h2 className="text-white text-xs font-bold">{lengthCart}</h2>
        </div>
      )}
    </div>
  );
};

export default CartIconNum;
