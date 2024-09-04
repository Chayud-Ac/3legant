"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectDeliveryOptions } from "@/store/slices/cartSlice";
import { selectDeliveryOptionsAction } from "@/lib/actions/cartaction.action";
import { Spinner } from "./Spinner";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "../ui/toast";

interface CartSummaryProps {
  deliveryOptions: {
    _id: string;
    name: string;
    price: string;
  }[];
}

const CartSummary = ({ deliveryOptions }: CartSummaryProps) => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const { toast } = useToast();

  // State to hold the selected delivery option
  const [selectedOption, setSelectedOption] = useState(deliveryOptions[0]);
  const [loading, setLoading] = useState(false);

  // Effect to update selectedOption when cart.deliveryOption is loaded
  useEffect(() => {
    if (
      cart.deliveryOption &&
      cart.deliveryOption._id &&
      cart.deliveryOption.name &&
      typeof cart.deliveryOption.price === "number"
    ) {
      //@ts-ignore
      setSelectedOption(cart.deliveryOption);
    }
  }, [cart.deliveryOption]);

  const handleRadioChange = (option: any) => {
    setSelectedOption(option);
    dispatch(selectDeliveryOptions(option));
  };

  const handleCheckOutDelivery = async () => {
    setLoading(true);
    if (cart.items.length < 1) {
      toast({
        title: "Your cart is empty Can't Proceed to Checkcout",
        variant: "destructive",
        action: (
          <ToastAction altText="Try again">
            <Link href="/products">Views Product</Link>
          </ToastAction>
        ),
      });

      return null;
    }
    try {
      if (cart.cartId && selectedOption._id) {
        const result = await selectDeliveryOptionsAction({
          cartId: cart.cartId,
          deliveryOption: selectedOption._id,
        });

        if (result.success) {
          router.push("/checkout");
        }
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[470px] border border-dark-2 rounded-lg p-6">
      <div className="flex flex-col gap-5 w-full">
        <h2 className="medium-3xl">Cart Summary</h2>
        <RadioGroup value={selectedOption.name}>
          {deliveryOptions.map((option) => (
            <div
              key={option._id}
              className="flex flex-row w-full justify-between items-center border-grey-1 border rounded-lg pl-4 pr-4 pt-3 pb-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.name}
                  id={option._id}
                  onClick={() =>
                    handleRadioChange({
                      _id: option._id,
                      name: option.name,
                      price: option.price,
                    })
                  }
                />
                <Label
                  htmlFor={option._id}
                  className="text-dark-1 regular-base"
                >
                  {option.name}
                </Label>
              </div>
              <span className="text-dark-1 regular-base">${option.price}</span>
            </div>
          ))}
        </RadioGroup>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <span className="regular-sm text-dark-2">Subtotal</span>
            <span className="medium-sm text-dark-2">
              ${cart.totalCartAmount}
            </span>
          </div>
          <span className="w-full h-[1px] bg-grey-1"></span>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/assets/icons/fast_delivery.svg"
                alt="coupon"
                width={24}
                height={24}
                className="w-auto h-auto"
              />
              <span className="regular-sm">Delivery</span>
            </div>
            <span className="medium-sm text-accent-green">
              ${selectedOption.price} ({selectedOption.name})
            </span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="medium-lg text-dark-2">Total</span>
            <span className="medium-base text-dark-2">
              ${cart.totalCartAmount}
            </span>
          </div>
        </div>
      </div>

      <Button
        className="w-full btn-primary text-center"
        disabled={loading}
        onClick={handleCheckOutDelivery}
      >
        {loading ? <Spinner className="sm" /> : "Checkout"}
      </Button>
    </div>
  );
};

export default CartSummary;
