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
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileImageUpload from "@/components/form/ProfileImageUpload";

const page = ({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { q: string };
}) => {
  const userId = params.userId;
  const query = searchParams.q;

  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(query);

  const handleTabChange = (value: string) => {
    if (value === "logout") {
      signOut({ callbackUrl: "/sign-in", redirect: true });
    } else {
      setCurrentTab(value);
      const newUrl = formUrlQuery({
        params: params.toString(),
        queryObject: {
          q: value,
        },
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full container-1 py-10 ">
      <h1 className="h3-medium text-dark-1">My Account</h1>
      <div className="flex flex-col justify-center gap-10  xl:flex-row w-full max-w-[1440px] pt-8 md:pt-10 max-xl:items-center ">
        <div className="flex flex-col justify-center items-center gap-10 px-4 py-10 bg-grey-4 rounded-md w-full  xl:max-w-[332px] h-fit">
          <ProfileImageUpload userId={userId} />

          {/* desktop version */}
          <div className="flex flex-col w-full gap-6 max-xl:hidden">
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
            <SelectTrigger className="w-full text-dark-3 medium-base xl:hidden">
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
        <div className="flex w-full justify-center max-w-[900px] min-h-dvh  ">
          <DisplayTabProfile type={currentTab} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default page;
