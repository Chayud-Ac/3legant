"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface OrderContextType {
  orderId: string | null;
  setOrderId: (id: string | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderId, setOrderIdState] = useState<string | null>(null);

  // เก็บ orderId ไว้ local storage
  useEffect(() => {
    const storedOrderId = localStorage.getItem("orderId");
    if (storedOrderId) {
      setOrderIdState(storedOrderId);
    }
  }, []);

  const setOrderId = (id: string | null) => {
    setOrderIdState(id);
    if (id) {
      localStorage.setItem("orderId", id);
    } else {
      localStorage.removeItem("orderId");
    }
  };

  return (
    <OrderContext.Provider value={{ orderId, setOrderId }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

export default OrderProvider;
