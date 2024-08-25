import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/databases/product.model";
import Review from "@/databases/review.model";
import { NextResponse } from "next/server";
import { FilterQuery } from "mongoose";

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

    console.log(currentBatch, pageSize, r, productId);
    const skipAmount = (currentBatch - 1) * pageSize;
    const sortQuery: any = {};

    if (r) {
      switch (r) {
        case "allReviews" || "":
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
          break;
      }
    }

    // Initialize the filter query
    const filterQuery: any = { productId: productId };

    // pagination
    // ถ้ามีการ cursor fetch มา จาก front cursor คือ review document id สุดท้าย ที่ response กลับไป ครั้งที่แล้ว
    // เราจะ query ดึง document ถัดจาก document นั้น แล้ว response กลับไป

    const reviews = await Review.find(filterQuery)
      .populate({
        path: "user",
        select: "displayName image",
      })
      .populate({
        path: "replies",
        populate: {
          path: "user",
          select: "displayName image",
        },
      })
      .select({
        product: 0,
      })
      .skip(skipAmount)
      .sort(sortQuery)
      .limit(pageSize)
      .exec();

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
