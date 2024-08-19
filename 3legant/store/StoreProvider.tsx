"use client";
import { store } from "./store";
import { Provider } from "react-redux";

// create StoreProvider and define it as a client component
// ถ้าเรา follow ตาม document โดยไม่สร้าง Provider แยก มันจะทำให้ application ทั้งหมด กลายเป็น client component เราจะ สูญเสีย SSR ไป

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
