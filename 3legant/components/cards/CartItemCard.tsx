import { RootState } from "@/store/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import CartItemAmountSelection from "../shared/CartItemAmountSelection";
import { removeCoupon, removeItem } from "@/store/slices/cartSlice";
import { removeFromCart } from "@/lib/actions/cartaction.action";

interface CartItemCardProps {
  product: string;
  color: string;
  quantity: number;
  price: number;
  category: string;
  slug: string;
  name: string;
}

const CartItemCard = ({
  product,
  color,
  quantity,
  price,
  category,
  slug,
  name,
}: CartItemCardProps) => {
  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const handleRemoveItem = async () => {
    try {
      if (cart.cartId) {
        const result = await removeFromCart({
          cartId: cart.cartId,
          product: product,
          color: color,
        });

        if (result.success) {
          const { data } = result;
          dispatch(
            removeItem({
              productId: product,
              color: color,
              newTotalCartAmount: data.newTotalCartAmount,
            })
          );

          if (data.removeCoupon) {
            dispatch(removeCoupon({}));
          }
        }
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex flex-row justify-between w-full items-center">
      <div className="flex flex-row gap-2">
        <Image
          src={`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET}/${category}/${slug}/${color}.svg`}
          alt={slug}
          width={80}
          height={96}
          className="max-w-[80px] max-h-[96] rounded-md"
        />
        <div className="flex flex-col gap-3  justify-start">
          <p className="medium-sm text-dark-1">{name}</p>
          <p className="regular-xs text-grey-2">
            Color : {color.toUpperCase()}
          </p>
          <CartItemAmountSelection
            productId={product}
            color={color}
            quantity={quantity}
            otherClasses="p-[6px] mt-1"
          />
        </div>
      </div>
      <div className="flex flex-col items-end gap-[50px]  ">
        <p className="medium-sm text-dark-1">${price}</p>
        <Image
          onClick={() => handleRemoveItem()}
          src="/assets/icons/remove.svg"
          alt="x"
          width={24}
          height={24}
          className="w-auto h-auto hover:bg-grey-3 hover:rounded-md transition duration-200"
        />
      </div>
    </div>
  );
};

export default CartItemCard;
