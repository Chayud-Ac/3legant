"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { UpdateUserAddressParams, UpdateUserParams } from "./shared.types";
import User from "@/databases/user.model";
import Address from "@/databases/address.model";

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { userId, updateData, path } = params;
    await User.findOneAndUpdate({ userId }, updateData, {
      new: true,
    });
    revalidatePath(path);
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
  } catch (error) {
    throw error;
  }
}
