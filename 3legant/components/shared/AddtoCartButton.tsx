"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addItem, setCartId } from "@/store/slices/cartSlice";
import { removeItem } from "@/store/slices/cartSlice";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { addItemToCart } from "@/lib/actions/cartaction.action";
import { useToast } from "../ui/use-toast";
import { Spinner } from "./Spinner";

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
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const result = await addItemToCart({
        cartId: cart.cartId,
        userId: user.id,
        cartItem: {
          productId: productId,
          color: color,
          quantity: quantity,
          pricePerUnit: price,
          totalItemsPrice: parseFloat((price * quantity).toFixed(2)),
        },
      });

      if (result.success) {
        const { data } = result;
        dispatch(
          addItem({
            productId: productId,
            color: color,
            quantity: quantity,
            pricePerUnit: price,
            category: category,
            slug: slug,
            name: name,
            totalItemsPrice: parseFloat((price * quantity).toFixed(2)),
            totalCartAmount: data.totalCartAmount,
          })
        );

        if (cart.cartId) {
          dispatch(setCartId(data.cartId));
        }

        toast({
          title: `Added ${name} ${color} x ${quantity} to cart `,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="submit"
      onClick={() => handleAddToCart()}
      className={`${otherClasses} btn-primary`}
      disabled={loading}
    >
      {loading ? <Spinner size="small" /> : "Add to cart"}
    </Button>
  );
};

export default AddtoCartButton;
