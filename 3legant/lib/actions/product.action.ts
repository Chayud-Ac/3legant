"use server";

import { GetDiscountProducts } from "./shared.types";
import { GetNewArrivalProducts } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import Discount from "@/databases/discount.model";
import Product from "@/databases/product.model";
import { newArrivalThreshold } from "../utils";

export async function getDiscountProducts(params: GetDiscountProducts) {
  connectToDatabase();

  try {
    const { noOfProduct = 6, percentage } = params;
    let products = [];

    const newArrivalDate = newArrivalThreshold(10);

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
          createdAt: 1,
        },
      })
      .limit(noOfProduct);

    if (discountProducts && discountProducts.products.length > 0) {
      products = discountProducts.products.map((product: any) => {
        const isNewArrival = new Date(product.createdAt) >= newArrivalDate;
        return {
          ...product._doc,
          newArrival: isNewArrival,
        };
      });
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

    const newArrivalDate = newArrivalThreshold(10);

    const products = await Product.find({
      createdAt: { $gte: newArrivalDate },
    })
      .sort({ createdAt: -1 })
      .select({
        description: 0,
        colorStock: 0,
        totalStock: 0,
        images: 0,
      })
      .limit(noOfProduct);

    console.log(JSON.parse(JSON.stringify(products)));

    const newArrivalProducts = products.map((product: any) => {
      const productData = product.toObject();
      productData.newArrival = new Date(product.createdAt) >= newArrivalDate;
      return productData;
    });

    console.log(newArrivalProducts);

    return { products: newArrivalProducts };
  } catch (error) {
    throw error;
  }
}
