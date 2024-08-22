import { Schema, models, model, Document } from "mongoose";

export interface IAddress extends Document {
  street: string;
  country: string;
  city: string;
  state: string;
  zipCode: Number;
}

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: Number, required: true },
});

const Address = models.Address || model("Address", AddressSchema);

export default Address;
