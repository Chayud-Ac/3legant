"use client";

import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addItem, setCartId } from "@/store/slices/cartSlice";
import { removeItem } from "@/store/slices/cartSlice";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { addItemToCart } from "@/lib/actions/cartaction.action";

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
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  console.log(cart);

  const handleAddToCart = async () => {
    try {
      dispatch(
        addItem({
          productId: productId,
          color: color, // Example static color, should be selected by user
          quantity: quantity, // Example quantity
          pricePerUnit: price,
          category: category,
          slug: slug,
          name: name,
          totalItemsPrice: parseFloat((price * quantity).toFixed(2)),
        })
      );

      const result = await addItemToCart({
        userId: user.id,
        cartItem: {
          productId: productId,
          color: color,
          quantity: quantity,
          pricePerUnit: price,
          totalItemsPrice: parseFloat((price * quantity).toFixed(2)),
        },
      });

      console.log(result.cart);
      if (!cart.cartId) {
        dispatch(setCartId(result.cart._id));
      }
    } catch (error) {
      throw error;
    }
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
