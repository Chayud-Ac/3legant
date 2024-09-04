import React from "react";
import ProductHorizontal from "./ProductHorizontal";
import { getNewArrivalProducts } from "@/lib/actions/product.action";

const NewArrivalProductsList = async () => {
  const result = await getNewArrivalProducts({});

  const products = JSON.parse(JSON.stringify(result.products));

  return (
    <>
      <ProductHorizontal title="New Arrival" products={products} />
    </>
  );
};

export default NewArrivalProductsList;
