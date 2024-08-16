"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FilterDesktopProps {
  title: string;
  filter: {
    name: string;
    value: string;
  }[];
  setTitleMain: (value: string) => void;
}

const FilterRoomDesktop = ({
  title,
  filter,
  setTitleMain,
}: FilterDesktopProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const room = searchParams.get("room");
  console.log(room);

  const [currentValue, setCurrentValue] = useState(room);

  useEffect(() => {
    if (currentValue) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        queryObject: {
          room: currentValue,
        },
      });
      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["room"],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [currentValue]);

  const handleCategoryChange = (value: string, name: string) => {
    setCurrentValue(value);
    setTitleMain(name);
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="medium-base text-dark-1">{title}</p>
      <div className="flex flex-col gap-3 h-[260px] overflow-y-scroll whitespace-nowrap scroll-smooth custom-scrollbar-2">
        {filter.map((item) => {
          const isActive = room === item.value;
          console.log(currentValue);
          return (
            <p
              onClick={() => handleCategoryChange(item.value, item.name)}
              key={item.value}
              className={`${isActive ? "text-dark-1 underline underline-offset-[5px]" : "text-grey-2 "} cursor-pointer regular-base`}
            >
              {item.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default FilterRoomDesktop;
