"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductAmountSelectionProps {
  otherClasses?: string;
  currentAmount: number;
  setCurrentAmount: (number: number) => void;
}

const ProductAmountSelection = ({
  otherClasses,
  currentAmount,
  setCurrentAmount,
}: ProductAmountSelectionProps) => {
  const handleIncrementAmount = () => {
    setCurrentAmount(currentAmount + 1);
  };
  const handleDecrementAmount = () => {
    if (currentAmount === 1) {
      return;
    }
    setCurrentAmount(currentAmount - 1);
  };
  return (
    <div
      className={`flex flex-row gap-6 items-center justify-center bg-grey-4 rounded-lg  ${otherClasses}`}
    >
      <Image
        // add the decrement amount function from redux
        onClick={() => handleDecrementAmount()}
        src="/assets/icons/minus.svg"
        alt="minus"
        width={20}
        height={20}
        className="w-auto h- cursor-pointer hover:bg-grey-3 rounded-md transition"
      />
      <div>{currentAmount}</div>
      <Image
        //add the currentAmount amount function from redux
        onClick={() => handleIncrementAmount()}
        src="/assets/icons/add.svg"
        alt="minus"
        width={20}
        height={20}
        className="w-auto h-auto cursor-pointer hover:bg-grey-3 rounded-md transition"
      />
    </div>
  );
};

export default ProductAmountSelection;
