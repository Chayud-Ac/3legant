import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const fetchWishList = createAsyncThunk(
  "wishlist/fetchWishList",
  async (userId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${userId}?q=wishlist`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    const { data } = await response.json();
    return data;
  }
);

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

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchWishList.fulfilled,
        (state, action: PayloadAction<WishlistItem[] | null>) => {
          if (action.payload) {
            state.items = action.payload;
          } else {
            state.items = [];
          }
        }
      )
      .addCase(fetchWishList.rejected, (state, action) => {
        console.error("Failed to fetch WishList:", action.error.message);
        state.items = [];
      });
  },
});

// Export actions
export const { addItem, removeItem } = wishlistSlice.actions;

// Export reducer
export default wishlistSlice.reducer;
