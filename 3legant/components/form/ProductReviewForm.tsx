"use client";
import { useState } from "react";
import { RatingInput } from "../shared/RatingInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { reviewProduct } from "@/lib/actions/review.action";
import { Review } from "../list/ProductReviewList";
import { Spinner } from "../shared/Spinner";
import { useToast } from "../ui/use-toast";

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
  const [submitLoading, setSubmitLoading] = useState(false);
  const { toast } = useToast();

  const handleRatingChange = (newRating: number) => {
    if (!userSession) {
      toast({
        title: "Please login",
      });
    }
    toast({
      title: `new Rating Select ${newRating} `,
    });
    setRating(newRating);
  };

  const handleSubmitReview = async () => {
    if (!userSession) {
      toast({
        title: "Please login before review",
      });
      return null;
    }
    setSubmitLoading(true);
    const userId = userSession.user.id;
    try {
      const result = await reviewProduct({
        productId,
        userId,
        reviewData: {
          rating,
          comment,
        },
        path: pathname.toString(),
      });

      if (result.success) {
        result.parseNewReview["user"] = userSession.user;
        setReviewList((prev) => [...prev, result.parseNewReview]);
        setRating(5);
        setComment("");
        setSubmitLoading(false);
      }
    } catch (error) {
      throw error;
    }
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
        <Button
          onClick={() => handleSubmitReview()}
          className="btn-primary text-light-2 medium-base w-full py-2 rounded-md disabled:opacity-50 disabled:animate-pulse transition-opacity duration-1000"
          disabled={submitLoading}
        >
          {!submitLoading ? "Write Review" : <Spinner size="small" />}
        </Button>
      </div>
    </div>
  );
};

export default ProductReviewForm;
