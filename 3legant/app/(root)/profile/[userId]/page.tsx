"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileTabContent } from "@/constant";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DisplayTabProfile from "@/components/display/DisplayTabProfile";
import { formUrlQuery } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ProfileImageUpload from "@/components/form/ProfileImageUpload";

const page = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  const router = useRouter();
  console.log(params);
  const [currentTab, setCurrentTab] = useState("account");
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    const newUrl = formUrlQuery({
      params: params.toString(),
      queryObject: {
        q: value,
      },
    });
    console.log(userId);
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full container-1 py-10">
      <h1 className="h3-medium text-dark-1">My Account</h1>
      <div className="flex flex-col justify-center gap-10 md:flex-row w-full max-w-[1440px] pt-8 md:pt-10 ">
        <div className="flex flex-col justify-center items-center gap-10 px-4 py-10 bg-grey-4 rounded-md w-full max-w-[332px]">
          <div className="flex flex-col gap-2 items-center justify-center">
            <ProfileImageUpload userId={userId} />
            <p className="text-dark-1 medium-2xl">Sofia Havertz</p>
            <p className="text-dark-1 regular-xs italic">Test1@gmail.com</p>
          </div>
          {/* desktop version */}
          <div className="flex flex-col w-full gap-6 max-md:hidden">
            {profileTabContent.map((item, index) => {
              const isActive = item.value === currentTab;
              return (
                <div
                  key={index}
                  className="flex flex-col w-full cursor-pointer p-1 rounded-sm group"
                  onClick={() => handleTabChange(item.value)}
                >
                  <p
                    className={`${isActive && "text-dark-3"} text-grey-1 medium-lg group-hover:text-dark-3 duration-300 `}
                  >
                    {item.name}
                  </p>
                  <span
                    className={`${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    } h-[3px] bg-dark-3 rounded-md transition-all duration-500`}
                  ></span>
                </div>
              );
            })}
          </div>
          {/* Ipad mobile selector version */}
          <Select onValueChange={handleTabChange} value={currentTab}>
            <SelectTrigger className="w-full text-dark-3 medium-base md:hidden">
              <SelectValue placeholder={`${currentTab}`} />
            </SelectTrigger>
            <SelectContent className="text-dark-3 medium-base">
              <SelectGroup>
                {profileTabContent.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Tab Content display base on the currentTab state */}
        <DisplayTabProfile type={currentTab} userId={userId} />
      </div>
    </div>
  );
};

export default page;
