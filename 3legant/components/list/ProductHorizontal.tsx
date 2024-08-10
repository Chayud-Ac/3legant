import React from "react";
import ProductCard from "../cards/ProductCard";

const ProductHorizontal = () => {
  return (
    <div className="flex flex-row mt-10 gap-2 mx-10">
      <ProductCard
        id="1"
        name="Loveseat Sofa"
        price={199}
        rating={5}
        discount={50}
        imgUrl="/assets/images/thumnail_test.svg"
        describtion="Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base."
      />
      <ProductCard
        id="1"
        name="Loveseat Sofa"
        price={199}
        rating={5}
        discount={50}
        imgUrl="/assets/images/thumnail_test.svg"
        describtion="Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base."
      />
    </div>
  );
};

export default ProductHorizontal;
