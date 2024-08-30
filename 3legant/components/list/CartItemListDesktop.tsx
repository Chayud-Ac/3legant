"use client";
import { RootState } from "@/store/store";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemAmountSelection from "../shared/CartItemAmountSelection";
import { removeCoupon, removeItem } from "@/store/slices/cartSlice";
import { removeFromCart } from "@/lib/actions/cartaction.action";

const CartItemListDesktop = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = async (productId: string, color: string) => {
    try {
      if (cart.cartId) {
        const result = await removeFromCart({
          cartId: cart.cartId,
          product: productId,
          color: color,
        });

        if (result.success) {
          const { data } = result;
          dispatch(
            removeItem({
              productId: productId,
              color: color,
              newTotalCartAmount: data.newTotalCartAmount,
            })
          );

          if (data.removeCoupon) {
            dispatch(removeCoupon({}));
          }
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <table className="table-fixed w-full max-sm:hidden">
      <thead className="border-b border-grey-2">
        <tr className="medium-base text-dark-1 ">
          <th className="text-start max-w-[300px] py-5">Product</th>
          <th className="text-center w-[100px] py-5">Quantity</th>
          <th className="text-center w-[100px]  py-5">Price</th>
          <th className="text-end w-[70px] py-5">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map((item, index) => (
          <React.Fragment key={index}>
            <tr className="border-b border-grey-2">
              <td className="flex flex-row gap-2 py-4">
                <div className="gap-2 items-center justify-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${item.category}/${item.slug}/${item.color}.svg`}
                    alt={item.slug}
                    width={80}
                    height={96}
                    className="w-auto h-auto max-w-[100px] max-h-[119px]"
                  />
                </div>
                <div className="flex flex-col gap-6 justify-start">
                  <p className="medium-base text-dark-2">{item.name}</p>
                  <p className="regular-sm text-grey-2">Color: {item.color}</p>
                  <div className="flex flex-row gap-1 items-center w-fit py-1 pr-1 hover:bg-stone-200 rounded-md cursor-pointer duration-300">
                    <Image
                      src="/assets/icons/remove.svg"
                      alt="remove"
                      width={20}
                      height={20}
                      className="h-auto w-auto max-w-[20px] max-h-[20px]"
                    />
                    <span
                      className="text-grey-2 medium-sm"
                      onClick={() => handleRemoveItem(item.product, item.color)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  <CartItemAmountSelection
                    productId={item.product}
                    color={item.color}
                    quantity={item.quantity}
                    otherClasses="p-1 hover:bg-grey-4 duration-300 border-2 "
                  />
                </div>
              </td>
              <td className="text-center">
                <span className="text-dark-3 regular-base text-center">
                  ${item.pricePerUnit}
                </span>
              </td>
              <td className="text-end">
                <span className="text-dark-1 medium-md text-center">
                  ${item.totalItemsPrice}
                </span>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default CartItemListDesktop;
