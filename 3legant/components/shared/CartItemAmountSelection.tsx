import { incrementItemQuantity } from "@/store/slices/cartSlice";
import { decrementItemQuantity } from "@/store/slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import {
  decrementItemQuantityAction,
  incrementItemQuantityAction,
} from "@/lib/actions/cartaction.action";

interface CartItemAmountSelectionProps {
  productId: string;
  color: string;
  quantity: number;
  otherClasses?: string;
}

const CartItemAmountSelection = ({
  productId,
  color,
  quantity,
  otherClasses,
}: CartItemAmountSelectionProps) => {
  const cart = useSelector((state: RootState) => state.cart);

  console.log(cart);

  const dispatch = useDispatch();

  const handleDecrementAmount = async () => {
    if (quantity === 1) return;
    try {
      dispatch(
        decrementItemQuantity({
          productId: productId,
          color: color,
        })
      );

      if (cart.cartId) {
        await decrementItemQuantityAction({
          cartId: cart.cartId,
          product: productId,
          color: color,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleIncrementAmount = async () => {
    try {
      dispatch(
        incrementItemQuantity({
          productId: productId,
          color: color,
        })
      );

      if (cart.cartId) {
        await incrementItemQuantityAction({
          cartId: cart.cartId,
          product: productId,
          color: color,
        });
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div
      className={`flex flex-row gap-3 items-center justify-center rounded-md border border-grey-1 w-fit ${otherClasses}`}
    >
      <Image
        // add the decrement amount function from redux
        onClick={() => handleDecrementAmount()}
        src="/assets/icons/minus.svg"
        alt="minus"
        width={20}
        height={20}
        className="w-auto h-auto cursor-pointer hover:bg-grey-3 rounded-md transition"
      />
      <div>{quantity}</div>
      <Image
        //add the currentAmount amount function from redux
        onClick={() => handleIncrementAmount()}
        src="/assets/icons/add.svg"
        alt="minus"
        width={20}
        height={20}
        className="w-auto h-auto cursor-pointer hover:bg-grey-3 rounded-md transition"
      />
    </div>
  );
};

export default CartItemAmountSelection;
