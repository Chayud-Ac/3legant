import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/databases/product.model";
import Review from "@/databases/review.model";
import { NextResponse } from "next/server";
import mongoose, { FilterQuery } from "mongoose";

// route นี้ จะ handle request สำหรับ review section ของ productId นั้นๆ
// มีการ apply pagination , filter (recent , most rate , etc .. )

interface GetReviewsParams {
  currentBatch?: number;
  pageSize?: number;
  r: string;
  productId: string;
}

export async function POST(req: Request) {
  try {
    const params: GetReviewsParams = await req.json();
    connectToDatabase();
    const { currentBatch = 1, pageSize = 5, r, productId } = params;

    const skipAmount = (currentBatch - 1) * pageSize;

    let sortQuery: any = {};

    if (r) {
      switch (r) {
        case "allReviews":
        case "":
          sortQuery.createdAt = -1;
          break;
        case "newest":
          sortQuery.createdAt = -1;
          break;
        case "mostLike":
          sortQuery.likes = -1;
          break;
        case "mostRating":
          sortQuery.rating = -1;
          break;
        default:
          sortQuery.createdAt = -1; // Default sorting if none of the above cases match
          break;
      }
    }

    // Add secondary sort on _id to ensure consistent ordering
    sortQuery._id = -1;

    // Initialize the filter query
    const filterQuery: any = {
      product: new mongoose.Types.ObjectId(productId),
    };

    const reviews = await Review.aggregate([
      { $match: filterQuery }, // Apply the filter query
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" }, // Unwind the user array to get a single user object
      { $unwind: { path: "$replies", preserveNullAndEmptyArrays: true } }, // Unwind the replies array
      {
        $lookup: {
          from: "users",
          localField: "replies.user",
          foreignField: "_id",
          as: "replies.userDetails",
        },
      },
      {
        $unwind: {
          path: "$replies.userDetails",
          preserveNullAndEmptyArrays: true,
        }, // Unwind the userDetails array
      },
      {
        $group: {
          _id: "$_id",
          product: { $first: "$product" },
          user: { $first: "$user" },
          rating: { $first: "$rating" },
          comment: { $first: "$comment" },
          likes: { $first: "$likes" },
          createdAt: { $first: "$createdAt" },
          replies: {
            $push: {
              _id: "$replies._id",
              user: {
                _id: "$replies.userDetails._id",
                displayName: "$replies.userDetails.displayName",
                image: "$replies.userDetails.image",
              },
              comment: "$replies.comment",
              createdAt: "$replies.createdAt",
            },
          },
        },
      },
      {
        $addFields: {
          replies: { $slice: ["$replies", 1] }, // Limit the replies array to only 1 element
          hasMoreReply: { $gt: [{ $size: "$replies" }, 1] },
        },
      },
      { $sort: sortQuery }, // Sort the documents by the specified sortQuery
      { $skip: skipAmount }, // Skip the documents for pagination
      { $limit: pageSize }, // Limit the result to pageSize documents
      {
        $project: {
          product: 1,
          user: {
            _id: 1,
            displayName: 1,
            image: 1,
          },
          rating: 1,
          comment: 1,
          likes: 1,
          replies: 1, // Include the transformed replies field
          createdAt: 1,
          hasMoreReply: 1, // Check if there are more than 1 reply
        },
      },
    ]);

    console.log("Formatted Query Result:", JSON.parse(JSON.stringify(reviews)));

    let hasMore = false;

    const totalReviews = await Review.countDocuments(filterQuery);

    hasMore = totalReviews > skipAmount + reviews.length;

    console.log(JSON.parse(JSON.stringify(reviews)));

    return new NextResponse(JSON.stringify({ reviews, hasMore }), {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
}
