import Image from "next/image";
import React from "react";
import TextLinkButton from "../shared/TextLinkButton";

interface ArticleCardProps {
  title: string;
  id: number;
  imgUrl: string;
}

const ArticleCard = ({ title, id, imgUrl }: ArticleCardProps) => {
  return (
    <div className="flex flex-col min-w-[311px]">
      <Image
        src={imgUrl}
        alt="artcard1"
        width={357}
        height={325}
        className="w-auto h-auto min-w-[311px] min-h-[283px]"
      />
      <h3 className="medium-sm text-dark-1 pt-4 md:pt-6">{title}</h3>
      <TextLinkButton
        title="Read More"
        href={`/articles/${id}`}
        otherClasses="w-[98px] pt-2"
      />
    </div>
  );
};

export default ArticleCard;
