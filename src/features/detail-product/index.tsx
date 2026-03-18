import BannerContainer from "./components/banner-container";
import DescriptionContainer from "./components/description/description-container";
import MainContainer from "./components/main-container";
// import RecommendProducts from "./components/recommend-products";
// import ReviewsContainer from "./components/reviews/reviews-container";

const DetailProduct = () => {
  return (
    <main>
      <div className="container md:py-10 py-[16px] md:px-0 px-[16px]">
        <div className="rounded-lg px-4 py-3 bg-white">
          <MainContainer />
        </div>
        <div className="my-4">
          <DescriptionContainer />
        </div>
        {/* <div className="rounded-lg px-4 py-3 bg-white">
          <ReviewsContainer />
        </div>
        <div className="rounded-lg px-4 py-3 bg-white my-4">
          <RecommendProducts />
        </div> */}
        <BannerContainer />
      </div>
    </main>
  );
};

export default DetailProduct;
