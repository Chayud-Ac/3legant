"use client";

import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/cartSlice";
import { removeItem } from "@/store/slices/cartSlice";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface AddtoCartButtonProps {
  otherClasses?: string;
  productId: string;
  quantity: number;
  price: number;
  color: string;
  category: string;
  slug: string;
  name: string;
}

const AddtoCartButton = ({
  otherClasses,
  productId,
  quantity,
  price,
  color,
  category,
  slug,
  name,
}: AddtoCartButtonProps) => {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart);
  const handleAddToCart = () => {
    dispatch(
      addItem({
        productId: productId,
        color: color, // Example static color, should be selected by user
        quantity: quantity, // Example quantity
        pricePerUnit: price,
        category: category,
        slug: slug,
        name: name,
        totalItemsPrice: price * quantity,
      })
    );
  };

  return (
    <Button
      type="submit"
      onClick={() => handleAddToCart()}
      className={`${otherClasses} btn-primary`}
    >
      Add to cart
    </Button>
  );
};

export default AddtoCartButton;
