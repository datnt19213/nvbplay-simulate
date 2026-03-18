import banner from "@/assets/images/product-banner.jpg";
import { RootState } from "@/stores";
import Image from "next/image";
import { useSelector } from "react-redux";
import Description from "./description";
import DetailInfoContainer from "./detail-info-container";
import { useState } from "react";

const DescriptionContainer: React.FC = () => {
  const data = useSelector((state: RootState) => state.detail_product.data)!;
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  return (
    <div className="flex w-full gap-[16px] flex-col lg:flex-row mt-4">
      <div className="w-full rounded-lg px-4 py-3 bg-white">
        <Description
          description={data?.description || ""}
          className="order-2 md:order-1"
          showMoreDescription={showMoreDescription}
          setShowMoreDescription={setShowMoreDescription}
        />
      </div>

      <div className="w-full h-full order-1 lg:order-2">
        <div className="rounded-lg px-4 py-3 bg-white h-full">
          <DetailInfoContainer />
          <div className="w-full aspect-[2] relative">
            <Image src={banner} alt="banner" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionContainer;
