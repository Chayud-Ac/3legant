import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem {
  product: string;
  imgUrl: string;
  price: number;
  name: string;
}

interface WishlistProps {
  items: WishlistItem[];
}

const initialState: WishlistProps = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<WishlistItem>) {
      const exists = state.items.some(
        (item) => item.product === action.payload.product
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<{ product: string }>) {
      state.items = state.items.filter(
        (item) => item.product !== action.payload.product
      );
    },
  },
});

// Export actions
export const { addItem, removeItem } = wishlistSlice.actions;

// Export reducer
export default wishlistSlice.reducer;
