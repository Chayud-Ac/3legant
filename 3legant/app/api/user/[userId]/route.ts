import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/databases/user.model";
import Address from "@/databases/address.model";
import { Cart } from "@/databases/cart.model";
import mongoose from "mongoose";

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

      case "cart":
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const cart = await Cart.findOne({
          user: userObjectId,
          isActive: true,
        }).populate({
          path: "cartItems.product",
          select: "category slug name",
        });

        console.log(JSON.parse(JSON.stringify(cart)));

        // create format that match with the state in redux
        let formattedCart;
        if (cart) {
          formattedCart = {
            cartId: cart._id.toString(),
            userId: cart.user.toString(),
            items: cart.cartItems.map((item: any) => ({
              product: item.product._id.toString(),
              color: item.color,
              quantity: item.quantity,
              pricePerUnit: item.pricePerUnit,
              totalItemsPrice: item.totalItemsPrice,
              category: item.product.category, // Populated from Product model
              slug: item.product.slug, // Populated from Product model
              name: item.product.name, // Populated from Product model
            })),
            coupon: cart.coupon ? cart.coupon.toString() : null,
            deliveryOption: cart.deliveryOption
              ? cart.deliveryOption.toString()
              : undefined,
            totalCartAmount: cart.totalCartAmount,
          };
        }

        data = formattedCart;

        break;

      case "wishlist":
        const userDocument = await User.findById(userId)
          .select({ wishlist: 1 })
          .populate({
            path: "wishlist",
            select: "price name slug category",
          });

        if (!userDocument) {
          throw new Error("user not found");
        }

        data = userDocument.wishlist.map((product: any) => ({
          product: product._id.toString(),
          imgUrl: `${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${product.category}/${product.slug}/thumbnail.svg`,
          price: product.price,
          name: product.name,
        }));

        console.log(data);

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
