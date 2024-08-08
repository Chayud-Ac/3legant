"use client";
import React from "react";
import { useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

interface SearchInputProps {
  iconPosition: string;
  placeHolder: string;
}

const SearchInput = ({ iconPosition, placeHolder }: SearchInputProps) => {
  return (
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
          className="border-none shadow-none outline-none no-focus text-dark-2 regular-base"
          placeholder={placeHolder}
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
  );
};

export default SearchInput;
