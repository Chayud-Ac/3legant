"use client";
import React, { useEffect, useState } from "react";
import OrderListDesktop from "./OrderListDesktop";
import OrderListMobile from "./OrderListMobile";

interface OrderListProfile {
  userId: string;
}

const OrderListProfile = ({ userId }: OrderListProfile) => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${userId}?q=order`
        );
        if (response.ok) {
          const { data } = await response.json();
          console.log(data);
          setOrders(data);
        }
      } catch (error) {
        throw error;
      }
    };

    fetchOrder();
  }, [userId]);

  console.log(orders);

  return (
    <div className="flex flex-col gap-3 w-full max-w-[900px] ">
      <h1 className="text-dark-1 medium-xl">Orders History</h1>
      {orders && (
        <>
          <OrderListDesktop orders={orders} />
          <OrderListMobile orders={orders} />
        </>
      )}
    </div>
  );
};

export default OrderListProfile;
