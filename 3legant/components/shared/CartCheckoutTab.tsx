"use client";

import { cartTabContent } from "@/constant";
import { convertPathToWord } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const getBackgroundColorClass = (
  index: number,
  firstIndex: number,
  lastIndex: number,
  isActive: boolean,
  orderComplete: boolean
) => {
  if (index !== firstIndex && !orderComplete && !isActive) return "bg-grey-3"; // ไม่ไช่ Tab แรก ให้เป็นสีเทาหมด
  if (orderComplete || (index !== lastIndex && !isActive))
    return "bg-accent-green"; // ไม่ไช่ Tab สุดท่าย ให้เป็นสีเขียว
  if (isActive && !orderComplete) return "bg-dark-1";
};

const getTextColorClass = (
  index: number,
  firstIndex: number,
  lastIndex: number,
  isActive: boolean,
  orderComplete: boolean
) => {
  if (index !== firstIndex && !orderComplete && !isActive) return "text-grey-3"; // ไม่ไช่ Tab แรก ให้เป็นสีเทาหมด
  if (orderComplete || (index !== lastIndex && !isActive))
    return "text-accent-green"; // ไม่ไช่ Tab สุดท่าย ให้เป็นสีเขียว
  if (isActive && !orderComplete) return "text-dark-1";
};

const CartCheckoutTab = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState(pathname);
  const searchParams = useSearchParams();
  // redirect_status

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const parentPath = `/${segments[0] || ""}`;
    setCurrentTab(parentPath);
  }, [pathname, searchParams]);

  console.log(currentTab);
  return (
    <>
      <h1 className="h3-medium text-dark-1">{convertPathToWord(pathname)}</h1>
      <div className="flex sm:flex-row justify-between items-center w-full max-w-[900px] pt-10">
        {cartTabContent.map((tab, index) => {
          const isActive = tab.path === currentTab;
          const firstIndex = 0; // ถ้าไม่ใช่ first index เราจะ ให้เป็น สี เทาหมด
          const lastIndex = cartTabContent.length - 1; // ถ้าไม่ใช่ last index เราจะ ให้เป็น สี เขียว
          const orderComplete =
            searchParams.get("redirect_status") === "succeeded";

          return (
            <div
              className="flex flex-col justify-start items-start gap-6 w-full max-w-[250px] max-md:hidden"
              key={index}
            >
              <div className="flex flex-row gap-5 justify-center items-center">
                <div
                  className={` rounded-full pt-2 pb-2 pl-4 pr-4 text-light-1  ${getBackgroundColorClass(index, firstIndex, lastIndex, isActive, orderComplete)} `}
                >
                  {tab.No}
                </div>
                <p
                  className={`medium-base  ${getTextColorClass(index, firstIndex, lastIndex, isActive, orderComplete)}   `}
                >
                  {tab.name}
                </p>
              </div>
              <span
                className={`w-full h-[2px] rounded-md     ${getBackgroundColorClass(index, firstIndex, lastIndex, isActive, orderComplete)}`}
              ></span>
            </div>
          );
        })}

        <div className="flex flex-row justify-between items-center md:hidden w-full">
          {cartTabContent.map((tab, index) => {
            const isActive = tab.path === currentTab;
            const firstIndex = 0; // ถ้าไม่ใช่ first index เราจะ ให้เป็น สี เทาหมด
            const lastIndex = cartTabContent.length - 1; // ถ้าไม่ใช่ last index เราจะ ให้เป็น สี เขียว
            const orderComplete =
              searchParams.get("redirect_status") === "succeeded";

            return (
              <React.Fragment key={index}>
                <div
                  className={`${!isActive && "hidden"} flex flex-col gap-3 w-full  ${orderComplete ? "items-center" : "items-start"}`}
                >
                  <div
                    className={`flex flex-row items-center  w-full ${orderComplete ? "justify-center" : "justify-between"} `}
                  >
                    <div className="flex flex-row gap-5 justify-center items-center">
                      <div
                        className={` rounded-full pt-2 pb-2 pl-4 pr-4 text-light-1 ${orderComplete ? "bg-accent-green" : "bg-dark-1"}`}
                      >
                        {tab.No}
                      </div>
                      <p
                        className={`medium-base  ${orderComplete ? "text-accent-green" : "text-dark-1"} `}
                      >
                        Shopping Cart
                      </p>
                    </div>
                    <div
                      className={`rounded-full pt-2 pb-2 pl-4 pr-4 text-light-1   ${index === lastIndex ? "hidden" : "block"} bg-grey-3`}
                    >
                      {tab.No + 1}
                    </div>
                  </div>

                  <span
                    className={`w-full h-[2px] rounded-md max-w-[270px]  ${orderComplete ? "bg-accent-green" : "bg-dark-1"}`}
                  ></span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CartCheckoutTab;
