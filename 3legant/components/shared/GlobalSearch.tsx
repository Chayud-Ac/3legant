"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GlobalSearchResult from "./GlobalSearchResult";

interface GlobalSearchProps {
  setIsGlobalSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  isGlobalSearchActive: boolean;
}

const GlobalSearch = ({
  setIsGlobalSearchActive,
  isGlobalSearchActive,
}: GlobalSearchProps) => {
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
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
  }, [isGlobalSearchActive]);

  return (
    <div className="flex flex-col w-full relative" ref={searchContainerRef}>
      <div
        className={`flex flex-row relative bg-grey-4 rounded-md px-2 mr-[-50px] ${
          isGlobalSearchActive
            ? "opacity-100 w-[500px]"
            : "w-0 opacity-0 invisible"
        } transition-all fade-in-20 duration-500`}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setLoading(true);
            setSearch(e.target.value);
            if (!isActive) setIsActive(true);
            if (e.target.value === "" && isActive) setIsActive(false);
          }}
          placeholder="search globally"
          className="bg-transparent border-none no-focus shadow-none outline-none regular-sm text-dark-2 w-full py-3 z-20" // Add z-index to ensure the input is on top
        />
        <Image
          src="/assets/icons/remove.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer w-auto h-auto z-20" // Add z-index to ensure the remove icon is on top
          onClick={() => {
            setIsGlobalSearchActive((prev) => !prev);
            setLoading(false);
            setSearch("");
            setIsActive(false);
          }}
        />
      </div>
      <GlobalSearchResult
        loading={loading}
        setLoading={setLoading}
        isActive={isActive}
        isGlobalSearchActive={isGlobalSearchActive}
        setIsActive={setIsActive}
        search={search}
        className="z-10 w-[500px]" // Ensure the dropdown stays below the input field
      />
    </div>
  );
};

export default GlobalSearch;
