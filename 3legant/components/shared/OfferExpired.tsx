"use client";
import { calculateTimeLeft } from "@/lib/utils";
import { useEffect, useState } from "react";

interface OfferExpiredProps {
  endDate: string;
}

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const OfferExpired = ({ endDate }: OfferExpiredProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(endDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex flex-col gap-3">
      <p className="regular-base text-dark-5">Offer expired in:</p>
      <div className="flex flex-row gap-4 items-center justify-start">
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="flex items-center justify-center text-center h5-medium  w-[70px] h-[70px] bg-grey-5 text-dark-1 rounded-md ">
            {timeLeft.days}
          </div>
          <p className="regular-base text-grey-2">Days</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="flex items-center justify-center text-center h5-medium  w-[70px] h-[70px] bg-grey-5 text-dark-1 rounded-md ">
            {timeLeft.hours}
          </div>
          <p className="regular-base text-grey-2">Hours</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="flex items-center justify-center text-center h5-medium  w-[70px] h-[70px] bg-grey-5 text-dark-1 rounded-md ">
            {timeLeft.minutes}
          </div>
          <p className="regular-base text-grey-2">Minutes</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="flex items-center justify-center text-center h5-medium  w-[70px] h-[70px] bg-grey-5 text-dark-1 rounded-md ">
            {timeLeft.seconds}
          </div>
          <p className="regular-base text-grey-2">Seconds</p>
        </div>
      </div>
      <span className="w-full bg-grey-2 h-[1px] mt-2"></span>
    </div>
  );
};

export default OfferExpired;
