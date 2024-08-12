import React from "react";
import Image from "next/image";

const JoinUsNews = () => {
  return (
    <div className="flex relative w-full h-full items-center justify-center min-h-[360px] ">
      <img
        src="/assets/images/news.svg"
        alt="news"
        width={1440}
        height={360}
        className="w-full h-full min-h-[360px]  md:object-cover max-md:object-none"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 text-center max-sm:p-10">
        <p className="h5-medium">Join Our Newsletter</p>
        <p className="regular-base">
          Sign up for deals, new products and promotions
        </p>
      </div>
    </div>
  );
};

export default JoinUsNews;
