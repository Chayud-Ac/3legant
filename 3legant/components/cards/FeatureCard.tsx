import Image from "next/image";
import React from "react";
import { FeatureCardProps } from "@/types";

const FeatureCard = ({ iconUrl, title, describtion }: FeatureCardProps) => {
  return (
    <div className="xl:w-[262px] lg:h-[220px] w-full h-auto p-4 bg-grey-4 flex flex-col justify-center items-center rounded-lg">
      <div>
        <Image
          src={iconUrl}
          alt={title}
          width={36}
          height={36}
          className="w-auto h-auto"
        />
        <div className="flex flex-col items-start mt-4 ">
          <h1 className="medium-sm lg:medium-xl text-dark-1 font-poppins">
            {title}
          </h1>
          <p className="regular-sm text-grey-1">{describtion}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
