import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/databases/user.model";
import Address from "@/databases/address.model";
import { Cart } from "@/databases/cart.model";
import mongoose from "mongoose";
import Delivery from "@/databases/delivery.model";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const delivery = await Delivery.find({});

    return new NextResponse(JSON.stringify({ delivery }), {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
