"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const WishListIconNum = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const lengthWishList = wishlist.items.length;

  return (
    <div
      className={`flex flex-row justify-between items-center ${lengthWishList && "w-[49px]"}`}
    >
      <Link href="/cart">
        <Image
          src="/assets/icons/wishlist.svg"
          alt="cart"
          width={24}
          height={24}
        />
      </Link>
      {lengthWishList > 0 && (
        <div className="bg-dark-1 border rounded-full w-[22px] h-[22px] flex items-center justify-center">
          <h2 className="text-white text-xs font-bold">{lengthWishList}</h2>
        </div>
      )}
    </div>
  );
};

export default WishListIconNum;
