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
