"use client";

import Image from "next/image";

interface ProductAmountSelectionProps {
  otherClasses?: string;
}

const ProductAmountSelection = ({
  otherClasses,
}: ProductAmountSelectionProps) => {
  return (
    <div
      className={`flex flex-row gap-6 items-center justify-center bg-grey-4 rounded-lg  ${otherClasses}`}
    >
      <Image
        // add the decrement amount function from redux
        onClick={() => {}}
        src="/assets/icons/minus.svg"
        alt="minus"
        width={20}
        height={20}
        className="w-auto h-auto cursor-pointer hover:bg-grey-3 rounded-full transition"
      />
      <div>1</div>
      <Image
        //add the currentAmount amount function from redux
        onClick={() => {}}
        src="/assets/icons/add.svg"
        alt="minus"
        width={20}
        height={20}
        className="w-auto h-auto cursor-pointer hover:bg-grey-3 rounded-full transition"
      />
    </div>
  );
};

export default ProductAmountSelection;
