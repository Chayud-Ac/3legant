import React from "react";
import { Button } from "../ui/button";

interface AddtoCartButton {
  otherClasses?: string;
}

const AddtoCartButton = ({ otherClasses }: AddtoCartButton) => {
  // !!TODO create cartContext to store all the cart state and function that set the cart state
  // !!TODO destructure those state and function and implement in this component
  return (
    <Button type="submit" className={`${otherClasses} btn-primary`}>
      Add to cart
    </Button>
  );
};

export default AddtoCartButton;
