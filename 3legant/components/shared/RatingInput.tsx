"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
};

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  onRatingChange?: (rating: number) => void;
  showText?: boolean; // Add showText prop
  disabled?: boolean;
}

export const RatingInput = ({
  rating: initialRating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  onRatingChange,
  disabled = false, // Default to false if disabled prop is not provided
  ...props
}: RatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(initialRating);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      setIsHovering(true);
      const starIndex = parseInt(
        (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
      );
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverRating(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      const starIndex = parseInt(
        (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
      );
      setCurrentRating(starIndex);
      setHoverRating(null);
      if (onRatingChange) {
        onRatingChange(starIndex);
      }
    }
  };

  const displayRating = disabled
    ? initialRating
    : (hoverRating ?? currentRating);

  return (
    <div
      className={cn("flex flex-row w-fit gap-2", {
        "pointer-events-none": disabled,
      })}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="flex items-center gap-1" onMouseEnter={handleMouseEnter}>
        {[...Array(totalStars)].map((_, i) =>
          React.cloneElement(Icon, {
            key: i,
            size,
            className: cn(
              i < displayRating ? "fill-current stroke-1" : "fill-transparent",
              i < displayRating
                ? ratingVariants.default.star
                : ratingVariants.default.emptyStar
            ),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            "data-star-index": i + 1,
          })
        )}
      </div>
    </div>
  );
};
