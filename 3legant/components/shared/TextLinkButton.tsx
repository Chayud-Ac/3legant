import { Underline } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TextLinkButtonProps {
  title: string;
  href: string;
  otherClasses?: string;
}

const TextLinkButton = ({ title, href, otherClasses }: TextLinkButtonProps) => {
  return (
    <div className={`relative  items-center ${otherClasses}`}>
      <Link href={href} className="flex flex-row justify-between">
        <h2 className="medium-sm text-dark-1">{title}</h2>

        <Image
          src="/assets/icons/arrow-right-black.svg"
          alt="arrow-right"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
      </Link>

      <span className="absolute left-0 bottom-[-2px] w-full h-[1px] bg-dark-1"></span>
    </div>
  );
};

export default TextLinkButton;
