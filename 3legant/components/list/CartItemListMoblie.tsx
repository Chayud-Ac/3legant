"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import CartItemCard from "../cards/CartItemCard";

interface CartItemListMoblie {
  otherClasses?: string;
}

const CartItemListMoblie = ({ otherClasses }: CartItemListMoblie) => {
  const cart = useSelector((state: RootState) => state.cart);
  const items = cart.items;

  return (
    <div
      className={`flex flex-col justify-center w-full gap-5 pt-5 ${otherClasses}`}
    >
      {items.map((item, index) => (
        <CartItemCard
          key={index}
          product={item.product}
          color={item.color}
          quantity={item.quantity}
          price={item.totalItemsPrice}
          category={item.category}
          slug={item.slug}
          name={item.name}
        />
      ))}
    </div>
  );
};

export default CartItemListMoblie;
