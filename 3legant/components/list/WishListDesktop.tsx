import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import RemoveFromWishList from "../shared/RemoveFromWishList";
import Link from "next/link";
const WishListDesktop = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist);
  console.log(wishlist.items);
  return (
    <table className="table-fixed w-full max-w-[900px] max-sm:hidden">
      <thead className="border-b border-grey-2">
        <tr className="medium-base text-dark-1 ">
          <th className="text-start py-5 w-[350px]">Product</th>
          <th className="text-center py-5">Price</th>
          <th className="text-center py-5">Action</th>
        </tr>
      </thead>
      <tbody>
        {wishlist.items.map((item, index) => (
          <React.Fragment key={index}>
            <tr className="border-b border-grey-2 ">
              <td>
                <div className="flex flex-row items-center gap-2 py-4">
                  <Image
                    src={item.imgUrl}
                    alt={item.name}
                    width={150}
                    height={169}
                    className="w-auto h-auto max-w-[200px] max-h-[219px] rounded-md"
                  />
                  <Link
                    href={`products/${item.product}`}
                    className="text-dark-1 medium-base cursor-pointer px-3 py-1 rounded-xl hover:bg-dark-2 hover:text-light-2 duration-500 transition"
                  >
                    {item.name}
                  </Link>
                </div>
              </td>
              <td className="text-center text-dark-1 medium-base">
                <span>${item.price}</span>
              </td>
              <td className="text-center ">
                <RemoveFromWishList product={item.product} />
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default WishListDesktop;
