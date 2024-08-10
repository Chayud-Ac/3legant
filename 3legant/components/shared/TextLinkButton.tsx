import { Underline } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TextLinkButtonProps {
  title: string;
  href: string;
}

const TextLinkButton = ({ title, href }: TextLinkButtonProps) => {
  return (
    <div className="relative inline-flex items-center w-[92px]">
      <Link href={href} className="flex flex-row gap-1">
        <h2 className="medium-sm text-dark-1">{title}</h2>

        <Image
          src="/assets/icons/arrow-right-black.svg"
          alt="arrow-right"
          width={18}
          height={18}
          className="w-auto h-auto"
        />
      </Link>

      <span className="absolute left-0 bottom-[-2px] w-full h-[1px] bg-dark-1"></span>
    </div>
  );
};

export default TextLinkButton;
