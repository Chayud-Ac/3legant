"use server";

import mongoose from "mongoose";
import { connectToDatabase } from "../mongoose";
import {
  addItemToCartParams,
  incrementItemQuantityParams,
  removeFromCartParams,
} from "./shared.types";
import { Cart } from "@/databases/cart.model";

export async function addItemToCart(params: addItemToCartParams) {
  try {
    connectToDatabase();
    const { userId, cartItem } = params;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    let cart = await Cart.findOne({ user: userObjectId, isActive: true });

    if (!cart) {
      cart = new Cart({
        user: userObjectId,
        cartItems: [
          {
            product: cartItem.productId,
            color: cartItem.color,
            quantity: cartItem.quantity,
            pricePerUnit: cartItem.pricePerUnit,
            totalItemsPrice: parseFloat(cartItem.totalItemsPrice.toFixed(2)),
          },
        ],
        totalCartAmount: parseFloat(cartItem.totalItemsPrice.toFixed(2)),
      });
    } else {
      const existingCartItem: any = cart.cartItems.find(
        (item: any) =>
          item.product.toString() === cartItem.productId &&
          item.color === cartItem.color
      );

      if (existingCartItem) {
        existingCartItem.quantity += cartItem.quantity;
        existingCartItem.totalItemsPrice = parseFloat(
          (existingCartItem.quantity * existingCartItem.pricePerUnit).toFixed(2)
        );

        cart.totalCartAmount = parseFloat(
          (
            cart.totalCartAmount +
            cartItem.pricePerUnit * cartItem.quantity
          ).toFixed(2)
        );
      } else {
        cart.cartItems.push({
          product: cartItem.productId,
          color: cartItem.color,
          quantity: cartItem.quantity,
          pricePerUnit: cartItem.pricePerUnit,
          totalItemsPrice: parseFloat(cartItem.totalItemsPrice.toFixed(2)),
        });
        cart.totalCartAmount = parseFloat(
          (cart.totalCartAmount + cartItem.totalItemsPrice).toFixed(2)
        );
      }
    }

    await cart.save();

    return { cart: JSON.parse(JSON.stringify(cart)) };
  } catch (error) {
    throw error;
  }
}

export async function incrementItemQuantityAction(
  params: incrementItemQuantityParams
) {
  try {
    connectToDatabase();
    const { cartId, product, color } = params;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error("cart not found");
    }

    const cartItem = cart.cartItems.find(
      (item: any) => item.product.toString() === product && item.color === color
    );

    if (!cartItem) {
      throw new Error("Item not found in cart");
    }

    cartItem.quantity += 1;
    cartItem.totalItemsPrice = parseFloat(
      (cartItem.quantity * cartItem.pricePerUnit).toFixed(2)
    );
    cart.totalCartAmount = parseFloat(
      cart.cartItems
        .reduce((total: number, item: any) => total + item.totalItemsPrice, 0)
        .toFixed(2)
    );
    await cart.save();

    console.log(JSON.parse(JSON.stringify(cart)));
  } catch (error) {
    throw error;
  }
}

export async function decrementItemQuantityAction(
  params: incrementItemQuantityParams
) {
  try {
    connectToDatabase();
    const { cartId, product, color } = params;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error("cart not found");
    }

    const cartItem = cart.cartItems.find(
      (item: any) => item.product.toString() === product && item.color === color
    );

    if (!cartItem) {
      throw new Error("Item not found in cart");
    }

    cartItem.quantity -= 1;
    cartItem.totalItemsPrice = parseFloat(
      (cartItem.quantity * cartItem.pricePerUnit).toFixed(2)
    );
    cart.totalCartAmount = parseFloat(
      cart.cartItems
        .reduce((total: number, item: any) => total + item.totalItemsPrice, 0)
        .toFixed(2)
    );
    await cart.save();
  } catch (error) {
    throw error;
  }
}

export async function removeFromCart(params: removeFromCartParams) {
  try {
    connectToDatabase();

    const { cartId, product, color } = params;

    // ดึง item ออก
    const cart = await Cart.findByIdAndUpdate(
      cartId,
      {
        $pull: {
          cartItems: {
            product: new mongoose.Types.ObjectId(product),
            color: color,
          },
        },
      },
      { new: true }
    );

    // calculate totalCartAmount ใหม่

    cart.totalCartAmount = parseFloat(
      cart.cartItems
        .reduce((total: number, item: any) => total + item.totalItemsPrice, 0)
        .toFixed(2)
    );
    await cart.save();

    console.log(JSON.parse(JSON.stringify(cart)));
  } catch (error) {
    throw error;
  }
}
