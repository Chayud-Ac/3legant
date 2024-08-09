"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotificationBar = () => {
  return (
    <div className="w-full py-[9px] bg-grey-3">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image
          src="/assets/icons/ticket-percent.svg"
          alt="ticket"
          width={24}
          height={24}
        />
        <p className="medium-sm">30% off storewide - Limited time!</p>
        <div className="relative inline-flex items-center max-sm:hidden">
          <Link href="/product" className="flex flex-row gap-1">
            <h2 className="medium-sm text-accent-blue">Shop Now</h2>
            <Image
              src="/assets/icons/arrow-right-blue.svg"
              alt="arrow-right"
              width={18}
              height={18}
              className="w-auto h-auto"
            />
          </Link>
          <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent-blue"></span>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
