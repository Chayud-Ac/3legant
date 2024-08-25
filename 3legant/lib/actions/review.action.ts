"use server";
import Product from "@/databases/product.model";
import { connectToDatabase } from "../mongoose";
import { replyReviewParams, reviewProductParams } from "./shared.types";
import Review from "@/databases/review.model";
import mongoose, { Schema } from "mongoose";
import { revalidatePath } from "next/cache";
import console from "console";

export async function reviewProduct(params: reviewProductParams) {
  try {
    connectToDatabase();
    const { productId, userId, reviewData, path } = params;
    console.log(params);
    if (!userId) {
      throw new Error("Please log in");
    }

    const newReview = new Review({
      product: new mongoose.Types.ObjectId(productId),
      user: new mongoose.Types.ObjectId(userId),
      rating: reviewData.rating,
      comment: reviewData.comment,
      likes: 0,
      replies: [],
      createdAt: new Date(),
    });

    await newReview.save();

    // Calculate the average rating using the Review schema
    const totalReviews = await Review.countDocuments({ product: productId });
    const totalRating = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      { $group: { _id: null, total: { $sum: "$rating" } } },
    ]);

    let avgRating: any;
    if (!totalRating[0]?.total) {
      // ถ้า ยังไม่มีการ rate เรา จะ เสร็จ avgRating เป็น ค่า rating แรก เลย
      avgRating = reviewData.rating;
    } else {
      avgRating = totalRating[0]?.total / totalReviews;
    }

    await Product.findByIdAndUpdate(productId, { avgRating });

    // Revalidate the path if necessary
    revalidatePath(path);

    return { message: "Success" };
  } catch (error) {
    throw error;
  }
}

export async function replyReview(params: replyReviewParams) {
  try {
    connectToDatabase();
    const { reviewId, userId, comment, path } = params;
    console.log(params);
    if (!userId) {
      throw new Error("Please log in");
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        $push: {
          replies: {
            user: new mongoose.Types.ObjectId(userId),
            comment: comment,
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    );

    console.log(updatedReview);

    const updatedReviewObject = JSON.parse(JSON.stringify(updatedReview));

    console.log(updatedReviewObject);

    revalidatePath(path);

    return { updatedReviewObject };
  } catch (error) {
    throw error;
  }
}
