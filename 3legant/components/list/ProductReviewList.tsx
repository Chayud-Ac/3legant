"use client";

import React, { useEffect, useState } from "react";
import ProductReviewCard from "../cards/ProductReviewCard";
import LoadMore from "../shared/LoadMore";
import Filter from "../shared/Filter";
import { reviewFilters } from "@/constant/filter";
import { useSearchParams } from "next/navigation";
import ProductReviewForm from "../form/ProductReviewForm";

interface ProductReviewListProps {
  totalReviews?: number;
  productId: string;
  userSession: any;
}

export interface ReplyState {
  [reviewId: string]: {
    user: {
      _id: string;
      displayName?: string;
      image?: string;
    };
    comment: string;
    createdAt: string;
    _id: string;
  }[];
}

export interface Review {
  _id: string;
  product: string;
  user: {
    _id: string;
    displayName: string;
    image: string;
  };
  rating: number;
  comment: string;
  likes: number;
  replies?: {
    _id: string;
    user: {
      _id: string;
      displayName?: string;
      image?: string;
    };
    comment: string;
    createdAt: string;
    // You can use Date if you plan to work with Date objects
  }[];
  createdAt: string;
  hasMoreReply: boolean;
}

const ProductReviewList = ({
  totalReviews,
  productId,
  userSession,
}: ProductReviewListProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("r");
  const [currentBatch, setCurrentBatch] = useState(1);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [replyObject, setReplyObject] = useState<ReplyState>({});
  const [hasMore, setHasMore] = useState(true);

  console.log(replyObject);

  useEffect(() => {
    setCurrentBatch(1);

    const fetchReviews = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            r: query,
            productId,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setReviewList(data.reviews);
        const repliesObject = data.reviews.reduce((acc: any, review: any) => {
          acc[review._id] = review.replies; // Assuming each review object has a 'replies' field
          return acc;
        }, {});
        setReplyObject(repliesObject);
        setHasMore(data.hasMore);
      }
    };
    fetchReviews();
  }, [query, productId]);

  const fetchLoadMore = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          r: query,
          productId,
          currentBatch: currentBatch + 1,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setReviewList((prev) => [...prev, ...data.reviews]);
      setCurrentBatch((prevState) => prevState + 1);
      setHasMore(data.hasMore);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[1440px] gap-10 container-1">
      <ProductReviewForm
        userSession={userSession}
        productId={productId}
        setReviewList={setReviewList}
      />
      <div className="flex flex-col gap-5 pt-10 w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <span className="text-dark-1 h6-medium">{totalReviews} Reviews</span>
          <Filter
            filter={reviewFilters}
            title="filter comment"
            filterKey="r"
            hideTitle={true}
            type="single"
            otherClasses="text-dark-1"
            containerClasses="w-full max-w-[250px] flex-col gap-2 justify-center items-center"
          />
        </div>
        {reviewList.map((review) => (
          <ProductReviewCard
            _id={review._id}
            reviewUser={review.user}
            rating={review.rating}
            comment={review.comment}
            likes={review.likes}
            replies={replyObject[review._id]}
            createdAt={review.createdAt}
            hasMoreReply={review.hasMoreReply}
            setReplyObject={setReplyObject}
            userSession={userSession}
            query={query}
          />
        ))}
        {hasMore && (
          <LoadMore
            hasMore={true}
            handleLoadMore={() => fetchLoadMore()}
            otherClasses="pt-10"
          />
        )}
      </div>
    </div>
  );
};

export default ProductReviewList;
