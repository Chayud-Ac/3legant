"use client";

import { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import Image from "next/image";
import Link from "next/link";

interface GlobalSearchResultProps {
  isActive: boolean;
  isGlobalSearchActive: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  className?: string;
}

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
  slug: string;
  category: string;
  description?: string;
  newArrival?: boolean;
}

const GlobalSearchResult = ({
  isActive,
  setIsActive,
  isGlobalSearchActive,
  setLoading,
  loading,
  search,
  className,
}: GlobalSearchResultProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(true);

    const handler = setTimeout(() => {
      const fetchProducts = async () => {
        try {
          const queryParams = new URLSearchParams();
          if (search) {
            queryParams.append("searchQuery", search);
          }

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
          } else {
            console.error("Failed to fetch products");
          }
        } catch (error) {
          throw error;
        } finally {
          setLoading(false);
        }
      };

      if (search) {
        fetchProducts();
      } else {
        setProducts([]);
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <div
      className={`absolute top-full ${className} bg-grey-4 transition-all duration-500 rounded-md p-5 ${
        isGlobalSearchActive && isActive
          ? "opacity-100 h-[500px] translate-y-0 z-10"
          : "opacity-0 h-0 translate-y-[-10px]"
      }`}
    >
      {loading ? (
        <div className="flex relative justify-center items-center w-full h-full ">
          <Spinner size="medium" className="text-grey-1" />
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="flex flex-col gap-3 items-start w-full max-h-[450px] overflow-y-auto box-border custom-scrollbar-2">
              {products.map((item, index) => (
                <div
                  className="flex flex-row justify-between items-center w-full bg-grey-5 rounded-md px-2"
                  key={index}
                >
                  <div className="flex flex-row items-center justify-center gap-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${item.category}/${item.slug}/thumbnail.svg`}
                      alt={item.name}
                      width={90}
                      height={110}
                      className="w-auto h-auto max-w-[90px] max-h-[110px]"
                    />
                    <div className="flex flex-col gap-3 items-start">
                      <span className="medium-sm text-dark-2">{item.name}</span>
                      <span className="medium-sm text-dark-2">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${item._id}`}
                    className="btn-primary px-3 py-2 rounded-md medium-xs text-center max-lg:hidden"
                    onClick={() => {
                      setIsActive(false);
                    }}
                  >
                    View Product
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${item._id}`}
                    className="btn-primary px-3 py-2 rounded-md medium-xs text-center lg:hidden"
                    onClick={() => {
                      setIsActive(false);
                    }}
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`flex relative justify-center items-center w-full h-full  ${!(isGlobalSearchActive || isActive) && "hidden"}`}
            >
              <div className="flex flex-col items-center justify-center gap-5">
                <span className="text-dark-1 medium-lg text-center">
                  Can not find the product you're looking for
                </span>
                <Link
                  href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products`}
                  className="btn-primary px-3 py-2 rounded-md medium-xs max-lg:hidden"
                  onClick={() => {
                    setIsActive(false);
                  }}
                >
                  View Product ?
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GlobalSearchResult;
