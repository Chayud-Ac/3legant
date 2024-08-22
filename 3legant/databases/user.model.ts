import { Schema, models, model, Document } from "mongoose";

// this interface type will use to check with any action that will try to save the document to the model
// So this make sure that the key and value in the document is matching with type of key and value that store in the schema

export interface IUser extends Document {
  userName?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email: string;
  password: string;
  image?: string;
  address?: Schema.Types.ObjectId;
  wishlist?: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  userName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  displayName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

// creat User Schema

const User = models.User || model("User", UserSchema);

export default User;
