import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  discount?: number;
  describtion?: string;
  imgUrl: string;
}

const ProductCard = ({
  id,
  name,
  price,
  rating,
  discount,
  describtion,
  imgUrl,
}: ProductCardProps) => {
  return <div>ProductCard</div>;
};

export default ProductCard;
