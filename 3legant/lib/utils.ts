import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
