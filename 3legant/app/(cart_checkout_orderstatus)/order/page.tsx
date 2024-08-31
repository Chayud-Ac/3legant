import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1440px] py-10 ">
      <div className="flex flex-col items-center justify-center gap-10 bg-light-2 px-[36px] py-[60px]  md:px-[76px]  md:py-[80px] shadow-lg max-w-[738px] max-h-[730px] w-full">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="bold-2xl text-grey-2 md:h6-medium text-center">
            Thank you! 🎉
          </span>
          <h1 className="bold-xl text-dark-2 text-center md:h6-medium">
            Your order has been received
          </h1>
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <Image
            src="/assets/images/thumnail_test.svg"
            alt="test"
            width={80}
            height={96}
            className="max-w-[80px] max-h-[96] rounded-md"
          />
          <Image
            src="/assets/images/thumnail_test.svg"
            alt="test"
            width={80}
            height={96}
            className="max-w-[80px] max-h-[96] rounded-md"
          />
          <Image
            src="/assets/images/thumnail_test.svg"
            alt="test"
            width={80}
            height={96}
            className="max-w-[80px] max-h-[96] rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <div className="flex flex-row gap-20 w-full  ">
            <span className="medium-sm text-grey-2">Order code:</span>
            <span className="medium-sm text-dark-2">#0123_456789</span>
          </div>
          <div className="flex flex-row justify-between w-full  ">
            <span className="medium-sm text-grey-2">Date:</span>
            <span className="medium-sm text-dark-2">October 19, 2023</span>
          </div>
          <div className="flex flex-row justify-between w-full  ">
            <span className="medium-sm text-grey-2">Total:</span>
            <span className="medium-sm text-dark-2">$1,345.00</span>
          </div>
          <div className="flex flex-row justify-between w-full  ">
            <span className="medium-sm text-grey-2">Payment method:</span>
            <span className="medium-sm text-dark-2">Credit Card</span>
          </div>
        </div>
        <Link
          href="/history"
          className="flex btn-primary rounded-full max-w-[200px] items-center justify-center py-3 px-6 regular-xs text-light-2"
        >
          Purchase history
        </Link>
      </div>
    </div>
  );
};

export default page;
