import DealBanner from "./deal/deal-banner";
import { DealProduct } from "./deal/deal-product";
import TagBanner from "./deal/tag-banner";

export const Deal = () => {
  return (
    <div>
      <TagBanner />
      <DealBanner />
      <div className="p-0 desktop:p-2 bg">
        <DealProduct />
      </div>
    </div>
  );
};
