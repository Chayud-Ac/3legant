import User from "@/databases/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: any) {
  const { name, username, email, password } = await request.json();
  console.log(name);
  await connectToDatabase();

  const user = await User.findOne({ email });

  if (user) {
    return new NextResponse("Email is already used", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    name,
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("Register successful", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
}
