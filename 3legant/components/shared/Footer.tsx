import Image from "next/image";
import { navbarLinks } from "@/constant";
import Link from "next/link";
import { socialLinks } from "@/constant";

const Footer = () => {
  return (
    <footer className=" bg-dark-2 pb-8">
      <div className="flex flex-col container-1">
        <div className="flex-center flex-col gap-20 sm:flex-row mt-12 md:flex-between sm:mt-20">
          <div className="flex flex-row justify-between items-center sm:w-[280px] max-sm:flex-col max-sm:h-20">
            <Image
              src="/assets/icons/logo_white.svg"
              alt="logo"
              width={105}
              height={27}
            />
            <span className="bg-grey-1 h-6 w-[1px] max-sm:hidden"></span>
            <span className="bg-grey-1 h-[1px] w-6 sm:hidden"></span>
            <p className="regular-sm text-light-2">Gift & Decoration</p>
          </div>
          <div className="flex flex-row gap-8 md:w-[250px] justify-between max-sm:flex-col items-center ">
            {navbarLinks.map((item) => (
              <Link
                href={item.route}
                key={item.label}
                className="regular-sm text-light-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <span className="bg-grey-1 h-[1px] w-full mt-10  sm:mt-11"></span>
        <div className="flex flex-col-reverse item-centers gap-8 mt-5 sm:flex-row sm:justify-between ">
          <div className="flex  flex-col-reverse items-center gap-7 sm:flex-row sm:w-[500px] sm:justify-between">
            <p className="regular-xs text-light-2">
              Copyright © 2023 3legant. All rights reserved
            </p>
            <div className="flex flex-row gap-7 items-center sm:flew-col">
              <p className="medium-xs text-light-2">Privacy</p>
              <p className="medium-xs text-light-2">Terms of use</p>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-[26px] sm:justify-between sm:w-[120px]">
            {socialLinks.map((item) => (
              <Link href={item.route} key={item.label}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                  className="invert"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
