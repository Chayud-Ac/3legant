"use client";
import React, { useState, createElement } from "react";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Box } from "@/components/ui/box";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

const Coupon = () => {
  return (
    <div className="flex flex-col gap-1 justify-start items-start max-w-[424px]">
      <p className="medium-xl text-dark-2">Have a coupon?</p>
      <p className="regular-base text-grey-1">
        Add your code for an instant cart discount
      </p>
      <Box className="relative w-full mt-2 pt-1 pb-1 border-[2px] border-grey-2 ">
        <Box
          className="absolute inset-y-0 left-0 flex cursor-pointer items-center p-3 text-muted-foreground"
          onClick={() => {}}
        >
          <Image
            src="/assets/icons/ticket-percent.svg"
            alt="coupon"
            width={24}
            height={24}
            className="w-auto h-auto"
          />
        </Box>
        <Input
          type="text"
          placeholder="Coupon Code"
          className="ml-10 border-none focus:outline-none focus-visible:ring-0 regular-lg"
        />
        <Box
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center  text-muted-foreground"
          onClick={() => {}}
        >
          <span className="text-dark-5 font-poppins font-semibold  p-[10px] hover:bg-grey-2 duration-300 transition hover:text-light-1">
            Apply
          </span>
        </Box>
      </Box>
    </div>
  );
};

export default Coupon;
