"use client";

import React, { useRef } from "react";
import Filter from "../shared/Filter";
import { RoomsFilters } from "@/constant/filter";
import { priceFilters } from "@/constant/filter";
import { useState } from "react";
import SortDisplay from "../shared/SortDisplay";
import ProductCard from "../cards/ProductCard";
import Image from "next/image";
import FilterRoomDesktop from "../shared/FilterRoomDesktop";
import FilterPriceDesktop from "../shared/FilterPriceDesktop";
import { priceOptionRange } from "@/constant/filter";
import MultipleFilter from "../shared/MultipleFilter";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LoadMore from "../shared/LoadMore";
import { Spinner } from "../shared/Spinner";
import { response } from "express";

interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  discount?: {
    discountedPrice: number;
    discountPercentage: number;
    endDate?: string;
  };
  category: string;
  description?: string;
  newArrival?: boolean;
}

const DisplayTemplate = () => {
  const sortRef = useRef("grid-cols-1");
  const [sort, setSort] = useState(sortRef.current);

  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [titleMain, setTitleMain] = useState("All Rooms");
  const [mainLoading, setMainLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    // set debounce กัน การ update ตัว filter รัวๆ เราจะ เซ็ท delay ให้ มัน รอ url นิ่ง ก่อน 0.3 วิ
    // ถ้ามีการ เปลี่ยนแปลงภายใน 0.3 วิ มันจะยังไม่ fetch (clearTimeout)
    const handler = setTimeout(() => {
      setMainLoading(true);

      const fetchProducts = async () => {
        const queryParams = new URLSearchParams();

        const room = searchParams.get("room");
        const maxPrice = searchParams.get("maxPrice");
        const minPrice = searchParams.get("minPrice");

        if (room) queryParams.append("room", room);
        if (maxPrice) queryParams.append("maxPrice", maxPrice);
        if (minPrice) queryParams.append("minPrice", minPrice);

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?${queryParams.toString()}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setProducts(data.products);
            setCursor(data.nextCursor);
            setHasMore(data.hasMore);
            setMainLoading(false);
          } else {
            console.error("Failed to fetch products", response);
          }
        } catch (error) {
          throw error;
        }
      };

      setCursor(null);
      fetchProducts();
    }, 500); // Debounce delay

    return () => {
      clearTimeout(handler); // มีการเปลี่ยนแปลง ของ query ภายใน 0.3 วิ มันจะ clearTimeout
    };
  }, [searchParams.toString(), titleMain]);

  const handleLoadMore = async () => {
    setLoadMoreLoading(true);

    const queryParams = new URLSearchParams();
    const room = searchParams.get("room");
    const maxPrice = searchParams.get("maxPrice");
    const minPrice = searchParams.get("minPrice");

    if (room) queryParams.append("room", room);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (cursor) queryParams.append("cursor", cursor);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
      setLoadMoreLoading(false);
    } else {
      console.error("Failed to fetch products");
      setLoadMoreLoading(false);
    }
  };

  return (
    <section className="flex flex-row w-full max-w-[1440px] container-1 gap-10 pt-10 pb-10 min-h-screen ">
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
        <FilterRoomDesktop
          title="ROOMS"
          filter={RoomsFilters}
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
                  title="Rooms"
                  filter={RoomsFilters}
                  otherClasses="text-dark-1 medium-sm w-full"
                  containerClasses="w-full flex-col gap-3"
                  type="single"
                  filterKey="room"
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

        {mainLoading ? (
          <div className="flex items-center justify-center w-full h-[200px]">
            <Spinner size="large" className="text-grey-3" />
          </div>
        ) : (
          <>
            {/*--------------------------------------------------------------------------Display grid for Desktop---------------------------------------------------------------------------------------------- */}
            <div
              className={`grid ${sort} w-full h-full  gap-8 pt-10 max-sm:hidden  ${sort === "grid-cols-1" ? "place-items-center" : "place-items-start"}  `}
            >
              {products.map((product: any) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  discount={product.discount}
                  description={
                    sort === "grid-cols-2" || sort === "grid-cols-1"
                      ? product.description
                      : undefined
                  }
                  imgUrl={`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${product.category}/${product.slug}/${product.thumbnail}`}
                  newArrival={product.newArrival}
                />
              ))}
            </div>
            {/*--------------------------------------------------------------------------Display grid for moblie---------------------------------------------------------------------------------------------- */}
            <div
              className={`grid ${sort} w-full h-full  gap-4 pt-10 place-items-center sm:hidden`}
            >
              {products.map((product: any) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  discount={product.discount}
                  description={
                    sort === "grid-cols-1" ? product.description : undefined
                  }
                  imgUrl={`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${product.category}/${product.slug}/${product.thumbnail}`}
                  newArrival={product.newArrival}
                />
              ))}
            </div>
          </>
        )}

        {!mainLoading && !loadMoreLoading && (
          <LoadMore
            otherClasses="pt-10"
            hasMore={hasMore}
            handleLoadMore={handleLoadMore}
          />
        )}

        {loadMoreLoading && (
          <div className="flex items-center justify-center w-full h-[200px]">
            <Spinner size="medium" className="text-grey-3" />
          </div>
        )}
      </div>
    </section>
  );
};

// room: searchParams.get("room"),
//         maxPrice: maxPriceInt,
//         minPrice: minPriceInt,

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
