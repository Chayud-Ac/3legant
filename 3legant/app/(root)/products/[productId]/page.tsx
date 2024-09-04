import DisplayProduct from "@/components/display/DisplayProduct";
import ReviewProduct from "@/components/display/ReviewProduct";
import NewArrivalProductsList from "@/components/list/NewArrivalProductsList";

interface SingleProduct {
  discount?: {
    discountedPrice: number;
    discountPercentage: number;
    endDate: string;
  };
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  colorStock: {
    [color: string]: number;
  };
  totalStock: number;
  category: string;
  images: {
    [color: string]: string[]; // Index signature for dynamic keys in images
  };
  avgRating: number;
  totalReviews?: number;
  newArrival: boolean;
}

async function getProduct(productId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("cannot fetch the product");
    }
  } catch (error) {
    throw error;
  }
}

const Page = async ({ params }: { params: { productId: string } }) => {
  const data = await getProduct(params.productId);
  // combine the data into single object
  const product: SingleProduct = {
    ...data.product,
    newArrival: data.newArrival,
    totalReviews: data.totalReviews,
  };

  // images key เก็บ ค่าเป็น object ที่ประกอบไปด้วย color keys ซึ่งค่า value ของแต่ละ key ก็จะเก็บ เป็น image.svg array
  // เราจะ ทำการ pass ตัว array ของ image ตาม ค่า key ที่ user เลือก ไปเป็น Props ของ <ProductCarousel> ให้มัน map ค่าสีนั้นๆ ออกมา

  return (
    <section className="flex flex-col justify-center items-center pb-8 pt-8">
      <DisplayProduct
        discount={product.discount}
        _id={product._id}
        name={product.name}
        slug={product.slug}
        description={product.description}
        price={product.price}
        colorStock={product.colorStock}
        totalStock={product.totalStock}
        category={product.category}
        images={product.images}
        avgRating={product.avgRating}
        totalReviews={product.totalReviews}
        newArrival={product.newArrival}
      />

      <NewArrivalProductsList />

      <ReviewProduct
        productId={params.productId}
        totalReviews={product.totalReviews}
      />
    </section>
  );
};

export default Page;
