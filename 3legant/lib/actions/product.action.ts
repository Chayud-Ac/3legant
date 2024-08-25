"use server";

import { GetDiscountProducts } from "./shared.types";
import { GetNewArrivalProducts } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import Discount from "@/databases/discount.model";
import Product from "@/databases/product.model";
import { document } from "postcss";

export async function getDiscountProducts(params: GetDiscountProducts) {
  connectToDatabase();

  try {
    const { noOfProduct = 6, percentage } = params;
    let products = [];

    const discountProducts = await Discount.findOne({
      discountPercentage: percentage,
    })
      .select({
        products: 1,
        _id: 0,
      })
      .populate({
        path: "products",
        select: {
          discount: 1,
          name: 1,
          slug: 1,
          price: 1,
          thumbnail: 1,
          avgRating: 1,
          category: 1,
          newArrival: {
            $cond: {
              if: {
                $gt: [
                  "$createdAt",
                  new Date(new Date().setDate(new Date().getDate() - 30)),
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      })
      .limit(noOfProduct);

    if (discountProducts && discountProducts.products.length > 0) {
      products = discountProducts.products;
    }

    return { products };
  } catch (error) {
    throw error;
  }
}

export async function getNewArrivalProducts(params: GetNewArrivalProducts) {
  await connectToDatabase();

  try {
    const { noOfProduct = 6 } = params;

    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .select({
        discount: 1,
        name: 1,
        slug: 1,
        price: 1,
        thumbnail: 1,
        avgRating: 1,
        category: 1,
        newArrival: true,
      })
      .limit(noOfProduct);

    return { products };
  } catch (error) {
    throw error;
  }
}
