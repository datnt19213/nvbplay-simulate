import ProductCard from "@/components/base-components/cards/product-card2";
import { COMMON_DATA } from "@/configs";
import Heading from "./atom/heading";

const RecommendProducts = () => {
  return (
    <div className="md:p-[24px] space-y-[24px]">
      <Heading title="Có thể bạn sẽ thích" />
      <div className="grid grid-cols-2 sm:grid-cols-3 desktop:grid-cols-5 gap-[12.5px]">
        {COMMON_DATA.product.slice(0, 5).map((item, index) => (
          <ProductCard {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default RecommendProducts;
