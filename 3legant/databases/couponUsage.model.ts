import { model, models, Schema, Document } from "mongoose";

export interface ICouponUsage extends Document {
  coupon: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  usedAt: Date;
}

const couponUsageSchema = new Schema<ICouponUsage>({
  coupon: { type: Schema.Types.ObjectId, ref: "Coupon", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  usedAt: { type: Date, default: Date.now },
});

couponUsageSchema.index({ couponId: 1, userId: 1 }, { unique: true });

const CouponUsage =
  models.CouponUsage || model("CouponUsage", couponUsageSchema);
