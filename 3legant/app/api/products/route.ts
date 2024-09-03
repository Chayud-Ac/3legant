import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/databases/product.model";
import Room from "@/databases/room.model";
import { FilterQuery } from "mongoose";
import { NextResponse } from "next/server";
import { newArrivalThreshold } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    // destruct searchParams และ พวก query key เพื่อใช้ในการ query
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);
    const searchQuery = searchParams.get("searchQuery");
    const room = searchParams.get("room") || "allRooms";
    const maxPriceStr = searchParams.get("maxPrice");
    const minPriceStr = searchParams.get("minPrice");
    let maxPrice: number | undefined = undefined;
    let minPrice: number | undefined = undefined;
    if (maxPriceStr) {
      maxPrice = parseInt(maxPriceStr, 10);
    }
    if (minPriceStr) {
      minPrice = parseInt(minPriceStr, 10);
    }

    await connectToDatabase();

    // searchQuery เป็น string handle ถ้า user พิมหา product ใน global search
    // ถ้ามี searchQuery เราจะ เซ็ท globalQuery ที่ใช้ query ใน mongo collection หา name หรือ ว่า description field ของ document ให้ตรงกับ ที่ user พิมมา
    const globalQuery: FilterQuery<typeof Product> = {};
    if (searchQuery) {
      globalQuery.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { category: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    // pagination หา ตัว productId ถัดไป
    if (cursor) {
      globalQuery._id = { $gt: cursor };
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      globalQuery.price = { $gte: minPrice, $lte: maxPrice };
    }

    // newArrivalThreshold util function ไว้ใช้ เช็คว่า product เป็น  newArrival ไหม (เช็คภายใน 10 วัน)
    const tresHoldDate = newArrivalThreshold(10);

    const selectedField = {
      name: 1,
      slug: 1,
      description: 1,
      avgRating: 1,
      price: 1,
      thumbnail: 1,
      discount: 1,
      category: 1,
      newArrival: {
        $cond: {
          if: { $gte: ["$createdAt", tresHoldDate] },
          then: true,
          else: false,
        },
      },
    };

    let products = [];
    let hasMore = false;
    let nextCursor = null;

    if (room !== "allRooms") {
      const roomDoc = await Room.findOne({ name: room }).populate({
        path: "products",
        match: globalQuery,
        select: selectedField,
        options: {
          sort: { _id: 1 },
          limit: pageSize + 1,
        },
      });

      if (roomDoc && roomDoc.products.length > 0) {
        products = roomDoc.products;
      }
    } else {
      products = await Product.find(globalQuery)
        .sort({ _id: 1 })
        .limit(pageSize + 1)
        .select(selectedField)
        .exec();
    }

    // เช็คว่า length product ยังมีมากกว่าจำนวน product ที่ display ใน ui ไหม

    if (products.length > pageSize) {
      hasMore = true;
      products.pop();
    }

    nextCursor = products.length > 0 ? products[products.length - 1]._id : null;

    return new NextResponse(JSON.stringify({ products, nextCursor, hasMore }), {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
