import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/databases/user.model";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectToDatabase();

    const userId = params.userId;
    const query = req.nextUrl.searchParams.get("q");

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
        break;

      case "address":
        const addressDocument = await User.findById(userId)
          .select({
            _id: 0,
            address: 1,
          })
          .populate({
            path: "address",
          });

        data = addressDocument.address;
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
