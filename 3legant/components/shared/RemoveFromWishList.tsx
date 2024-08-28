"use client";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { RootState } from "@/store/store";
import { removeItem } from "@/store/slices/wishListSlice";
import { removeItemFromWishList } from "@/lib/actions/user.action";

interface RemoveFromWishListProps {
  product: string;
}

const RemoveFromWishList = ({ product }: RemoveFromWishListProps) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const user = useSelector((state: RootState) => state.user);

  const handleRemoveItemFromWishList = async () => {
    try {
      const result = await removeItemFromWishList({
        userId: user.id,
        product: product,
      });

      if (result) {
        dispatch(
          removeItem({
            product: product,
          })
        );
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Button
        className="btn-primary text-light-2 w-full"
        onClick={handleRemoveItemFromWishList}
      >
        Remove
      </Button>
    </>
  );
};

export default RemoveFromWishList;
