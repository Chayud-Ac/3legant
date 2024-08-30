import { Schema, model, models, Document } from "mongoose";

export interface IDelivery extends Document {
  name: string;
  price: number;
}

const deliverySchema = new Schema<IDelivery>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Delivery =
  models.Delivery || model<IDelivery>("Delivery", deliverySchema);

export default Delivery;
