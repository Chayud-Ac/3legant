"use client";

import React from "react";
import ProductReviewCard from "../cards/ProductReviewCard";
import LoadMore from "../shared/LoadMore";

const ProductReviewList = () => {
  return (
    <div>
      <ProductReviewCard />
      <ProductReviewCard />
      <ProductReviewCard />
      <ProductReviewCard />
      <LoadMore hasMore={true} handleLoadMore={() => {}} otherClasses="pt-10" />
    </div>
  );
};

export default ProductReviewList;
