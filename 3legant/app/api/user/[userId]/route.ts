import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/databases/user.model";
import Address from "@/databases/address.model";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectToDatabase();

    const userId = params.userId;
    const query = req.nextUrl.searchParams.get("q");

    console.log(query);

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "No UserFound" }), {
        status: 400,
      });
    }

    let data;

    switch (query) {
      case null:
        break;

      case "account":
        data = await User.findById(userId).select({
          _id: 0,
          firstName: 1,
          lastName: 1,
          displayName: 1,
        });
        console.log(data);
        break;

      case "address":
        console.log("test");
        const user = await User.findById(userId).select({
          _id: 0,
          address: 1,
        });

        data = await Address.findById(user.address);

        break;

      case "order":
        break;

      case "wishlist":
        break;

      default:
        break;
    }

    console.log(JSON.stringify(data));

    return new NextResponse(JSON.stringify({ data }), {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
