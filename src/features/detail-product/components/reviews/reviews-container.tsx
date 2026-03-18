import Heading from "../atom/heading";
import ReviewForm from "./review-form";
import ReviewsList from "./reviews-list";
import SummaryReview from "./summary-review";

const ReviewsContainer = () => {
  return (
    <div className="md:p-[24px] py-[24px] space-y-[32px]">
      <Heading title="Đánh giá sản phẩm" />
      <SummaryReview />
      <ReviewForm />
      <ReviewsList />
    </div>
  );
};

export default ReviewsContainer;
