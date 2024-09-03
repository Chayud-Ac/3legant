"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import GlobalSearchResult from "./GlobalSearchResult";

interface SearchInputProps {
  iconPosition: string;
  placeHolder: string;
}

const SearchMobile = ({ iconPosition, placeHolder }: SearchInputProps) => {
  const [isActive, setIsActive] = useState(false); // โชว์ตัว result
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        //@ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isActive]);

  return (
    <div className="flex flex-col relative" ref={searchContainerRef}>
      <div className="flex grow items-center border rounded-md">
        {iconPosition === "left" && (
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={14}
            height={14}
            className="cursor-pointer ml-3"
          />
        )}
        <div className="flex-1">
          <Input
            value={search}
            className="border-none shadow-none outline-none no-focus text-dark-2 regular-base z-20"
            placeholder={placeHolder}
            onChange={(e) => {
              setLoading(true);
              setSearch(e.target.value);
              if (!isActive) setIsActive(true);
              if (e.target.value === "" && isActive) setIsActive(false);
            }}
          />
        </div>

        {iconPosition === "right" && (
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
        )}
      </div>
      <GlobalSearchResult
        isActive={isActive}
        setIsActive={setIsActive}
        loading={loading}
        setLoading={setLoading}
        search={search}
        isGlobalSearchActive={true} // ตาม design มันโชว์ตัว input ตลอดอยู่แล้ว
        className="z-10 w-full"
      />
    </div>
  );
};

export default SearchMobile;
