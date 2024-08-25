import { getServerSession } from "next-auth";
import ProductReviewCard from "../cards/ProductReviewCard";
import ProductReviewForm from "../form/ProductReviewForm";
import ProductReviewList from "../list/ProductReviewList";
import LoadMore from "../shared/LoadMore";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface ReviewProductProps {
  productId: string;
  totalReviews?: number;
}

const ReviewProduct = async ({
  productId,
  totalReviews,
}: ReviewProductProps) => {
  // !!TODO สร้าง list productReviewList ในนั้น จะมี ProductReviewCard , LoadMore
  // !!TODO ReviewProduct จะเป็น server component และ ใช้ getServerSession เพื่อ เอา image , displayName มา แล้วส่ง เป็น Props ไปที่ productReviewList

  let userSession;
  const session = await getServerSession(authOptions);
  if (session) {
    userSession = session;
  }

  console.log(userSession);

  console.log(productId);
  return (
    <ProductReviewList
      totalReviews={totalReviews}
      productId={productId}
      userSession={userSession}
    />
  );
};

export default ReviewProduct;
