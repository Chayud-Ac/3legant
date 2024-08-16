import React from "react";
import ProductCard from "../cards/ProductCard";
import TextLinkButton from "../shared/TextLinkButton";

interface ProductHorizontalProps {
  title: string;
  products: {
    discount?: {
      discountedPrice: number;
      discountPercentage: number;
      endDate: Date;
    };
    _id: string;
    name: string;
    slug: string;
    price: number;
    thumbnail: "thumbnail.svg";
    avgRating: 4;
    category: string;
    newArrival: boolean;
  }[];
}

const ProductHorizontal = ({ title, products }: ProductHorizontalProps) => {
  console.log(products);
  if (!products || products.length === 0) {
    return null; // Handle case where products are undefined or empty
  }
  return (
    <div className="flex flex-col p-8 lg:p-10">
      <div className="flex flex-row container-1 w-full justify-between items-center max-w-[1360px]">
        <h4 className="h4-medium text-dark-1">{title}</h4>
        <TextLinkButton
          href="/products"
          title="More Products"
          otherClasses="w-[120px] max-sm:hidden"
        />
      </div>
      <div className="w-screen md:max-w-[1360px] m-auto pl-[32px] lg:pl-[120px] pt-10">
        <div
          id="slider"
          className="flex-row flex gap-2 w-full overflow-x-auto whitespace-nowrap custom-scrollbar scroll-smooth pb-10"
        >
          {products.map((item) => (
            <ProductCard
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              rating={item.avgRating}
              discount={item.discount}
              imgUrl={`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${item.category}/${item.slug}/${item.thumbnail}`}
              newArrival={item.newArrival}
              otherClasses="min-w-[262px]"
            />
          ))}

          {/* Add more ProductCards as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductHorizontal;
