"use server";

import { connectToDatabase } from "../mongoose";

export async function userSignup() {
  try {
    connectToDatabase();
  } catch (error) {
    throw error;
  }
}

// {"_id":{"$oid":"66bb715d7c7dcaa8f2d1d131"},
//   "name": "Sample Product",
//   "description": "This is a sample product description.",
//   "price": 49.99,
//   "colorStock": {
//     "Red": 10,
//     "Blue": 15,
//     "Green": 5
//   },
//   "totalStock": 30,
//   "category": "Living Room",
//   "images": {
//     "Red": ["red-image1.jpg", "red-image2.jpg"],
//     "Blue": ["blue-image1.jpg", "blue-image2.jpg"],
//     "Green": ["green-image1.jpg"]
//   },
//   "thumbnail": "thumbnail-image.jpg"
// }
