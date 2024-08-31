"use server";

import { Cart } from "@/databases/cart.model";
import { connectToDatabase } from "../mongoose";
import { createOrderParams, updateOrderStatusParams } from "./shared.types";
import { Order } from "@/databases/order.model";

export async function createOrder(params: createOrderParams) {
  try {
    connectToDatabase();

    const { cartId, userId, contact, shippingAddress, paymentMethod } = params;

    console.log(cartId, userId, contact, shippingAddress, paymentMethod);

    const newOrder = new Order({
      user: userId,
      cart: cartId,
      contact: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
        emailAddress: contact.emailAddress,
      },
      shippingAddress: {
        street: shippingAddress.street,
        country: shippingAddress.country,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
      },
      paymentMethod: paymentMethod,
      paymentStatus: "pending",
      status: "processing",
      dateOrdered: new Date(),
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    return {
      success: true,
      data: {
        orderId: savedOrder._id.toString(),
      },
    };
  } catch (error) {
    throw error;
  }
}

export async function updateOrderStatus(params: updateOrderStatusParams) {
  const { orderId } = params;
  try {
    connectToDatabase();

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: true,
      },
      { new: true }
    )
      .populate({
        path: "cart",
        select: "totalCartAmount cartItems.product cartItems.color -_id",
        populate: {
          path: "cartItems.product",
          select: "category slug",
        },
      })
      .select({
        cart: 1,
        dateOrdered: 1,
        paymentMethod: 1,
        status: 1,
      });

    const cartId = updatedOrder.cartId;

    const updateCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        isActive: false,
      },
      { new: true }
    );

    console.log(updatedOrder);

    const parseNewData = JSON.parse(JSON.stringify(updatedOrder));

    console.log(parseNewData);

    return {
      success: true,
      data: parseNewData,
    };
  } catch (error) {}
}
