import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/databases/product.model";
import Review from "@/databases/review.model";
import { NextRequest, NextResponse } from "next/server";
import { newArrivalThreshold } from "@/lib/utils";

// route นี้ จะ handle request ของ ตัว productId นั้นๆ ซึง จะ reponse document ของ productId นั้นๆ และ total review ของ productId นั้นๆ
// query สอง collections Product (ดึง document ของ productId นั้นๆ) กับ Review (count totalReview ของ productId นั้นๆ ใน Review Collection )

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    await connectToDatabase();

    const productId = params.productId;

    if (!productId) {
      return new NextResponse(JSON.stringify({ message: "No productId" }), {
        status: 400,
      });
    }

    const product = await Product.findById(productId).select({
      thumbnail: 0,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        {
          status: 404,
        }
      );
    }

    // Check if the product is new Arrival
    const tresHoldDate = newArrivalThreshold(10);
    const productCreatedAt = new Date(product.createdAt);
    const newArrival = productCreatedAt >= tresHoldDate;

    // get the total review of the product by count the document in the Review collection

    const totalReviews = await Review.countDocuments({ product: productId });

    // response the data back with object with keys of product , totalReviews , newArrival

    return new NextResponse(
      JSON.stringify({ product, totalReviews, newArrival }),
      {
        status: 200,
      }
    );
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
