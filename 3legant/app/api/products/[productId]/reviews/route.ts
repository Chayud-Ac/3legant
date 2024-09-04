import { connectToDatabase } from "@/lib/mongoose";
import Review from "@/databases/review.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// route นี้ จะ handle request สำหรับ review section ของ productId นั้นๆ
// มีการ apply pagination , filter (recent , most rate , etc .. )

interface GetReviewsParams {
  currentBatch?: number;
  pageSize?: number;
  r: string;
  productId: string;
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = params.productId;
    const r = searchParams.get("r");
    const currentBatch = Number(searchParams.get("currentBatch")) || 1;
    const pageSize = 5;

    connectToDatabase();

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
          sortQuery.createdAt = -1;
          break;
      }
    }

    sortQuery._id = -1;

    const filterQuery: any = {
      product: new mongoose.Types.ObjectId(productId),
    };

    const reviews = await Review.aggregate([
      // 1. Match the filter criteria
      { $match: filterQuery },

      // 6. Sort the reviews
      { $sort: sortQuery },

      // 7. Pagination: Skip and Limit
      { $skip: skipAmount },
      { $limit: pageSize },

      // 2. Lookup to populate the 'user' field
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" }, // Unwind to convert 'user' array to object

      // 3. Lookup to populate 'replies.userDetails' using a pipeline
      {
        $lookup: {
          from: "users",
          let: { replyUsers: "$replies.user" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$replyUsers"] } } },
            { $project: { _id: 1, displayName: 1, image: 1 } },
          ],
          as: "replyUserDetails",
        },
      },

      // 4. Map 'replies' to include 'userDetails'
      {
        $addFields: {
          replies: {
            $map: {
              input: "$replies",
              as: "reply",
              in: {
                _id: "$$reply._id",
                user: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$replyUserDetails",
                        as: "userDetail",
                        cond: { $eq: ["$$userDetail._id", "$$reply.user"] },
                      },
                    },
                    0,
                  ],
                },
                comment: "$$reply.comment",
                createdAt: "$$reply.createdAt",
              },
            },
          },
        },
      },

      // 5. Filter out invalid replies
      {
        $addFields: {
          filteredReplies: {
            $filter: {
              input: "$replies",
              as: "reply",
              cond: { $ne: ["$$reply.user", null] }, // Ensures 'user' exists
            },
          },
        },
      },
      {
        $addFields: {
          replies: {
            $slice: ["$filteredReplies", 1], // Get the first reply only
          },
          hasMoreReply: { $gt: [{ $size: "$filteredReplies" }, 1] }, // Check if more than one reply exists
        },
      },

      // 8. Project the necessary fields
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
          replies: 1,
          createdAt: 1,
          hasMoreReply: 1,
        },
      },
    ]);

    let hasMore = false;

    const totalReviews = await Review.countDocuments(filterQuery);

    hasMore = totalReviews > skipAmount + reviews.length;

    return new NextResponse(JSON.stringify({ reviews, hasMore }), {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
}
