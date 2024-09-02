"use server";
import Product from "@/databases/product.model";
import { connectToDatabase } from "../mongoose";
import {
  getReviewRepliesParams,
  replyReviewParams,
  reviewProductParams,
} from "./shared.types";
import Review from "@/databases/review.model";
import mongoose, { Schema } from "mongoose";
import { revalidatePath } from "next/cache";

export async function reviewProduct(params: reviewProductParams) {
  try {
    connectToDatabase();
    const { productId, userId, reviewData, path } = params;

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

    revalidatePath(path);

    const parseNewReview = JSON.parse(JSON.stringify(newReview));
    const { __v, ...reviewWithoutIdAndVersion } = parseNewReview;

    return { success: true, parseNewReview: reviewWithoutIdAndVersion };
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
      { new: true, fields: { replies: { $slice: -1 } } }
    );

    const newReply = updatedReview.replies[updatedReview.replies.length - 1];

    const parseNewReply = JSON.parse(JSON.stringify(newReply));

    console.log(parseNewReply);

    revalidatePath(path);

    return { parseNewReply };
  } catch (error) {
    throw error;
  }
}

export async function getReviewReplies(params: getReviewRepliesParams) {
  try {
    connectToDatabase();
    const { reviewId, path, currentBatch = 1, batchSize } = params;

    const skipAmount = (currentBatch - 1) * batchSize + 1;
    const limitAmount = skipAmount + batchSize;

    console.log(skipAmount);

    const replies = await Review.findById(reviewId)
      .select({
        replies: { $slice: [skipAmount, limitAmount] },
        _id: 0,
        product: 0,
        user: 0,
        rating: 0,
        comment: 0,
        likes: 0,
        createdAt: 0,
        __v: 0,
      })
      .populate({
        path: "replies.user",
        select: "displayName image -_id",
      });

    const totalRepliesCount = await Review.findById(reviewId)
      .select({ replies: 1, _id: 0 })
      .then((review) => review?.replies.length || 0);

    const hasMore = skipAmount + limitAmount < totalRepliesCount;

    const parseReplies = JSON.parse(JSON.stringify(replies));

    console.log(parseReplies);

    revalidatePath(path);

    return { replies: parseReplies.replies, hasMore, success: true };
  } catch (error) {
    throw error;
  }
}
