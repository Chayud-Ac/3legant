import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/databases/user.model";
import Address from "@/databases/address.model";
import { Cart } from "@/databases/cart.model";
import mongoose from "mongoose";
import Delivery from "@/databases/delivery.model";

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
        })
          .populate({
            path: "coupon",
            select: "code discount -_id",
          })
          .populate({
            path: "cartItems.product",
            select: "category slug name",
          });

        let formattedCart;
        let delivery;

        // ถ้ามี cart สร้าง แล้ว ก็ format cart ให้ตรงกับ type state ของ cart redux state ถ้ายัง ก็ format cart เป็น null cart redux state ก็จะ set ค่าตั้งต้นเป็น initial state ที่เรากำหนดไว้

        if (cart) {
          delivery = await Delivery.findById(cart.deliveryOption);
          const deepCloneDelivery = JSON.parse(JSON.stringify(delivery));
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
            coupon: cart.coupon
              ? cart.coupon
              : { code: undefined, discount: undefined },
            deliveryOption: cart.deliveryOption
              ? deepCloneDelivery
              : { _id: undefined, name: undefined, price: 0 },
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
