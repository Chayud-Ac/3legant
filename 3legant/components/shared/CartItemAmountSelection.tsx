import { incrementItemQuantity, removeCoupon } from "@/store/slices/cartSlice";
import { decrementItemQuantity } from "@/store/slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import Image from "next/image";
import {
  decrementItemQuantityAction,
  incrementItemQuantityAction,
} from "@/lib/actions/cartaction.action";
import { Spinner } from "./Spinner";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const handleDecrementAmount = async () => {
    if (quantity === 1) return;
    try {
      setLoading(true);
      const result = await decrementItemQuantityAction({
        cartId: cart.cartId,
        userId: user.id,
        product: productId,
        color: color,
      });

      if (result.success) {
        const { data } = result;
        dispatch(
          decrementItemQuantity({
            productId: productId,
            color: color,
            newTotalCartAmount: data.newTotalCartAmount,
          })
        );
        setLoading(false);

        if (data.removeCoupon) {
          dispatch(removeCoupon({}));
        }
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleIncrementAmount = async () => {
    // increment กับ decrement มีปัญหา
    // ตอนuser addItemtoCart cart doc พึ่งสร้าง ทำให้ cartId ยังไม่มี จนกว่า user จะ รีเฟรช page
    // ต้องใช้ userId ในการ หา cart แทน แล้วเช็ค ตัว isActive เอา
    // ถ้ามี cartId มา ก็ส่ง cartId และ ใช้ cartId query เอา
    try {
      setLoading(true);
      const result = await incrementItemQuantityAction({
        cartId: cart.cartId,
        userId: user.id,
        product: productId,
        color: color,
      });

      if (result.success) {
        const { data } = result;
        dispatch(
          incrementItemQuantity({
            productId: productId,
            color: color,
            newTotalCartAmount: data.newTotalCartAmount,
          })
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  return (
    <div
      className={`flex flex-row gap-3 items-center justify-center rounded-md border border-grey-1 w-fit min-h-fit ${otherClasses}`}
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

      {loading ? (
        <div>
          <Spinner size="small" />
        </div>
      ) : (
        <div>{quantity}</div>
      )}

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
