import { model, models, Schema, Document } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discount: number;
  expiration: Date;
  isActive: boolean;
  minPrice: number;
  maxPrice: number;
}

const couponSchema = new Schema<ICoupon>({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  expiration: { type: Date },
  isActive: { type: Boolean, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
});

export const Coupon = models.Coupon || model<ICoupon>("Coupon", couponSchema);
