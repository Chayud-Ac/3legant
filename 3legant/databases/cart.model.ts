import { Schema, model, models, Document } from "mongoose";

export interface ICart extends Document {
  user: Schema.Types.ObjectId;
  cartItems: {
    product: Schema.Types.ObjectId;
    color: string;
    quantity: number;
    pricePerUnit: number;
    totalItemsPrice: number;
  }[];
  coupon: Schema.Types.ObjectId;
  deliveryOption: Schema.Types.ObjectId;
  totalCartAmount: number;
  isActive: boolean;
}

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cartItems: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      color: { type: String, required: true },
      quantity: { type: Number, required: true },
      pricePerUnit: { type: Number, required: true },
      totalItemsPrice: { type: Number, required: true },
    },
  ],
  coupon: { type: Schema.Types.ObjectId, ref: "Coupon" },
  deliveryOption: { type: Schema.Types.ObjectId, ref: "Delivery" },
  totalCartAmount: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

cartSchema.index({ user: 1, status: 1 });

export const Cart = models.Cart || model<ICart>("Cart", cartSchema);
