"use client";
import React, { useState, useRef } from "react";
import { imgHeaderUrls } from "@/constant";
import Image from "next/image";
import { RxDotFilled } from "react-icons/rx";

const HomeHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [touchPosition, setTouchPosition] = useState(null);

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: any) => {
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
    const newIndex = isFirstSlide ? imgHeaderUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === imgHeaderUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mt-[10px] container-1 max-w-[1440px] w-full m-auto relative overflow-x-auto sm:overflow-x-hidden">
      <div
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ backgroundImage: `url(${imgHeaderUrls[currentIndex].url})` }}
        className="h-[304px] sm:h-[536px] rounded-sm bg-center bg-cover duration-300 relative group"
      >
        <div
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full cursor-pointer opacity-70 hover:opacity-100 duration-300  hidden group-hover:md:block"
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
          {imgHeaderUrls.map((item, index) => (
            <RxDotFilled
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer ${currentIndex === index ? "text-grey-2" : "text-light-1"}`}
              size={20}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
