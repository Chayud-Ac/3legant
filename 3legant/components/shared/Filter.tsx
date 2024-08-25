import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FilterProps {
  type: "single" | "multiple";
  title?: string;
  filter: {
    name: string;
    value: string;
  }[];

  filterKey: string; // specify the name of the query key
  otherClasses?: string;
  containerClasses?: string;
  titleMain?: string;
  hideTitle?: boolean;
  setTitleMain?: (value: string) => void;
}

const Filter = ({
  title,
  filter,
  otherClasses,
  containerClasses,
  filterKey,
  hideTitle,
  setTitleMain,
}: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentQueryValue = searchParams.get(filterKey);

  const handleUpdateParams = (value: string) => {
    // This logic is apply when setTitleMain and titleMain is pass as Props
    // กรณีนี้คือ filter ตัวนี้ใช้กับ display page ซึ่ง display มี titleMain ที่เปลี่ยนตาม option ของ select
    // ทำไม ไม่ใช้ useSearchParams ใน หน้า main แล้ว ดึงค่า title มา ??
    // ค่า value กับ ค่า name ไม่เหมือนกัน เราอยากได้ ค่า name Eg . { name: All Rooms , value : allRooms }  ( name : Living Room , value : livingRoom )
    if (setTitleMain) {
      const selected = filter.find((item) => item.value === value);
      if (selected) {
        setTitleMain(selected.name || "");
      }
    }

    // ถ้าไม่มี setTitleMain มา ก็เป็น Filter component ปกติ ที่ใช้เพื่อ Filter ตัว key กับ value นั้นๆ แล้ว formUrl ใหม่

    const queryObject = { [filterKey]: value };
    console.log(queryObject);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      queryObject,
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className={`flex relative ${containerClasses}`}>
      <p className={`${hideTitle && "hidden"} text-grey-2 medium-xs`}>
        {title}
      </p>
      <Select
        value={currentQueryValue || undefined}
        onValueChange={(value) => handleUpdateParams(value)}
      >
        <SelectTrigger className={`${otherClasses}`}>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent className={`absolute`}>
          {filter.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="text-grey-1 regular-base hover:text-dark1 hover:medium-sm "
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
