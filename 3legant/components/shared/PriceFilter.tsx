import React from "react";

interface PriceFilterProps {
  filter: {
    range: string;
    minValue: number;
    maxValue: number;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const PriceFilter = ({
  filter,
  otherClasses,
  containerClasses,
}: PriceFilterProps) => {
  return <div>PriceFilter</div>;
};

export default PriceFilter;
