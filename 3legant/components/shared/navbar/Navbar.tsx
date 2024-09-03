"use client";

import React, { useState } from "react";
import { navbarLinks } from "@/constant";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import MobileNav from "./MobileNav";
import CartIconNum from "../CartIconNum";
import CartSideBar from "../CartSideBar";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import GlobalSearch from "../GlobalSearch";
import { Input } from "@/components/ui/input";

const Navbar = ({ session }: any) => {
  const [activePath, setActivePath] = useState("/");
  const [isGlobalSearchActive, setIsGlobalSearchActive] = useState(false);

  const pathname = usePathname();

  let id;
  if (session) {
    id = session.user.id;
  }

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <div className="flex flex-col items-center">
      <nav className="flex-between z-50 w-full container-1 py-4 items-center inline-flex">
        <div className="flex flex-row gap-1">
          <MobileNav session={session} />
          <Link href="/">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={105}
              height={27}
            />
          </Link>
        </div>

        <div className="flex-between  flex-row w-[249px] max-xl:hidden">
          {navbarLinks.map((item) => {
            const isActive: boolean = activePath === item.route;
            return (
              <Link href={item.route} key={item.label}>
                <p
                  className={`${isActive ? "text-dark-1" : "text-grey-1"} medium-sm hover:text-dark-1 transition-colors duration-300`}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>

        <div
          className={`flex flex-row items-center justify-center gap-5 item max-lg:justify-end max-lg:gap-2`}
        >
          <GlobalSearch
            setIsGlobalSearchActive={setIsGlobalSearchActive}
            isGlobalSearchActive={isGlobalSearchActive}
          />

          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
            className={`max-lg:hidden flex relative cursor-pointer ${isGlobalSearchActive ? "opacity-0 invisible " : "block opacity-100"} transition-all duration-500`}
            onClick={() => setIsGlobalSearchActive((prev) => !prev)}
          />

          {session && id && (
            <Link href={`/profile/${id}?q=account`}>
              <Image
                src="/assets/icons/user-circle.svg"
                alt="user-icon"
                width={24}
                height={24}
                className="w-auto h-auto min-h-6 min-w-6"
              />
            </Link>
          )}
          {/* <CartIconNum /> */}
          <CartSideBar />
          {!session && !id && (
            <Link
              href="/sign-in"
              className="bg-grey-1 text-light-2 py-2 px-2 rounded-md medium-xs hover:opacity-80 duration-300"
            >
              SignIn
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
