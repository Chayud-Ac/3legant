"use server";

import mongoose from "mongoose";
import { connectToDatabase } from "../mongoose";
import {
  addItemToCartParams,
  applyCouponParams,
  incrementItemQuantityParams,
  removeCouponParams,
  removeFromCartParams,
  selectDeliveryOptionsParams,
} from "./shared.types";
import { Cart } from "@/databases/cart.model";
import { Coupon } from "@/databases/coupon.model";
import Delivery from "@/databases/delivery.model";

export async function addItemToCart(params: addItemToCartParams) {
  try {
    await connectToDatabase();
    const { userId, cartItem, cartId } = params;

    let cart;
    let userObjectId;

    // ถ้ามี cartId input มา (cart ถูกสร้างขึ้นมาแล้ว ก็ query โดยใช้ cartId เลย)
    if (cartId) {
      cart = await Cart.findById(cartId)
        .populate({
          path: "deliveryOption",
          select: "price",
        })
        .populate({
          path: "coupon",
          select: "discount",
        });
    } else {
      // ถ้ายังก็ใช้ userId เช็คกับ isActive = true
      userObjectId = new mongoose.Types.ObjectId(userId);
      cart = await Cart.findOne({ user: userObjectId, isActive: true })
        .populate({
          path: "deliveryOption",
          select: "price",
        })
        .populate({
          path: "coupon",
          select: "discount",
        });
    }

    // ถ้า queryไม่เจอแสดงว่า cart ยังไม่ถูกสร้างขึ้นงั้น ก็สร้าง document ใหม่
    if (!cart) {
      cart = new Cart({
        user: cartId ? undefined : userObjectId,
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
        coupon: undefined,
        deliveryOption: undefined,
      });
    } else {
      // ถ้า เจอ ก็ อัปเดท ตัว item หรือ push เข้าไปใน array ถ้า ยังไม่มี item นั้นๆ
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
      } else {
        cart.cartItems.push({
          product: cartItem.productId,
          color: cartItem.color,
          quantity: cartItem.quantity,
          pricePerUnit: cartItem.pricePerUnit,
          totalItemsPrice: parseFloat(cartItem.totalItemsPrice.toFixed(2)),
        });
      }
    }

    const itemsTotalAmount = cart.cartItems.reduce(
      (total: number, item: any) => total + item.totalItemsPrice,
      0
    );

    cart.totalCartAmount = parseFloat(
      (
        itemsTotalAmount -
        (cart.coupon?.discount || 0) +
        (cart.deliveryOption?.price || 0)
      ).toFixed(2)
    );

    await cart.save();

    return {
      success: true,
      data: {
        totalCartAmount: cart.totalCartAmount,
        itemsTotalAmount: itemsTotalAmount,
        cartId: cart._id.toString(),
      },
    };
  } catch (error) {
    throw new Error(`Failed to add item to cart`);
  }
}

export async function incrementItemQuantityAction(
  params: incrementItemQuantityParams
) {
  try {
    connectToDatabase();
    const { cartId, product, color, userId } = params;

    let cart;
    if (cartId) {
      // ใช้ cartId ถ้ามี cartId
      cart = await Cart.findById(cartId)
        .populate({
          path: "deliveryOption",
          select: "price",
        })
        .populate({
          path: "coupon",
          select: "discount minPrice",
        });
    } else {
      // ใช้ userId ถ้ามี cartId ไม่มี หรือ มีปัญหา
      cart = await Cart.findOne({
        user: new mongoose.Types.ObjectId(userId),
        isActive: true,
      })
        .populate({
          path: "deliveryOption",
          select: "price",
        })
        .populate({
          path: "coupon",
          select: "discount minPrice",
        });
    }

    console.log(cart);

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

    // calculate the total price with coupon and the delivery options as well

    const deliveryPrice = cart?.deliveryOption?.price || 0;
    const couponDiscount = cart?.coupon?.discount || 0;

    const totalItemsAmount = cart.cartItems.reduce(
      (total: number, item: any) => total + item.totalItemsPrice,
      0
    );

    const newTotalCartAmount =
      totalItemsAmount + deliveryPrice - couponDiscount;

    cart.totalCartAmount = parseFloat(newTotalCartAmount.toFixed(2));

    await cart.save();

    return {
      success: true,
      data: {
        newTotalCartAmount: cart.totalCartAmount,
      },
    };
  } catch (error) {
    throw error;
  }
}

export async function decrementItemQuantityAction(
  params: incrementItemQuantityParams
) {
  try {
    connectToDatabase();
    const { cartId, product, color, userId } = params;

    let cart;

    if (cartId) {
      // ใช้ cartId ถ้ามี cartId
      cart = await Cart.findById(cartId)
        .populate({
          path: "deliveryOption",
          select: "price",
        })
        .populate({
          path: "coupon",
          select: "discount minPrice",
        });
    } else {
      // ใช้ userId ถ้ามี cartId ไม่มี หรือ มีปัญหา
      cart = await Cart.findOne({
        user: new mongoose.Types.ObjectId(userId),
        isActive: true,
      })
        .populate({
          path: "deliveryOption",
          select: "price",
        })
        .populate({
          path: "coupon",
          select: "discount minPrice",
        });
    }

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
    cartItem.totalItemsPrice = cartItem.quantity * cartItem.pricePerUnit;
    const totalItemsAmount = cart.cartItems.reduce(
      (total: number, item: any) => total + item.totalItemsPrice,
      0
    );

    let removeCoupon = false;
    if (cart.coupon && totalItemsAmount < cart.coupon.minPrice) {
      cart.coupon = undefined;
      removeCoupon = true;
    }

    const deliveryPrice = cart?.deliveryOption?.price || 0;
    const couponDiscount = cart?.coupon?.discount || 0;

    const newTotalCartAmount =
      totalItemsAmount + deliveryPrice - couponDiscount;

    cart.totalCartAmount = parseFloat(newTotalCartAmount.toFixed(2));

    await cart.save();

    return {
      success: true,
      data: {
        newTotalCartAmount: cart.totalCartAmount,
        removeCoupon,
      },
    };
  } catch (error) {
    throw error;
  }
}

