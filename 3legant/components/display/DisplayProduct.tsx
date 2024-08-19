"use client";
import Image from "next/image";
import ProductCarousel from "../carousel/ProductCarousel";
import RatingsStars from "../shared/RatingsStars";
const OfferExpired = dynamic(() => import("@/components/shared/OfferExpired"), {
  ssr: false,
});
import { useState } from "react";
import dynamic from "next/dynamic";
import AddtoWishListButton from "../shared/AddtoWishListButton";
import AddtoCartButton from "../shared/AddtoCartButton";
import ProductAmountSelection from "../shared/ProductAmountSelection";
import ReviewProduct from "./ReviewProduct";

interface SingleProduct {
  discount?: {
    discountedPrice: number;
    discountPercentage: number;
    endDate: string;
  };
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  colorStock: {
    [color: string]: number;
  };
  totalStock: number;
  category: string;
  images: {
    [color: string]: string[]; // Index signature for dynamic keys in images
  };
  avgRating: number;
  totalReviews?: number;
  newArrival: boolean;
}

const DisplayProduct = ({
  discount,
  _id,
  name,
  slug,
  description,
  price,
  colorStock,
  totalStock,
  category,
  images,
  avgRating,
  totalReviews,
  newArrival,
}: SingleProduct) => {
  const colorKey: string[] = Object.keys(images);

  const [currentColor, setCurrentColor] = useState(colorKey[0]);
  const [currentImageArray, setCurrentImagesArray] = useState(
    images[colorKey[0]]
  );

  const handleImageColorChange = (colorKey: string) => {
    setCurrentColor(colorKey);
    setCurrentImagesArray(images[colorKey]);
  };

  return (
    <div className="flex flex-col justify-center items-start w-full gap-4 max-w-[1440px] container-1 sm:flex-row sm:gap-16">
      {/* carouseal image */}

      <ProductCarousel
        slug={slug}
        imagesArray={currentImageArray}
        discount={discount}
        category={category}
        newArrival={newArrival}
      />

      {/* product info image */}
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 items-center justify-start">
            <RatingsStars rating={avgRating} />
            <p className="regular-xs text-dark-1">{totalReviews} Reviews</p>
          </div>
          <h1 className="h5-medium">{name}</h1>
          <p className="regular-base text-grey-1">{description}</p>
          <div className="flex flex-row gap-3 items-center">
            {discount ? (
              <>
                {/* price after discount */}
                <h2 className="medium-xl">${discount.discountedPrice}</h2>
                <h2 className="regular-lg line-through text-grey-1">
                  ${price}
                </h2>
              </>
            ) : (
              <h2 className="medium-xl">${price}</h2>
            )}
          </div>
          <span className="w-full bg-grey-2 h-[1px] mt-2"></span>
        </div>

        {discount && <OfferExpired endDate={discount.endDate} />}
        {/* color selection */}
        <div className="flex flex-col relative gap-10">
          <div className="flex flex-row items-center gap-2">
            <p className="medium-sm text-grey-2">Choose Color</p>
            <Image
              src="/assets/icons/direction-right.svg"
              alt="direction-right"
              width={24}
              height={24}
              className="w-auto h-auto"
            />
          </div>

          <div className="flex flex-row gap-2">
            {Object.keys(images).map((colorKey, index) => (
              <div
                className="w-[72px] h-[72px] relative"
                key={index}
                onClick={() => handleImageColorChange(colorKey)}
              >
                <p
                  className={`medium-base text-dark-2 absolute transform -top-8 items-center -translate-x-1/2 left-1/2 ${currentColor !== colorKey && "hidden"} `}
                >
                  {colorKey.toUpperCase()}
                </p>
                <Image
                  src={`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${category}/${slug}/${images[colorKey][0]}`}
                  alt={colorKey}
                  width={167}
                  height={167}
                  // className="w-auto h-auto object-cover aspect-square rounded-lg "
                  className={`${currentColor === colorKey && "border-dark-1 border-2"} w-auto h-auto object-cover aspect-square rounded-lg  hover:border-dark-1 hover:border-2 transition`}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 items-center">
            <div className="flex flex-row w-full gap-4 items-center justify-center">
              <ProductAmountSelection otherClasses="pt-[9px] pb-[9px] pl-6 pr-6" />
              <AddtoWishListButton otherClasses="w-full border-[2px] border-dark-1 medium-base transition duration-300 hover:bg-grey-4 hover:shadow-md" />
            </div>
            <AddtoCartButton otherClasses="w-full" />
            <span className="w-full bg-grey-2 h-[1px] mt-4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProduct;
