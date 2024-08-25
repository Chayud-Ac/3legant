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

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[1440px] gap-10 container-1">
      <ProductReviewList totalReviews={totalReviews} productId={productId} />
      <ProductReviewForm userSession={userSession} productId={productId} />
    </div>
  );
};

export default ReviewProduct;
