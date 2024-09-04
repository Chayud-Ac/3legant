import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import RemoveFromWishList from "../shared/RemoveFromWishList";
import Link from "next/link";

const WishListMobile = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist);

  return (
    <table className="table-fixed w-full max-w-[900px] sm:hidden">
      <thead className="border-b border-grey-2">
        <tr className="medium-base text-dark-1 ">
          <th className="text-center  py-5">Product</th>
        </tr>
      </thead>
      <tbody>
        {wishlist.items.map((item, index) => (
          <React.Fragment key={index}>
            <tr className="border-b border-grey-2  ">
              <td className="flex items-center justify-center py-4 ">
                <div className="flex flex-col gap-5 w-full items-center justify-center">
                  <div className="flex flex-row items-center justify-between w-full max-w-[300px] gap-5">
                    <Image
                      src={item.imgUrl}
                      alt={item.name}
                      width={80}
                      height={96}
                      className="w-auto h-auto max-w-[100px] max-h-[119px] rounded-md"
                    />
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <Link
                        href={`products/${item.product}`}
                        className="text-dark-1 medium-base cursor-pointer px-3 py-1 rounded-xl hover:bg-dark-2 hover:text-light-2 duration-500 transition"
                      >
                        {item.name}
                      </Link>
                      <span>${item.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-center justify-center w-full max-w-[350px]">
                    <Link
                      href={`/products/${item.product}`}
                      className="btn-primary w-full flex items-center justify-center py-2 rounded-md regular-lg"
                    >
                      View Product
                    </Link>
                    <RemoveFromWishList product={item.product} />
                  </div>
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default WishListMobile;
