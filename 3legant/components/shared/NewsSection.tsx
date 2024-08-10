import React from "react";
import TextLinkButton from "./TextLinkButton";

const NewsSection = () => {
  return (
    <div className="flex flex-col justify-center w-full max-w-[1560px] mx-auto md:flex-row">
      <div className="flex w-full max-w-[880px] h-auto">
        <img
          src="/assets/images/banner.svg"
          alt="News Banner"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex items-center bg-grey-5 w-full max-w-[880px] p-12 md:h-auto">
        <div className="flex flex-col p-8 gap-4">
          <p className="text-accent-blue bold-lg  md:bold-xl">
            SALE UP TO 35% OFF
          </p>
          <h2 className="h4-medium md:h3-medium">
            HUNDREDS of <br className="max-sm:hidden" />
            New lower prices
          </h2>
          <p className="regular-xl     md:regular-2xl">
            It’s more affordable than ever to give every{" "}
            <br className="max-sm:hidden" />
            room in your home a stylish makeover
          </p>
          <TextLinkButton title="Shop Now" href="/product" />
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
