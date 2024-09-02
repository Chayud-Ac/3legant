"use client";

import React, { useEffect, useState } from "react";
import ProductReviewCard from "../cards/ProductReviewCard";
import LoadMore from "../shared/LoadMore";
import Filter from "../shared/Filter";
import { reviewFilters } from "@/constant/filter";
import { useSearchParams } from "next/navigation";
import ProductReviewForm from "../form/ProductReviewForm";
import { Spinner } from "../shared/Spinner";

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
  // ProductReviewList ค่อนข้างซับซ้อน
  const searchParams = useSearchParams(); // hook ที่ใช้ ดึง ค่า key ของ query params
  const query = searchParams.get("r"); // ดึง ค่า value key ของ r มา "allReviews" , "newest" , "mostRating"
  const [currentBatch, setCurrentBatch] = useState(1); // batch เหมือน เลข หน้า ว่า เรา อยู่หน้า ไหน ซึงมัน จะเอาไป คำนวน จำนวน reviews comment ที่จะ response กลับมา
  const [reviewList, setReviewList] = useState<Review[]>([]); // เป็น array of object ตาม type ที่เรากำหนดไว้ด้าน บนเอาไป map โชว์ หน้า UI
  // reply object คือ hashmap ที่เก็บค่า key เป็น reviewId และ value ของ key นั้นๆ เป็น array ที่เก็บ replie object
  // เวลามีการ update ตัว replies เราจะ ได้ access โดย โยน reviewId hash key เข้าไปแล้ว push ตัว object reply ใหม่ เข้าไปได้เลย O(1) แต่ถ่า เราไม่สร้าง replyObject เราก็ต้อง iterate ผ่าน reviewList เพื่อหาค่า reviewId นั้นๆที่จะอัปเดท ซึง O(n)
  // setReplyObject ใช้กับ ProductReviewCard component
  const [replyObject, setReplyObject] = useState<ReplyState>({});

  const [hasMore, setHasMore] = useState(true); // pagination ใช้เช็ค ว่า มี review อีกไหม hasMore จะ response มาจากฝั่ง server
  const [mainLoading, setMainLoading] = useState(true);
  const [hasMoreLoading, setHasMoreLoading] = useState(false);

  useEffect(() => {
    setCurrentBatch(1);
    setMainLoading(true);

    const fetchReviews = async () => {
      try {
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
          setReviewList(data.reviews);
          const repliesObject = data.reviews.reduce((acc: any, review: any) => {
            acc[review._id] = review.replies;
            return acc;
          }, {});
          setReplyObject(repliesObject);
          setHasMore(data.hasMore);
          setMainLoading(false);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchReviews();
  }, [query, productId]);

  const fetchLoadMore = async () => {
    try {
      setHasMoreLoading(true);
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
        const newRepliesObject = data.reviews.reduce(
          (acc: any, review: any) => {
            acc[review._id] = review.replies;
            return acc;
          },
          {}
        );

        setReplyObject((prevState) => ({
          ...prevState,
          ...newRepliesObject,
        })); // ถ้า กด load more ก้ add newRepliesObject อันใหม่ ไปที่ prevState ของ replyObject

        setReviewList((prev) => [...prev, ...data.reviews]); // ถ้า กด load more ก้ add reviewList อันใหม่ ไปที่ prevState ของ reviewList
        setCurrentBatch((prevState) => prevState + 1);
        setHasMore(data.hasMore);
        setHasMoreLoading(false);
      } else {
        setHasMoreLoading(false);
      }
    } catch (error) {
      throw error;
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
        {mainLoading ? (
          <div className="flex items-center justify-center w-full h-[200px]">
            <Spinner size="large" className="text-grey-3" />
          </div>
        ) : (
          reviewList.map((review) => {
            console.log(review.hasMoreReply);
            return (
              <ProductReviewCard
                key={review._id}
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
            );
          })
        )}

        {hasMore && !mainLoading && (
          <LoadMore
            hasMore={true}
            handleLoadMore={() => fetchLoadMore()}
            otherClasses="pt-10"
          />
        )}

        {hasMoreLoading && (
          <div className="flex items-center justify-center pt-10">
            <Spinner size="medium" className="text-grey-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviewList;
