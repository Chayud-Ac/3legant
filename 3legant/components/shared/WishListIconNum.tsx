"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const WishListIconNum = () => {
  const [wishList, setWishList] = useState(1);
  return (
    <div
      className={`flex flex-row justify-between items-center ${wishList && "w-[49px]"}`}
    >
      <Link href="/cart">
        <Image
          src="/assets/icons/wishlist.svg"
          alt="cart"
          width={24}
          height={24}
        />
      </Link>
      {wishList > 0 && (
        <div className="bg-dark-1 border rounded-full w-[22px] h-[22px] flex items-center justify-center">
          <h2 className="text-white text-xs font-bold">{wishList}</h2>
        </div>
      )}
    </div>
  );
};

export default WishListIconNum;
