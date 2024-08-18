"use client";

import React from "react";
import { Button } from "../ui/button";

interface AddtoWishListButtonProps {
  otherClasses?: string;
}

const AddtoWishListButton = ({ otherClasses }: AddtoWishListButtonProps) => {
  return (
    <Button type="submit" className={`${otherClasses}`}>
      <div className="flex flex-row items-center justify-center gap-2 w-full">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.6924 6.91706C12.3055 7.28838 11.6945 7.28838 11.3076 6.91706L10.6152 6.2526C9.80477 5.47487 8.70994 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 11.8826 4.28979 13.8501 6.15176 15.4666C8.01532 17.0844 10.2434 18.1574 11.5746 18.7051C11.853 18.8196 12.147 18.8196 12.4254 18.7051C13.7566 18.1574 15.9847 17.0844 17.8482 15.4666C19.7102 13.85 21 11.8826 21 9.5C21 7.01472 18.9853 5 16.5 5C15.2901 5 14.1952 5.47487 13.3848 6.2526L12.6924 6.91706ZM12 4.80957C10.8321 3.6888 9.24649 3 7.5 3C3.91015 3 1 5.91015 1 9.5C1 15.8683 7.97034 19.385 10.8138 20.5547C11.5796 20.8697 12.4204 20.8697 13.1862 20.5547C16.0297 19.385 23 15.8682 23 9.5C23 5.91015 20.0899 3 16.5 3C14.7535 3 13.1679 3.6888 12 4.80957Z"
            className="fill-gray-800 group-hover:fill-red-500 duration-300"
          />
        </svg>
        <p className="max-sm:hidden">Wishlist</p>
      </div>
    </Button>
  );
};

export default AddtoWishListButton;
