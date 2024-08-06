import { Schema, models, model, Document } from "mongoose";

export interface IAddress extends Document {
  street: string;
  country: string;
  town: string;
  state: string;
  zipCode: string;
}

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  country: { type: String, required: true },
  town: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const Address = models.Address || model("Address", AddressSchema);

export default Address;
