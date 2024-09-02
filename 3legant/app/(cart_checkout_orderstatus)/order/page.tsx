"use client";
import { Spinner } from "@/components/shared/Spinner";
import { updateOrderStatus } from "@/lib/actions/order.action";
import { formatDate } from "@/lib/utils";
import { RootState } from "@/store/store";
import { SearchParamsProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Cart {
  cartItems: {
    product: {
      _id: string;
      slug: string;
      category: string;
    };
    color: string;
  }[];
  totalCartAmount: number;
}

interface Order {
  _id: string;
  cart: Cart;
  paymentMethod: string;
  status: string;
  dateOrdered: string;
}

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!orderId) {
      router.push("/checkout");
    } else {
      const updateOrderDocument = async () => {
        const result = await updateOrderStatus({
          orderId: orderId,
        });

        console.log(result?.data);
        setOrder(result?.data);
      };
      updateOrderDocument();
      setLoading(false);
    }
  }, [orderId]);

  if (orderId && !loading && order) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-[1440px] py-10 ">
        <div className="flex flex-col items-center justify-center gap-10 bg-light-2 px-[36px] py-[60px]  md:px-[76px]  md:py-[80px] shadow-lg max-w-[738px] max-h-[730px] w-full">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="bold-2xl text-grey-2 md:h6-medium text-center">
              Thank you! 🎉
            </span>
            <h1 className="bold-xl text-dark-2 text-center md:h6-medium">
              Your order has been received
            </h1>
          </div>
          <div className="flex flex-row justify-center items-center gap-3">
            {order.cart.cartItems.map((item, index) => (
              <Image
                src={`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${item.product.category}/${item.product.slug}/${item.color}.svg`}
                alt="test"
                width={80}
                height={96}
                className="max-w-[80px] max-h-[96] rounded-md w-auto h-auto"
                key={index}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 items-center justify-center ">
            <div className="flex flex-row gap-20 w-full  ">
              <span className="medium-sm text-grey-2">Order code:</span>
              <span className="medium-sm text-dark-2">#{order._id}</span>
            </div>
            <div className="flex flex-row justify-between w-full  ">
              <span className="medium-sm text-grey-2">Date:</span>
              <span className="medium-sm text-dark-2">
                {formatDate(order.dateOrdered)}
              </span>
            </div>
            <div className="flex flex-row justify-between w-full  ">
              <span className="medium-sm text-grey-2">Total:</span>
              <span className="medium-sm text-dark-2">
                ${order.cart.totalCartAmount}
              </span>
            </div>
            <div className="flex flex-row justify-between w-full  ">
              <span className="medium-sm text-grey-2">Payment method:</span>
              <span className="medium-sm text-dark-2">
                {order.paymentMethod}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <Link
              href={`/profile/${user.id}?q=account`}
              className="flex btn-primary rounded-full max-w-[200px] items-center justify-center py-3 px-6 regular-xs text-light-2"
            >
              Purchase history
            </Link>
            <Link
              href="/"
              className="flex bg-grey-3 rounded-full max-w-[200px] items-center justify-center py-1 px-3 regular-xs text-light-1 regular-xs  transition-all duration-300  hover:shadow-sm"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-[1440px] py-10 h-[400px] ">
        <Spinner size="large" className="text-grey-4" />
      </div>
    );
  }
};

export default page;
