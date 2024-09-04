import { getServerSession } from "next-auth";
import ProductReviewList from "../list/ProductReviewList";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface ReviewProductProps {
  productId: string;
  totalReviews?: number;
}

const ReviewProduct = async ({
  productId,
  totalReviews,
}: ReviewProductProps) => {
  let userSession;
  const session = await getServerSession(authOptions);
  if (session) {
    userSession = session;
  }

  return (
    <ProductReviewList
      totalReviews={totalReviews}
      productId={productId}
      userSession={userSession}
    />
  );
};

export default ReviewProduct;