export async function removeFromCart(params: removeFromCartParams) {
  try {
    connectToDatabase();

    const { cartId, product, color, userId } = params;
    let cart;

    // ดึง item ออก

    if (cartId) {
      cart = await Cart.findByIdAndUpdate(
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
      )
        .populate({
          path: "deliveryOption",
          select: "price",
        })
        .populate({
          path: "coupon",
          select: "discount minPrice",
        });
    } else {
      cart = await Cart.findOneAndUpdate(
        {
          user: new mongoose.Types.ObjectId(userId),
          isActive: true,
        },
        {
          $pull: {
            cartItems: {
              product: new mongoose.Types.ObjectId(product),
              color: color,
            },
          },
        },
        { new: true }
      )
        .populate({
          path: "deliveryOption",
          select: "price",
        })
        .populate({
          path: "coupon",
          select: "discount minPrice",
        });
    }

    // calculate totalCartAmount ใหม่

    const totalItemsAmount = cart.cartItems.reduce(
      (total: number, item: any) => total + item.totalItemsPrice,
      0
    );

    let removeCoupon = false;
    if (cart.coupon && totalItemsAmount < cart.coupon.minPrice) {
      cart.coupon = undefined;
      removeCoupon = true;
    }

    const deliveryPrice = cart?.deliveryOption?.price || 0;
    const couponDiscount = cart?.coupon?.discount || 0;

    const newTotalCartAmount =
      totalItemsAmount + deliveryPrice - couponDiscount;

    cart.totalCartAmount = parseFloat(newTotalCartAmount.toFixed(2));

    await cart.save();

    return {
      success: true,
      data: {
        newTotalCartAmount: cart.totalCartAmount,
        removeCoupon,
      },
    };
  } catch (error) {
    throw error;
  }
}

export async function applyCouponServerAction(params: {
  cartId: string;
  code: string;
}): Promise<
  | {
      success: true;
      message: string;
      data: {
        code: string;
        discount: number;
        newTotalCartAmount: number;
      };
    }
  | {
      success: false;
      message: string;
    }
> {
  try {
    await connectToDatabase();

    const { cartId, code } = params;

    const coupon = await Coupon.findOne({ code: code, isActive: true });

    if (!coupon) {
      return { success: false, message: "Invalid or inactive coupon" };
    }

    const cart = await Cart.findById(cartId).select({
      user: 1,
      totalCartAmount: 1,
      coupon: 1,
    });

    if (cart && cart.totalCartAmount < coupon.minPrice) {
      return {
        success: false,
        message: `This coupon can only be applied to a minimum purchase of ${coupon.minPrice}`,
      };
    }

    const newTotalCartAmount = parseFloat(
      (cart.totalCartAmount - coupon.discount).toFixed(2)
    );

    // update the totalCartAmount and coupon field in Cart document

    cart.totalCartAmount = newTotalCartAmount;
    cart.coupon = coupon._id;

    await cart.save();

    return {
      success: true,
      message: "Coupon applied successfully",
      data: {
        code: coupon.code,
        discount: coupon.discount,
        newTotalCartAmount: newTotalCartAmount,
      },
    };
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
}

export async function selectDeliveryOptionsAction(
  params: selectDeliveryOptionsParams
) {
  try {
    await connectToDatabase();
    const { cartId, deliveryOption } = params;

    // Get the new delivery option's price
    const newDeliveryOption = await Delivery.findById(deliveryOption).select({
      price: 1,
    });

    if (!newDeliveryOption) {
      throw new Error("Invalid delivery option");
    }

    const cart = await Cart.findById(cartId)
      .select({
        totalCartAmount: 1,
      })
      .populate({
        path: "deliveryOption",
        select: "price",
      });

    if (!cart) {
      throw new Error("Cart not found");
    }

    // If there's an existing delivery option, adjust the totalCartAmount
    if (cart.deliveryOption) {
      cart.totalCartAmount = parseFloat(
        (
          cart.totalCartAmount -
          cart.deliveryOption.price +
          newDeliveryOption.price
        ).toFixed(2)
      );
    } else {
      // If no previous delivery option, just add the new one
      cart.totalCartAmount = parseFloat(
        (cart.totalCartAmount + newDeliveryOption.price).toFixed(2)
      );
    }

    // Update the delivery option in the cart
    cart.deliveryOption = new mongoose.Types.ObjectId(deliveryOption);

    await cart.save();

    return { success: true };
  } catch (error) {
    throw new Error("Failed to update delivery option");
  }
}

export async function removeCouponServerAction(params: removeCouponParams) {
  try {
    const { cartId } = params;

    await connectToDatabase();

    const cart = await Cart.findById(cartId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.coupon = undefined;

    const itemsTotalAmount = cart.cartItems.reduce(
      (total: number, item: any) => total + item.totalItemsPrice,
      0
    );

    const deliveryPrice = cart.deliveryOption?.price || 0;

    const newTotalCartAmount = parseFloat(
      (itemsTotalAmount + deliveryPrice).toFixed(2)
    );

    cart.totalCartAmount = newTotalCartAmount;

    await cart.save();

    return {
      success: true,
      data: {
        newTotalCartAmount: newTotalCartAmount,
      },
    };
  } catch (error) {
    throw error;
  }
}
