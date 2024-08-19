import { configureStore } from "@reduxjs/toolkit";

// เก็บค่า State ใน store
// ใน reducer object เรา จะเก็บค่า reducer function ต่างๆ เช่น cartReducer , wishListReducer
// ตัว reducer ก็จะรับค่า current state และ type ของ action เพื่อ เปลี่ยนแปลง และ return ค่า state ใหม่

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
