import { formatDate } from "@/lib/utils";
import React from "react";

interface OrderListDesktopProps {
  orders: {
    _id: string;
    cart: { totalCartAmount: number };
    status: string;
    dateOrdered: string;
  }[];
}

const OrderListDesktop = ({ orders }: OrderListDesktopProps) => {
  return (
    <table className="table-fixed w-full max-w-[900px] max-md:hidden">
      <thead className="border-b border-grey-2">
        <tr className=" text-grey-1 ">
          <th className="text-start py-5">Order ID</th>
          <th className="text-center py-5">Dates</th>
          <th className="text-center py-5">Status</th>
          <th className="text-center py-5">Price</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <React.Fragment key={order._id}>
            <tr className="border-b border-grey-2 py-8">
              <td>
                <span>#{order._id}</span>
              </td>
              <td className="text-center text-dark-1  py-8">
                <span>{formatDate(order.dateOrdered)}</span>
              </td>
              <td className="text-center py-8 ">
                <span>{order.status}</span>
              </td>
              <td className="text-center py-8">
                <span>{order.cart.totalCartAmount}</span>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default OrderListDesktop;
