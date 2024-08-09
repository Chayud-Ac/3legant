"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

import Image from "next/image";
import SearchInput from "../SearchInput";
import { navbarLinks } from "@/constant/index";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import CartIconNum from "../CartIconNum";
import WishListIconNum from "../WishListIconNum";

const NavContent = () => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <div className="flex flex-col gap-4 pt-4">
      {navbarLinks.map((item) => {
        const isActive = item.route === activePath;
        return (
          <SheetClose asChild key={item.label}>
            <div className="relative inline-flex items-center ">
              <Link href={item.route}>
                <h1
                  className={`${isActive ? "text-dark-2" : "text-grey-1"} medium-base mb-4 hover:text-dark-2 transition-colors duration-300`}
                >
                  {item.label}
                </h1>
              </Link>
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-grey-5"></span>
            </div>
          </SheetClose>
        );
      })}
    </div>
  );
};

const MobileNav = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu-line-horizontal.svg"
            alt="menu"
            width={24}
            height={24}
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[350px] sm:w-[434px] flex flex-col"
        >
          <SheetTitle className="absolute left-[24px] top-[11px] h6-medium">
            3legant
          </SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
          <div className="flex flex-col flex-1 justify-between">
            <div className="pt-[24px] ">
              <SearchInput iconPosition="left" placeHolder="Search" />
              <NavContent />
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative inline-flex items-center">
                <Link
                  href="/cart"
                  className="flex flex-row justify-between items-center mb-4 w-full"
                >
                  <h1 className="text-grey-1 medium-lg hover:text-dark-2 transition-colors duration-300 ">
                    Cart
                  </h1>
                  <CartIconNum />
                </Link>
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-grey-5"></span>
              </div>
              <div className="relative inline-flex items-center">
                <Link
                  href="/profile"
                  className="flex flex-row justify-between items-center mb-4 w-full"
                >
                  <h1 className="text-grey-1 medium-lg hover:text-dark-2 transition-colors duration-300 ">
                    WishList
                  </h1>
                  <WishListIconNum />
                </Link>
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-grey-5"></span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
