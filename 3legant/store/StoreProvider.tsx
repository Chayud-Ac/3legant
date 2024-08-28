"use client";
import { ReactNode, useEffect } from "react";
import { RootState, store } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./slices/cartSlice";
import { AppDispatch } from "./store";
import { setUser } from "./slices/userSlice";
import { fetchWishList } from "./slices/wishListSlice";

// create StoreProvider and define it as a client component
// ถ้าเรา follow ตาม document โดยไม่สร้าง Provider แยก มันจะทำให้ application ทั้งหมด กลายเป็น client component เราจะ สูญเสีย SSR ไป

type StoreProviderProps = {
  children: ReactNode;
  session: any; // The session object passed down from AuthProvider
};

// StoreProviderComponent นี้ handle การดึง ข้อมูล cart จาก backend เพื่อเซ็ทค่า initial cart เป็นค่าที่อยู่ใน DB
const StoreProviderComponent = ({ session }: { session: any }) => {
  const dispatch = useDispatch<AppDispatch>();

  if (session) {
    useEffect(() => {
      if (session?.user?.id) {
        dispatch(fetchCart(session.user.id));
        dispatch(fetchWishList(session.user.id));
        dispatch(
          setUser({
            id: session.user.id,
            email: session.user.email,
            displayName: session.user.displayName,
            image: session.user.image,
          })
        );
      }
    }, [dispatch, session]);
  }

  return null;
};

// StoreProvider เป็น Provider หลักของ redux ซึ่งเราจะเอาอันนี้ไปคลุม app main เพื่อให้ component อื่นๆ ดึงค่าจะ redux store ได้
export const StoreProvider = ({ children, session }: StoreProviderProps) => {
  return (
    <Provider store={store}>
      <StoreProviderComponent session={session} />
      {children}
    </Provider>
  );
};
