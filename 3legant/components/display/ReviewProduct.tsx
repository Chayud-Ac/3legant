"use client";
import ProductReviewCard from "../cards/ProductReviewCard";
import ProductReviewForm from "../form/ProductReviewForm";
import LoadMore from "../shared/LoadMore";

const ReviewProduct = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[1440px] container-1 pt-10">
      <ProductReviewForm />
      <ProductReviewCard />
      <ProductReviewCard />
      <ProductReviewCard />
      <ProductReviewCard />
      <LoadMore hasMore={true} handleLoadMore={() => {}} otherClasses="pt-10" />
    </div>
  );
};

export default ReviewProduct;
