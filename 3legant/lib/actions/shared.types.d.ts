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

export interface replyReviewParams {
  reviewId: string;
  userId: string;
  comment: string;
  path: string;
}

export interface getReviewRepliesParams {
  reviewId: string;
  currentBatch?: number;
  batchSize: number;
  path: string;
}

export interface getUserImageParams {
  userId: string;
}

export interface addItemToCartParams {
  cartId?: string;
  userId: string;
  cartItem: {
    productId: string;
    color: string;
    quantity: number;
    pricePerUnit: number;
    totalItemsPrice: number;
  };
}

export interface incrementItemQuantityParams {
  cartId?: string;
  userId?: string;
  product: string;
  color: string;
}

export interface removeFromCartParams {
  cartId?: string;
  product: string;
  color: string;
  userId?: string;
}

export interface addItemToWishListParams {
  userId: string;
  product: string;
}

export interface removeItemFromWishListParams {
  userId: string;
  product: string;
}

export interface applyCouponParams {
  cartId: string;
  code: string;
}

export interface selectDeliveryOptionsParams {
  cartId: string;
  deliveryOption: string;
}

export interface removeCouponParams {
  cartId: string;
}

export interface createOrderParams {
  cartId: string;
  userId: string;
  contact: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
  };
  shippingAddress: {
    street: string;
    country: string;
    city: string;
    state: string;
    zipCode: number;
  };
  paymentMethod: string;
}

export interface updateOrderStatusParams {
  orderId: string;
}
