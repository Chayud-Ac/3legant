"use client";

import React from "react";
import Filter from "../shared/Filter";
import { CategoryFilters } from "@/constant/filter";
import { priceFilters } from "@/constant/filter";
import { useState } from "react";
import SortDisplay from "../shared/SortDisplay";
import ProductCard from "../cards/ProductCard";
import Image from "next/image";
import FilterCatDesktop from "../shared/FilterCatDesktop";
import FilterPriceDesktop from "../shared/FilterPriceDesktop";
import { priceOptionRange } from "@/constant/filter";
import MultipleFilter from "../shared/MultipleFilter";

const DisplayTemplate = () => {
  const [sort, setSort] = useState("grid-cols-1");
  const [titleMain, setTitleMain] = useState("All Rooms");
  console.log(sort);

  return (
    <section className="flex flex-row w-full max-w-[1440px] container-1 gap-10 pt-10 pb-10 ">
      <div
        className={`${sort !== "grid-cols-3" && "hidden"} flex flex-col gap-8 w-[400px] max-lg:hidden`}
      >
        <div className="flex flex-row gap-1 items-center justify-start">
          <Image
            src="/assets/icons/filter.svg"
            alt="filter"
            width={24}
            height={24}
            className="w-auto h-auto"
          />
          <p className="medium-base text-dark-1">Filter</p>
        </div>
        <FilterCatDesktop
          title="CATEGORIES"
          filter={CategoryFilters}
          setTitleMain={setTitleMain}
        />
        <FilterPriceDesktop title="PRICES" filter={priceFilters} />
      </div>

      <div className="flex flex-col w-full relative ">
        <div className="flex flex-col sm:flex-row justify-between w-full">
          <div className="flex flex-col sm:flex-row gap-5 w-full max-w-[548px]">
            {sort === "grid-cols-3" ? (
              <h1 className="medium-base text-dark-1">{titleMain}</h1>
            ) : (
              <>
                {" "}
                <Filter
                  title="CATEGORIES"
                  filter={CategoryFilters}
                  otherClasses="text-dark-1 medium-sm w-full"
                  containerClasses="w-full flex-col gap-3"
                  type="single"
                  filterKey="cat"
                  setTitleMain={setTitleMain}
                  titleMain={titleMain}
                />
                <MultipleFilter
                  title="PRICES"
                  filter={priceFilters}
                  otherClasses="text-dark-1 medium-sm w-full"
                  containerClasses="w-full flex-col gap-3"
                  optionMap={priceOptionRange}
                />
              </>
            )}
          </div>
          <SortDisplay sort={sort} setSort={setSort} />
        </div>
        {/*--------------------------------------------------------------------------Display grid for Desktop---------------------------------------------------------------------------------------------- */}
        <div
          className={`grid ${sort} w-full h-full gap-2 pt-10 max-sm:hidden place-items-center`}
        >
          <ProductCard
            id="1"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
            describtion={
              sort === "grid-cols-2" || sort === "grid-cols-1"
                ? "Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base."
                : undefined
            }
          />
          <ProductCard
            id="1"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
            describtion={
              sort === "grid-cols-2" || sort === "grid-cols-1"
                ? "Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base."
                : undefined
            }
          />
          <ProductCard
            id="1"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
            describtion={
              sort === "grid-cols-2" || sort === "grid-cols-1"
                ? "Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base."
                : undefined
            }
          />
          <ProductCard
            id="1"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
            describtion={
              sort === "grid-cols-2" || sort === "grid-cols-1"
                ? "Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base."
                : undefined
            }
          />
        </div>
        {/*--------------------------------------------------------------------------Display grid for moblie---------------------------------------------------------------------------------------------- */}
        <div
          className={`grid ${sort} w-full h-full gap-2 pt-10 place-items-center sm:hidden`}
        >
          <ProductCard
            id="1"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
            describtion={
              sort === "grid-cols-1"
                ? "Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base."
                : undefined
            }
          />
          <ProductCard
            id="1"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
            describtion={
              sort === "grid-cols-1"
                ? "Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base."
                : undefined
            }
          />
          <ProductCard
            id="1"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
            describtion={
              sort === "grid-cols-1"
                ? "Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base."
                : undefined
            }
          />
          <ProductCard
            id="1"
            name="Loveseat Sofa"
            price={199}
            rating={5}
            discount={50}
            imgUrl="/assets/images/thumnail_test.svg"
            describtion={
              sort === "grid-cols-1"
                ? "Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base."
                : undefined
            }
          />
        </div>
      </div>
    </section>
  );
};

export default DisplayTemplate;

{
  /* <div className="flex flex-row gap-2 relative pt-10 pb-10">
<div
  className={`${sort !== "grid-cols-3" && "hidden"} flex flex-col gap-8 w-[400px]`}
>
  <div className="flex flex-row gap-1 items-center justify-start">
    <Image
      src="/assets/icons/filter.svg"
      alt="filter"
      width={24}
      height={24}
      className="w-auto h-auto"
    />
    <p className="medium-base text-dark-1">Filter</p>
  </div>
  <FilterDesktop title="CATEGORIES" filter={CategoryFilters} />
</div>
</div> */
}
