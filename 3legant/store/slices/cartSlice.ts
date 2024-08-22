import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartProps {
  cartId: string | undefined;
  userId: string | undefined;
  items: {
    product: string;
    color: string;
    quantity: number;
    pricePerUnit: number;
    totalItemsPrice: number;
    category: string;
    slug: string;
    name: string;
  }[];
  coupon: string | null;
  deliveryOption: string | undefined;
  totalCartAmount: number;
}

const initialState: CartProps = {
  cartId: undefined,
  userId: undefined,
  items: [],
  coupon: null,
  deliveryOption: undefined,
  totalCartAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId(state, action: PayloadAction<string>) {
      state.cartId = action.payload;
    }, // setCartId หลังจากที่ได้รับค่า cartId กลับมา จาก response
    // ณ ตอนแรก เรายังไม่มี หลังจาก fetch ไป ที่ product endpoint ครั้งแรก server side logic จะสร้าง document ใหม่มาแล้ว reponse id ของ document นั้น มาให้เราแล้ว เราค่อย set ค่า cartId เป็นค่าที่ response กลับมา (end1)
    // fetch ครั้งถัดไป cartId เป็น params end point updated นั้น จะ ใช้ cartId นี้ ในการ query หา document ของ cartId นี้แล้วทำการ update ... (end2)
    addItem(
      state,
      action: PayloadAction<{
        productId: string;
        color: string;
        quantity: number;
        pricePerUnit: number;
        category: string;
        slug: string;
        name: string;
        totalItemsPrice: number;
      }>
    ) {
      const { productId, color, quantity, pricePerUnit, category, slug, name } =
        action.payload;
      const existingItem = state.items.find(
        (item) => item.product === productId && item.color === color
      );
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalItemsPrice =
          existingItem.quantity * existingItem.pricePerUnit;
      } else {
        state.items.push({
          product: productId,
          color,
          quantity,
          pricePerUnit,
          category,
          slug,
          name,
          totalItemsPrice: quantity * pricePerUnit,
        });
      }
      state.totalCartAmount = state.items.reduce(
        (total, item) => total + item.totalItemsPrice,
        0
      );
    },
    incrementItemQuantity(
      state,
      action: PayloadAction<{ productId: string; color: string }>
    ) {
      const { productId, color } = action.payload;
      const item = state.items.find(
        (item) => item.product === productId && item.color === color
      );
      if (item) {
        item.quantity += 1;
        item.totalItemsPrice = item.quantity * item.pricePerUnit;
      }
      state.totalCartAmount = state.items.reduce(
        (total, item) => total + item.totalItemsPrice,
        0
      );
    },

    decrementItemQuantity(
      state,
      action: PayloadAction<{ productId: string; color: string }>
    ) {
      const { productId, color } = action.payload;
      const item = state.items.find(
        (item) => item.product === productId && item.color === color
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalItemsPrice = item.quantity * item.pricePerUnit;
      }
      state.totalCartAmount = state.items.reduce(
        (total, item) => total + item.totalItemsPrice,
        0
      );
    },

    removeItem(
      state,
      action: PayloadAction<{ productId: string; color: string }>
    ) {
      const { productId, color } = action.payload;
      state.items = state.items.filter(
        (item) => item.product !== productId || item.color !== color
      );
      state.totalCartAmount = state.items.reduce(
        (total, item) => total + item.totalItemsPrice,
        0
      );
    },
    // Additional actions for handling coupon and delivery options can be added here
  },
});

export const {
  setCartId,
  addItem,
  incrementItemQuantity,
  decrementItemQuantity,
  removeItem,
} = cartSlice.actions;
export default cartSlice.reducer;

// implement addToCart
// สร้าง /api/users/[userId]/cart
// สร้าง /api/users/[userId]/wishlist
