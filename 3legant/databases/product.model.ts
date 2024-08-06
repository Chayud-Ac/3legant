import { Schema, models, model, Document } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  colorStock: Record<string, number>; // define the object with string key and value as number red : 100 blue : 100 , etc
  totalStock: number;
  category: string;
  images?: Record<string, string[]>; // define the object with string key and value as array of image path
  thumbnail: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  colorStock: { type: Map, of: Number, required: true },
  totalStock: { type: Number, required: true },
  category: { type: String, required: true },
  images: { type: Map, of: [String], required: true },
  thumbnail: { type: String, required: true },
});

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
