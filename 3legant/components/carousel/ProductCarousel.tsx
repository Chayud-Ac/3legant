"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { RxDotFilled } from "react-icons/rx";

interface ProductCarouselProps {
  slug: string;
  imagesArray: string[];
  discount?: {
    discountedPrice: number;
    discountPercentage: number;
    endDate: string;
  };
  category: string;
  newArrival: boolean;
}

const ProductCarousel = ({
  slug,
  imagesArray,
  category,
  newArrival,
  discount,
}: ProductCarouselProps) => {
  // Convert the images object into an array of image URLs for easier handling

  const imagesUrlArray = imagesArray.map(
    (image) =>
      `${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${category}/${slug}/${image}`
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) {
      return;
    }
    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 5) {
      nextSlide();
    } else if (direction < -5) {
      prevSlide();
    }
    setTouchPosition(null);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? imagesUrlArray.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === imagesUrlArray.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col gap-6 w-full sm:max-w-[548px]">
      <div
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{
          backgroundImage: `url(${imagesUrlArray[currentIndex]})`,
        }}
        className="h-[414px] sm:h-[729px] rounded-sm bg-center bg-cover duration-300 relative group"
      >
        <div className="absolute top-5 left-5 flex flex-col gap-2">
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
        <div
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full cursor-pointer opacity-70 hover:opacity-100 duration-300 hidden group-hover:md:block"
        >
          <Image
            src="/assets/icons/arrow-left.svg"
            alt="arrow-left"
            width={24}
            height={24}
          />
        </div>
        <div
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full cursor-pointer opacity-70 hover:opacity-100 duration-300 hidden group-hover:md:block"
        >
          <Image
            src="/assets/icons/arrow-right.svg"
            alt="arrow-right"
            width={24}
            height={24}
          />
        </div>
        <div className="absolute left-1/2 bottom-3 -translate-x-1/2 flex space-x-2">
          {imagesUrlArray.map((_, index) => (
            <RxDotFilled
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer ${currentIndex === index ? "text-grey-2" : "text-light-1"}`}
              size={20}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-6 justify-start items-center max-sm:hidden">
        {imagesUrlArray.map((item, index) => (
          <div
            className="w-[167px] h-[167px]"
            key={index}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={item}
              alt={item}
              width={167}
              height={167}
              // className="w-auto h-auto object-cover aspect-square rounded-lg "
              className={`${currentIndex === index && "border-dark-1 border-2"} w-auto h-auto object-cover aspect-square rounded-lg  hover:border-dark-1 hover:border-2 transition`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
