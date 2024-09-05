import { formatDate } from "@/lib/utils";
import React from "react";

interface OrderListMobileProps {
  orders: {
    _id: string;
    cart: { totalCartAmount: number };
    status: string;
    dateOrdered: string;
  }[];
}

const OrderListMobile = ({ orders }: OrderListMobileProps) => {
  return (
    <div className="md:hidden pt-5 flex flex-col gap-5 justify-center items-center w-full">
      {orders.map((order, index) => (
        <div className="flex flex-col w-full gap-5" key={index}>
          <div className="flex flex-row justify-between items-center">
            <span className="text-grey-2 regular-sm">Order Id</span>
            <span className="text-dark-2 regular-sm">#{order._id}</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="text-grey-2 regular-sm">Dates</span>
            <span className="text-dark-2 regular-sm">
              {formatDate(order.dateOrdered)}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="text-grey-2 regular-sm">Status</span>
            <span className="text-dark-2 regular-sm">{order.status}</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="text-grey-2 regular-sm">Price</span>
            <span className="text-dark-2 regular-sm">
              {order.cart.totalCartAmount}
            </span>
          </div>
          <span className="bg-grey-3 w-full h-[1px]"></span>
        </div>
      ))}
    </div>
  );
};

export default OrderListMobile;
