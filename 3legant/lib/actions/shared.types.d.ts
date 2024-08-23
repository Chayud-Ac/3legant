import { IAddress } from "@/databases/address.model";
import { IReview } from "@/databases/review.model";
import { IUser } from "@/databases/user.model";

export interface GetDiscountProducts {
  noOfProduct?: number;
  percentage: number;
}

export interface GetNewArrivalProducts {
  noOfProduct?: number;
  newArrival?: boolean;
}

export interface UpdateUserParams {
  userId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface UpdateUserAddressParams {
  userId: string;
  updateData: Partial<IAddress>;
  path: string;
}

export interface reviewProductParams {
  productId: string;
  userId: string;
  reviewData: Partial<IReview>;
  path: string;
}
