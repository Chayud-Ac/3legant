import React, { useRef, useEffect } from "react";
import ProductCard from "../cards/ProductCard";
import TextLinkButton from "../shared/TextLinkButton";

const ProductHorizontal = () => {
  // !!TODO this product will take in title prop to use that to query which products to display in Product horizontal component
  // !!TODO Eg . New Arrival , You may also like , etc ...
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        const scrollSpeed = 5; // Increase this value to make scrolling faster
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * scrollSpeed,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  return (
    <div className="flex flex-col p-8 lg:p-10">
      <div className="flex flex-row container-1 w-full justify-between items-center  max-w-[1360px]">
        <h4 className="h4-medium text-dark-1">New Arrival</h4>
        <TextLinkButton
          href="/products"
          title="More Products"
          otherClasses="w-[120px]"
        />
      </div>
      <div className="w-full md:max-w-[1360px] m-auto pl-[32px] lg:pl-[120px] pt-10">
        <div
          id="slider"
          ref={sliderRef}
          className="flex-row flex gap-2 w-full overflow-x-scroll whitespace-nowrap custom-scrollbar scroll-smooth pb-10"
        >
          <ProductCard
            id="1"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
          />
          <ProductCard
            id="2"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
          />
          <ProductCard
            id="3"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
          />
          <ProductCard
            id="4"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
          />
          <ProductCard
            id="4"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
          />
          <ProductCard
            id="4"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
          />
          <ProductCard
            id="4"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
          />
          <ProductCard
            id="4"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
          />

          {/* Add more ProductCards as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductHorizontal;
