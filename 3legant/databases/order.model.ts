import { model, models, Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  cart: Schema.Types.ObjectId;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  dateOrdered: Date;
  shippingAddress: {
    street: string;
    country: string;
    city: string;
    state: string;
    zipCode: number; // should be lowercase `number`
  };
  contact: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
  };
}

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  paymentMethod: { type: String, required: true, default: "credit_card" },
  paymentStatus: { type: String, required: true, default: "pending" },
  status: { type: String, required: true, default: "processing" },
  dateOrdered: { type: Date, required: true, default: Date.now },
  shippingAddress: {
    street: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: Number, required: true },
  },
  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
  },
});

export const Order = models.Order || model<IOrder>("Order", OrderSchema);
