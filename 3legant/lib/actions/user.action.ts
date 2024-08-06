"use server";

import { connectToDatabase } from "../mongoose";

export async function userSignup() {
  try {
    connectToDatabase();
  } catch (error) {
    throw error;
  }
}
