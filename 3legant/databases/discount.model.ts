import { Schema, model, Document, models } from "mongoose";

export interface IProductDiscount {
  productId: Schema.Types.ObjectId;
  discountedPrice: number;
}

// Define the interface for the Discount schema
export interface IDiscount extends Document {
  products: IProductDiscount[];
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
}

const discountSchema = new Schema<IDiscount>({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      discountedPrice: { type: Number, required: true },
    },
  ], // Array of product discounts
  discountPercentage: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Discount =
  models.Discount || model<IDiscount>("Discount", discountSchema);

export default Discount;
