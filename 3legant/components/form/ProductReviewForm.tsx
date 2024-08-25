"use client";
import { useState } from "react";
import { RatingInput } from "../shared/RatingInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { reviewProduct } from "@/lib/actions/review.action";
import { Review } from "../list/ProductReviewList";

interface ProductReviewFormProps {
  userSession: any;
  productId: string;
  setReviewList: React.Dispatch<React.SetStateAction<Review[]>>;
}

// รีวิว ไม่ต้อง ใช้ z form validation ก็ได้บางคนอาจไม่ได้คอมเม้น แค่ rating อย่างเดียว

const ProductReviewForm = ({
  userSession,
  productId,
  setReviewList,
}: ProductReviewFormProps) => {
  const pathname = usePathname();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const userId = userSession.user.id;

  const handleRatingChange = (newRating: number) => {
    if (!userSession) {
      console.log("Please login");
    }
    console.log("New Rating Selected:", newRating);
    setRating(newRating);
  };

  const handleSubmitReview = async () => {
    if (!userSession) {
      console.log("Please login");
    }
    // add toast and loading later
    const newReview = await reviewProduct({
      productId,
      userId,
      reviewData: {
        rating,
        comment,
      },
      path: pathname.toString(),
    });

    newReview.parseNewReview["user"] = userSession.user;

    console.log(newReview);

    setReviewList((prev) => [...prev, newReview.parseNewReview]);
    setRating(5);
    setComment("");
  };

  return (
    <div className="flex flex-col gap-5 justify-start w-full">
      <p className="h6-medium text-dark-1">Write your review</p>
      <div className="flex flex-row gap-2">
        <RatingInput
          rating={rating}
          onRatingChange={handleRatingChange}
          totalStars={5}
          size={15}
          className="h-1"
          disabled={false}
        />
        <span className="medium-sm text-dark-1 text-center mt-[-2px]">
          ( {rating} )
        </span>
      </div>
      <div className="grid w-full gap-3 mt-3">
        <Textarea
          value={comment}
          placeholder="Type your message here."
          className="pb-10"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={() => handleSubmitReview()} className="btn-primary">
          Write Review
        </Button>
      </div>
    </div>
  );
};

export default ProductReviewForm;
