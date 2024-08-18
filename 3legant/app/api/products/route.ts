import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/databases/product.model";
import Room from "@/databases/room.model";
import { FilterQuery } from "mongoose";
import { NextResponse } from "next/server";
import { newArrivalThreshold } from "@/lib/utils";

interface GetProductsParams {
  cursor?: string; // the last product Id from recent response
  pageSize?: number; // the amount of data that will be fetched and displayed on the UI
  searchQuery?: string; // value of Searchquery key for text input query
  room?: string; // value of room key
  maxPrice?: number; // value of maxPrice key
  minPrice?: number; // value of minPrice key
}

export async function POST(req: Request) {
  try {
    const params: GetProductsParams = await req.json();
    connectToDatabase();
    const {
      cursor,
      pageSize = 12,
      searchQuery,
      room = "allRooms",
      maxPrice,
      minPrice,
    } = params;

    console.log(cursor, pageSize, searchQuery, room, maxPrice, minPrice);

    const globalQuery: FilterQuery<typeof Product> = {};

    const tresHoldDate = newArrivalThreshold(10); // within 10 day from currentDate

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
        // added the newArrival key to the return document which this key will use to logically check the newArrival style in the frontend
        $cond: {
          if: { $gte: ["$createdAt", tresHoldDate] },
          then: true,
          else: false,
        },
      },
    };

    if (searchQuery) {
      globalQuery.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    if (cursor) {
      globalQuery._id = { $gt: cursor }; // เซ็ท id เป็น productId ตัว สุดท้ายของ การ fetch ครั้งที่แล้ว เพื่อ query ดึง product ถัดจาก id นั้น
    }

    if (minPrice !== null && maxPrice !== null) {
      globalQuery.price = { $gte: minPrice, $lte: maxPrice };
    }

    let products = [];
    let hasMore = false;
    let nextCursor = null;

    if (room && room !== "allRooms") {
      // Query the Room collection and populate products with the global query
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
      // ถ้าไม่มี room query param มาเรา จะใช้ตัว Product Collection ในการ ดึงข้อมูล products
      products = await Product.find(globalQuery)
        .sort({ _id: 1 })
        .limit(pageSize + 1) // เซ็ท limit ไว้ เกิน pageSize 1 document เพื่อใช้ เช็คว่ามี productพอ ที่จะ fetch กลับไปครั้งต่อไปไหม
        .select(selectedField)
        .exec();
    }

    if (products.length > pageSize) {
      hasMore = true;
      products.pop(); // หลังจาก check เสร็จก็ pop ออก ให้เหลือ 12 เท่าเดิม
    }

    nextCursor = products.length > 0 ? products[products.length - 1]._id : null;

    console.log(products);

    return new NextResponse(JSON.stringify({ products, nextCursor, hasMore }), {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
}
