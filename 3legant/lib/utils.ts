import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
) => {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Discount percentage should be between 0 and 100");
  }

  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;

  return finalPrice.toFixed(0);
};

interface PriceQueryParams {
  params: string;
  queryObject: {
    [key: string]: any;
  };
}

export function formUrlQuery({ params, queryObject }: PriceQueryParams) {
  console.log(queryObject);
  const currentUrl = qs.parse(params);

  for (const key in queryObject) {
    currentUrl[key] = queryObject[key].toString();
  }
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

// this util function will use to check the new arrival product when query the product document with treshold value

export function newArrivalThreshold(daysThreshold: number = 30) {
  const newArrivalThreshold = new Date();
  newArrivalThreshold.setDate(newArrivalThreshold.getDate() - daysThreshold);
  return newArrivalThreshold;
}

// count down timer this util function use to calculate the offer expire in OffereExpire component

export const calculateTimeLeft = (endDate: string) => {
  const difference = +new Date(endDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  // TypeScript needs to be explicitly informed that `now - date` is a number
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 }, // 60 * 60 * 24 * 365
    { label: "month", seconds: 2592000 }, // 60 * 60 * 24 * 30
    { label: "week", seconds: 604800 }, // 60 * 60 * 24 * 7
    { label: "day", seconds: 86400 }, // 60 * 60 * 24
    { label: "hour", seconds: 3600 }, // 60 * 60
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count >= 1) {
      return count === 1
        ? `1 ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }

  return "just now";
}

export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function convertPathToWord(path: string | undefined) {
  // Remove the leading '/' if it exists
  if (!path) {
    return;
  }
  const cleanedPath = path.startsWith("/") ? path.slice(1) : path;

  // Capitalize the first letter and concatenate with the rest of the string
  const formattedPath =
    cleanedPath.charAt(0).toUpperCase() + cleanedPath.slice(1);

  return formattedPath;
}
