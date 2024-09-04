import React from "react";
import Image from "next/image";
import TextLinkButton from "../shared/TextLinkButton";

interface CategoryCardProps {
  title: string;
  imgUrl: string;
  width: number;
  height: number;
  alt: string;
  href: string;
  otherClasses: string;
}

const CategoryCard = ({
  title,
  imgUrl,
  width,
  height,
  alt,
  href,
  otherClasses,
}: CategoryCardProps) => {
  return (
    <div className={`relative max-w-${width} max-h-${height}`}>
      <Image
        src={imgUrl}
        alt={alt}
        width={width}
        height={height}
        className="w-auto h-auto"
      />
      <div
        className={`absolute flex flex-col justify-start gap-3 ${otherClasses}`}
      >
        <h1 className="h5-medium">{title}</h1>
        <TextLinkButton title="Shop Now" href={href} otherClasses="w-[92px]" />
      </div>
    </div>
  );
};

export default CategoryCard;
