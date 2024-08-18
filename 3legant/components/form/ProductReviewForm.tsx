"use client";
import { useState } from "react";
import { RatingInput } from "../shared/RatingInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// TODO add serveraction to create review document when user click review
// TODO check cookie session if user signIn yet if not redirect to the signIn page

const ProductReviewForm = () => {
  const [rating, setRating] = useState(4);

  const handleRatingChange = (newRating: number) => {
    console.log("New Rating Selected:", newRating);
    setRating(newRating);
    // You can also send the new rating to a server here
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
        <Textarea placeholder="Type your message here." className="pb-10" />
        <Button className="btn-primary">Write Review</Button>
      </div>
    </div>
  );
};

export default ProductReviewForm;
