import { Schema, model, Document, models } from "mongoose";

// Define the interface for the Discount schema
export interface IDiscount extends Document {
  products: Schema.Types.ObjectId[];
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
}

const discountSchema = new Schema<IDiscount>({
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  discountPercentage: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Discount =
  models.Discount || model<IDiscount>("Discount", discountSchema);

export default Discount;
