"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  UpdateUserAddressParams,
  UpdateUserParams,
  addItemToWishListParams,
  getUserImageParams,
  removeItemFromWishListParams,
} from "./shared.types";
import User from "@/databases/user.model";
import Address from "@/databases/address.model";
import mongoose from "mongoose";

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { userId, updateData, path } = params;
    await User.findOneAndUpdate({ userId }, updateData, {
      new: true,
    });
    revalidatePath(path);

    return { success: true, message: "Update successfully" };
  } catch (error) {
    throw error;
  }
}

export async function updateUserAddress(params: UpdateUserAddressParams) {
  try {
    connectToDatabase();
    const { userId, updateData, path } = params;
    const user = await User.findById(userId).populate("address");

    if (!user) {
      throw new Error("User not found");
    }

    if (user.address) {
      await Address.findByIdAndUpdate(user.address._id, updateData, {
        new: true,
      });
    } else {
      // If the user doesn't have an address, create one and associate it with the user
      const newAddress = new Address(updateData);
      await newAddress.save();
      user.address = newAddress._id;
      await user.save();
    }
    revalidatePath(path);

    return { success: true, message: "Update successfully" };
  } catch (error) {
    throw error;
  }
}

export async function getUserImage(params: getUserImageParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId).select({
      _id: 0,
      image: 1,
    });

    const parseUser = JSON.parse(JSON.stringify(user));

    return { parseUser };
  } catch (error) {
    throw error;
  }
}

export async function addItemToWishList(params: addItemToWishListParams) {
  try {
    connectToDatabase();
    const { userId, product } = params;

    const productObjectId = new mongoose.Types.ObjectId(product);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isProductInWishlist = user.wishlist.includes(productObjectId);
    if (isProductInWishlist) {
      return null;
    }
    user.wishlist.push(productObjectId);
    await user.save();

    return { message: "Added to WishList", wishlist: user.wishlist };
  } catch (error) {
    throw error;
  }
}

export async function removeItemFromWishList(
  params: removeItemFromWishListParams
) {
  try {
    connectToDatabase();
    const { userId, product } = params;

    const productObjectId = new mongoose.Types.ObjectId(product);

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the product is in the wishlist
    const isProductInWishlist = user.wishlist.includes(productObjectId);
    if (!isProductInWishlist) {
      return { message: "Product is not in wishlist" };
    }

    // Remove the product from the wishlist
    user.wishlist = user.wishlist.filter(
      (item: any) => !item.equals(productObjectId)
    );

    // Save the updated user document
    await user.save();

    return { message: "Removed from WishList", wishlist: user.wishlist };
  } catch (error) {
    throw error;
  }
}
