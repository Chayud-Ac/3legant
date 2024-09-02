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

// [
//   {
//     _id: '66d5b1177cac787b61bbd4ab',
//     product: '66bc93efde454f0e8f7163fe',
//     user: {
//       _id: '66b25fde18865a5b13d7c459',
//       displayName: 'Ac_Chayud',
//       image:
//         'https://storage.googleapis.com/profile3legant/36b4af29-f0f1-44d8-8644-e9130b648766.png'
//     },
//     rating: 5,
//     comment: 'Test 6',
//     replies: [],
//     createdAt: '2024-09-02T12:35:35.597Z',
//     hasMoreReply: false
//   },
//   {
//     _id: '66d5b09d7cac787b61bbd3ed',
//     product: '66bc93efde454f0e8f7163fe',
//     user: {
//       _id: '66b25fde18865a5b13d7c459',
//       displayName: 'Ac_Chayud',
//       image:
//         'https://storage.googleapis.com/profile3legant/36b4af29-f0f1-44d8-8644-e9130b648766.png'
//     },
//     rating: 5,
//     comment: 'Test 2 ',
//     replies: [
//       {
//         _id: '66d5b0a67cac787b61bbd3f9',
//         user: {
//           _id: '66b25fde18865a5b13d7c459',
//           displayName: 'Ac_Chayud',
//           image:
//             'https://storage.googleapis.com/profile3legant/36b4af29-f0f1-44d8-8644-e9130b648766.png'
//         },
//         comment: 'Test Reply 2',
//         createdAt: '2024-09-02T12:33:42.302Z'
//       }
//     ],
//     createdAt: '2024-09-02T12:33:33.513Z',
//     hasMoreReply: true
//   },
//   {
//     _id: '66d5b08a7cac787b61bbd3cc',
//     product: '66bc93efde454f0e8f7163fe',
//     user: {
//       _id: '66b25fde18865a5b13d7c459',
//       displayName: 'Ac_Chayud',
//       image:
//         'https://storage.googleapis.com/profile3legant/36b4af29-f0f1-44d8-8644-e9130b648766.png'
//     },
//     rating: 5,
//     comment: 'Test 1 ',
//     replies: [
//       {
//         _id: '66d5b0937cac787b61bbd3d9',
//         user: {
//           _id: '66b25fde18865a5b13d7c459',
//           displayName: 'Ac_Chayud',
//           image:
//             'https://storage.googleapis.com/profile3legant/36b4af29-f0f1-44d8-8644-e9130b648766.png'
//         },
//         comment: 'test Reply 1',
//         createdAt: '2024-09-02T12:33:23.702Z'
//       }
//     ],
//     createdAt: '2024-09-02T12:33:14.733Z',
//     hasMoreReply: true
//   },
//   {
//     _id: '66d5b1137cac787b61bbd49f',
//     product: '66bc93efde454f0e8f7163fe',
//     user: {
//       _id: '66b25fde18865a5b13d7c459',
//       displayName: 'Ac_Chayud',
//       image:
//         'https://storage.googleapis.com/profile3legant/36b4af29-f0f1-44d8-8644-e9130b648766.png'
//     },
//     rating: 4,
//     comment: 'Test 5',
//     replies: [],
//     createdAt: '2024-09-02T12:35:31.184Z',
//     hasMoreReply: false
//   },
//   {
//     _id: '66d5b0ce7cac787b61bbd426',
//     product: '66bc93efde454f0e8f7163fe',
//     user: {
//       _id: '66b25fde18865a5b13d7c459',
//       displayName: 'Ac_Chayud',
//       image:
//         'https://storage.googleapis.com/profile3legant/36b4af29-f0f1-44d8-8644-e9130b648766.png'
//     },
//     rating: 3,
//     comment: 'Test 3 Rating 3 ',
//     replies: [
//       {
//         _id: '66d5b0d47cac787b61bbd432',
//         user: {
//           _id: '66b25fde18865a5b13d7c459',
//           displayName: 'Ac_Chayud',
//           image:
//             'https://storage.googleapis.com/profile3legant/36b4af29-f0f1-44d8-8644-e9130b648766.png'
//         },
//         comment: 'Test Rating 1',
//         createdAt: '2024-09-02T12:34:28.822Z'
//       }
//     ],
//     createdAt: '2024-09-02T12:34:22.090Z',
//     hasMoreReply: true
//   }
// ]
