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

const Navbar = () => {
  const [activePath, setActivePath] = useState("/");
  const pathname = usePathname();

  // !TODO id is getting from the cookies session after user signIn we will redirect to that particular user depending on the id /profile/id
  // !TODO create cartContext and store all the cart function and cart number which those will be pass across the component in the application
  const [id, setId] = useState("");
  const [cart, setCart] = useState(0);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  console.log(pathname);
  return (
    <nav className="flex-between z-50 w-full container-1 py-4 items-center inline-flex">
      <div className="flex flex-row gap-1">
        <MobileNav />
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

      <div className="flex flex-row items-center justify-between item w-[130px] max-md:justify-end">
        <button type="button" className="max-md:hidden">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
        </button>
        <Link href={`profile/${id}`} className="max-md:hidden">
          <Image
            src="/assets/icons/user-circle.svg"
            alt="user-icon"
            width={24}
            height={24}
          />
        </Link>
        {/* <CartIconNum /> */}
        <CartSideBar />
      </div>
    </nav>
  );
};

export default Navbar;
