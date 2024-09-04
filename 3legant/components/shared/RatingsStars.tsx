import React from "react";
import Image from "next/image";

interface RatingsStarsProps {
  rating: number;
}

const RatingsStars = ({ rating }: RatingsStarsProps) => {
  const totalStars = rating;
  const decimalNumber = totalStars % 1;

  return (
    <div className="flex flex-row ml-[-2px]">
      {Array.from({ length: totalStars }, (_, index) => (
        <Image
          key={index}
          src="/assets/icons/star.svg"
          alt="star"
          width={16}
          height={16}
        />
      ))}
      {decimalNumber >= 0.4 && (
        <Image
          src="/assets/icons/half_star.svg"
          alt="star"
          width={16}
          height={16}
        />
      )}
    </div>
  );
};

export default RatingsStars;
