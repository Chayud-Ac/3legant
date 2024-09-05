import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  coupon: {
    code?: string;
    discount?: number;
  };
  deliveryOption: {
    _id?: string;
    name?: string;
    price?: number;
  };
  totalCartAmount: number; //
}

const initialState: CartProps = {
  cartId: undefined,
  userId: undefined,
  items: [],
  coupon: {
    code: undefined,
    discount: undefined,
  },
  deliveryOption: {
    _id: undefined,
    name: undefined,
    price: 0,
  },
  totalCartAmount: 0,
};

interface CouponPayload {
  totalCartAmount?: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartProps>) {
      return action.payload;
    },

    setCartId(state, action: PayloadAction<string>) {
      state.cartId = action.payload;
    }, // setCartId หลังจากที่ได้รับค่า cartId กลับมา จาก response
    // ณ ตอนแรก เรายังไม่มี หลังจาก fetch ไป ที่ product endpoint ครั้งแรก server side logic จะสร้าง document ใหม่มาแล้ว reponse id ของ document นั้น มาให้เราแล้ว เราค่อย set ค่า cartId เป็นค่าที่ response กลับมา (end1)
    // fetch ครั้งถัดไป cartId เป็น params end point updated นั้น จะ ใช้ cartId นี้ ในการ query หา document ของ cartId นี้แล้วทำการ update ... (end2)

    resetCart(state) {
      return initialState;
    },

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
        totalCartAmount: number;
      }>
    ) {
      const {
        productId,
        color,
        quantity,
        pricePerUnit,
        category,
        slug,
        name,
        totalCartAmount,
      } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product === productId && item.color === color
      );
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalItemsPrice = parseFloat(
          (existingItem.quantity * existingItem.pricePerUnit).toFixed(2)
        );
      } else {
        state.items.push({
          product: productId,
          color,
          quantity,
          pricePerUnit,
          category,
          slug,
          name,
          totalItemsPrice: parseFloat((quantity * pricePerUnit).toFixed(2)),
        });
      }
      state.totalCartAmount = totalCartAmount;
    },

    incrementItemQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        color: string;
        newTotalCartAmount: number;
      }>
    ) {
      const { productId, color, newTotalCartAmount } = action.payload;
      const item = state.items.find(
        (item) => item.product === productId && item.color === color
      );
      if (item) {
        item.quantity += 1;
        item.totalItemsPrice = parseFloat(
          (item.quantity * item.pricePerUnit).toFixed(2)
        );
      }

      state.totalCartAmount = newTotalCartAmount;
    },

    decrementItemQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        color: string;
        newTotalCartAmount: number;
      }>
    ) {
      const { productId, color, newTotalCartAmount } = action.payload;
      const item = state.items.find(
        (item) => item.product === productId && item.color === color
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalItemsPrice = parseFloat(
          (item.quantity * item.pricePerUnit).toFixed(2)
        );
      }

      state.totalCartAmount = newTotalCartAmount;
    },

    removeItem(
      state,
      action: PayloadAction<{
        productId: string;
        color: string;
        newTotalCartAmount: number;
      }>
    ) {
      const { productId, color, newTotalCartAmount } = action.payload;
      state.items = state.items.filter(
        (item) => item.product !== productId || item.color !== color
      );

      state.totalCartAmount = newTotalCartAmount;
    },

    applyCoupon(
      state,
      action: PayloadAction<{
        code: string;
        discount: number;
        newTotalCartAmount: number;
      }>
    ) {
      const { code, discount, newTotalCartAmount } = action.payload;
      state.coupon.code = code;
      state.coupon.discount = discount;
      state.totalCartAmount = newTotalCartAmount;
    },

    removeCoupon(state, action: PayloadAction<CouponPayload>) {
      state.coupon.code = undefined;
      state.coupon.discount = undefined;

      // Optionally update the totalCartAmount if provided
      if (action.payload.totalCartAmount !== undefined) {
        state.totalCartAmount = action.payload.totalCartAmount;
      }
    },

    selectDeliveryOptions(
      state,
      action: PayloadAction<{
        _id: string;
        name: string;
        price: number;
      }>
    ) {
      state.deliveryOption = action.payload;
      const itemsTotalAmount = state.items.reduce(
        (total, item) => total + item.totalItemsPrice,
        0
      );

      state.totalCartAmount = parseFloat(
        (
          itemsTotalAmount -
          (state.coupon?.discount || 0) +
          (state.deliveryOption?.price || 0)
        ).toFixed(2)
      );
    },
  },
});

export const {
  setCart,
  setCartId,
  resetCart,
  addItem,
  incrementItemQuantity,
  decrementItemQuantity,
  removeItem,
  applyCoupon,
  selectDeliveryOptions,
  removeCoupon,
} = cartSlice.actions;
export default cartSlice.reducer;

// implement addToCart
// สร้าง /api/users/[userId]/cart
// สร้าง /api/users/[userId]/wishlist
