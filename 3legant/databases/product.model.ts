import { Schema, models, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string; // this use to form url when we try to get the image from the firebase cloud
  description: string;
  avgRating: number;
  price: number;
  colorStock: Record<string, number>; // define the object with string key and value as number red : 100 blue : 100 , etc
  totalStock: number;
  category: string;
  images?: Record<string, string[]>; // define the object with string key and value as array of image path
  thumbnail: string;
  createdAt: Date;
  discount?: {
    discountedPrice: number;
    discountPercentage: number;
    endDate: Date;
  };
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  avgRating: { type: Number },
  price: { type: Number, required: true },
  colorStock: { type: Map, of: Number, required: true },
  totalStock: { type: Number, required: true },
  category: { type: String, required: true },
  images: { type: Map, of: [String], required: true },
  thumbnail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  discount: {
    discountedPrice: { type: Number },
    discountPercentage: { type: Number },
    endDate: { type: Date },
  },
});

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;

// name: 'Stylish Chair',
// slug : 'stylish-chair'
// description: 'A very stylish chair.',
// price: 199.99,
// colorStock: {
//   black: 20,
//   white: 15,
//   grey: 10
// },
// totalStock : 45,
// category: 'Chair',
// rating : 5,
// images: {
//   color1: [
//     'productname/color1.svg',
//   ], // เป็น array เพือเราเพื่ม ตัว รูปภาพได้ใน อนาคตเผื่อเราจะเพื่มรูป
//   color2: [
//     'productname/color2.svg',
//   ], // เป็น array เพือเราเพื่ม ตัว รูปภาพได้ใน อนาคตเผื่อเราจะเพื่มรูป
// },
// thumbnail : “productname/thumbnail.svg”,
// createdAt: date,
// discount : {
//    discountedPrice :
//    discountPercentage :
//    endDate :
// }
// });
