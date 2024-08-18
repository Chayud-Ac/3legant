import { model, models, Schema, Document } from "mongoose";

export interface IReply {
  user: Schema.Types.ObjectId;
  comment: string;
  createdAt: Date;
}

export interface IReview extends Document {
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  likes?: Schema.Types.ObjectId[];
  replies?: IReply[]; // Array of reply objects
  createdAt: Date;
}

const replySchema = new Schema<IReply>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const reviewSchema = new Schema<IReview>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // people who likes this review
  replies: [replySchema], // array of reply objects which include keys of user (who reply) , comment (content string) , createdAt (Date)
  createdAt: { type: Date, default: Date.now },
});

const Review = models.Review || model<IReview>("Review", reviewSchema);

export default Review;

/**
 * Paste one or more documents here
 */
