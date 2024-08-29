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

const Navbar = ({ session }: any) => {
  const [activePath, setActivePath] = useState("/");
  const pathname = usePathname();

  let id;
  if (session) {
    id = session.user.id;
  }

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
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

      <div className="flex-between  flex-row w-[249px] max-md:hidden">
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

      <div className="flex flex-row items-center justify-center gap-5 item max-w-[140px] max-md:justify-end max-md:gap-2">
        <button type="button" className="max-md:hidden">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
        </button>
        {session && id && (
          <Link href={`/profile/${id}?q=account`}>
            <Image
              src="/assets/icons/user-circle.svg"
              alt="user-icon"
              width={24}
              height={24}
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
  );
};

export default Navbar;
