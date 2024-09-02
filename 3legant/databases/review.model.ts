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
  replies: [replySchema], // array of reply objects which include keys of user (who reply) , comment (content string) , createdAt (Date)
  createdAt: { type: Date, default: Date.now },
});

const Review = models.Review || model<IReview>("Review", reviewSchema);

export default Review;

/**
 * Paste one or more documents here
 */

// 66bc93efde454f0e8f7163fe
