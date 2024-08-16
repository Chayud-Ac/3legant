import { Schema, model, Document, models } from "mongoose";

export interface IRoom extends Document {
  name: string;
  products: Schema.Types.ObjectId[];
}

const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
});

const Room = models.Room || model<IRoom>("Room", roomSchema);

export default Room;
