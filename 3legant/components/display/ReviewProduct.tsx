import ProductReviewCard from "../cards/ProductReviewCard";
import ProductReviewForm from "../form/ProductReviewForm";
import ProductReviewList from "../list/ProductReviewList";
import LoadMore from "../shared/LoadMore";

const ReviewProduct = () => {
  // !!TODO สร้าง list productReviewList ในนั้น จะมี ProductReviewCard , LoadMore
  // !!TODO ReviewProduct จะเป็น server component และ ใช้ getServerSession เพื่อ เอา image , displayName มา แล้วส่ง เป็น Props ไปที่ productReviewList
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[1440px] container-1 pt-10">
      <ProductReviewForm />
      <ProductReviewList />
    </div>
  );
};

export default ReviewProduct;
