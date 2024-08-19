"use client";
import React from "react";
import { Button } from "../ui/button";

interface LoadMoreProps {
  otherClasses?: string;
  hasMore: boolean;
  handleLoadMore: () => void;
}

const LoadMore = ({ otherClasses, hasMore, handleLoadMore }: LoadMoreProps) => {
  if (!hasMore) {
    return null;
  }
  return (
    <div className={`flex items-center justify-center ${otherClasses}`}>
      <Button
        onClick={() => {
          handleLoadMore();
        }}
        className="regular-base text-dark-1 border rounded-full w-[163px] border-dark-1 hover:bg-dark-5 hover:text-light-1 duration-200"
      >
        Show more
      </Button>
    </div>
  );
};

export default LoadMore;
