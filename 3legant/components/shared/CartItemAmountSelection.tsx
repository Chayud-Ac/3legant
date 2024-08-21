import { incrementItemQuantity } from "@/store/slices/cartSlice";
import { decrementItemQuantity } from "@/store/slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import Image from "next/image";

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

  console.log(cart.items);

  const dispatch = useDispatch();

  const handleDecrementAmount = () => {
    dispatch(
      decrementItemQuantity({
        productId: productId,
        color: color,
      })
    );
  };

  const handleIncrementAmount = () => {
    dispatch(
      incrementItemQuantity({
        productId: productId,
        color: color,
      })
    );
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
