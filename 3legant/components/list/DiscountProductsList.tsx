import ProductHorizontal from "./ProductHorizontal";
import { getDiscountProducts } from "@/lib/actions/product.action";

interface DiscountProductsListProps {
  percentage: number;
  title: string;
}

const DiscountProductsList = async ({
  percentage,
  title,
}: DiscountProductsListProps) => {
  const result = await getDiscountProducts({ percentage });
  const products = JSON.parse(JSON.stringify(result.products));
  console.log(products);
  return (
    <>
      <ProductHorizontal title={title} products={products} />
    </>
  );
};

export default DiscountProductsList;
