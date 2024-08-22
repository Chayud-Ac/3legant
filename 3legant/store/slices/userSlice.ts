import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";

interface UserProps {
  userId: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  image?: string;
}

// เก็บค่าตั้งต้นหลังจาก ที่ server verify เสร็จและ ส่ง Props ต่างๆตามที่กำหนด
// ให้มันเป็น global state เพราะ เราอยาก access state พวกนี้หลาย หน้า Eg. review session , navbar , account และเผือมี page อื่นๆเพิ่มเติมใน อนาคต

const initialState: UserProps = {
  userId: "",
  firstName: "",
  lastName: "",
  displayName: "",
  email: "",
  image: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // เผือสร้าง action ทีหลัง น่าจะใช้ กับ การ update user ถ้า user มีการทำการ update account เราจะ call action update
    setUser(state, action: PayloadAction<UserProps>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
