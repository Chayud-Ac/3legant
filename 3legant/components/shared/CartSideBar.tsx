import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import CartIconNum from "./CartIconNum";
import SearchInput from "./SearchInput";
import WishListIconNum from "./WishListIconNum";
import CartItemCard from "../cards/CartItemCard";
import CartItemListMoblie from "../list/CartItemListMoblie";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "../ui/button";

const CartSideBar = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const totalCartAmount = cart.totalCartAmount;
  const cartId = cart.cartId;

  return (
    <div className="">
      <Sheet>
        <SheetTrigger className="flex items-center justify-center">
          <CartIconNum disableLink={true} />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[350px] sm:w-[434px] flex flex-col"
        >
          <SheetTitle className="text-[30px] absolute top-[10px]">
            Cart
          </SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
          <div className="flex flex-col flex-1 justify-between pt-3">
            <div className="pt-[24px] ">
              <CartItemListMoblie />
            </div>

            <div className="flex flex-col gap-3">
              <span className="relative w-full h-[2px] bg-grey-5"></span>
              <div className="relative inline-flex items-center">
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-dark-1 medium-xl hover:text-dark-2 transition-colors duration-300 ">
                    Total
                  </h1>
                  <span className="text-dark-1 medium-xl">
                    ${totalCartAmount}
                  </span>
                </div>
              </div>
              <SheetClose asChild>
                <Link href={`/cart`}>
                  <Button className="btn-primary text-center w-full">
                    View Cart
                  </Button>
                </Link>
              </SheetClose>
              <p className="regular-xs text-grey-2 text-center">
                You can apply coupon and select delivery options in Cart Page
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSideBar;
