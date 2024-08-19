import Image from "next/image";
import React from "react";
import RatingsStars from "../shared/RatingsStars";
import AddtoCartButton from "../shared/AddtoCartButton";
import Link from "next/link";
import AddtoWishListButton from "../shared/AddtoWishListButton";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  discount?: {
    discountedPrice: number;
    discountPercentage: number;
    endDate?: string;
  };
  description?: string;
  imgUrl: string;
  otherClasses?: string;
  newArrival?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  rating,
  discount,
  description,
  imgUrl,
  newArrival,
  otherClasses,
}: ProductCardProps) => {
  // ProductCard has two different styles one is with description and another is without the describtion
  // So we check base on the describtion if the describtion is pass to this component or not
  console.log(discount);
  if (description) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row items-center hover:shadow-lg transition-shadow hover:rounded-xl">
        {/* image container*/}

        <div className="relative group max-w-[272px] max-h-[349px] sm:min-w-[200px] lg:max-w-[462px] lg:max-h-[500px]">
          <Link href={`/products/${id}`}>
            <Image
              src={imgUrl}
              alt="thumbnail"
              width={262}
              height={349}
              className="w-auto h-auto rounded-lg "
            />
          </Link>

          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {newArrival && (
              <div className="flex items-center justify-center w-[67px] h-[24px] bg-light-2 rounded-md">
                <p className="font-bold bold-sm text-dark-1">NEW</p>
              </div>
            )}
            {discount && (
              <div className="flex items-center justify-center w-[67px] h-[24px] bg-accent-green rounded-md">
                <p className="font-bold bold-sm text-light-1">
                  -{discount.discountPercentage}%
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:p-6 max-w-[262px] sm:max-w-[500px]">
          <div className="flex flex-col justify-start gap-1">
            <RatingsStars rating={rating} />
            <div className="flex flex-row justify-between items-center">
              <Link href={`products/${id}`}>
                <h1 className="medium-sm text-dark-1 pt-4 hover:underline">
                  {name}
                </h1>
              </Link>
              <AddtoWishListButton otherClasses="sm:hidden mb-[-15px]" />
            </div>
            <div className="flex flex-row gap-3 pt-2">
              {discount ? (
                <>
                  {/* price after discount */}
                  <h2 className="medium-sm">${discount.discountedPrice}</h2>
                  <h2 className="regular-sm line-through text-grey-1">
                    ${price}
                  </h2>
                </>
              ) : (
                <h2 className="medium-sm">${price}</h2>
              )}
            </div>
            <p className="regular-xs md:regular-sm sm:pt-4">{description}</p>
            <div className="flex flex-row justify-center pt-5">
              <AddtoWishListButton otherClasses="medium-sm max-sm:hidden w-fit" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2 max-w-[262px] hover:shadow-lg transition-shadow hover:rounded-xl">
        {/* image container*/}
        <div
          className={`relative group max-w-[262px] max-h-[349px] ${otherClasses} `}
        >
          <Link href={`/products/${id}`}>
            <Image
              src={imgUrl}
              alt="thumbnail"
              width={262}
              height={349}
              className="w-auto h-auto rounded-lg"
            />
          </Link>

          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {newArrival && (
              <div className="flex items-center justify-center w-[67px] h-[24px] bg-light-2 rounded-md">
                <p className="font-bold bold-sm text-dark-1">NEW</p>
              </div>
            )}
            {discount && (
              <div className="flex items-center justify-center w-[67px] h-[24px] bg-accent-green rounded-md">
                <p className="font-bold bold-sm text-light-1">
                  -{discount.discountPercentage}%
                </p>
              </div>
            )}
          </div>
          {/* <AddtoCartButton otherClasses="absolute left-1/2 transform -translate-x-1/2 bottom-4  w-4/5  xl:hidden group-hover:block " /> */}
        </div>
        <div className="flex flex-col justify-start gap-1 w-full">
          <RatingsStars rating={rating} />
          <Link href={`products/${id}`}>
            <h1 className="medium-sm text-dark-1 hover:underline">{name}</h1>
          </Link>
          <div className="flex flex-row gap-3">
            {discount ? (
              <>
                {/* price after discount */}
                <h2 className="medium-sm">${discount.discountedPrice}</h2>
                <h2 className="regular-sm line-through text-grey-1">
                  ${price}
                </h2>
              </>
            ) : (
              <h2 className="medium-sm">${price}</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ProductCard;
