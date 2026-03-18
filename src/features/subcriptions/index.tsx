import Bounded from "@/components/base-components/containers/bounded";
import BannerSection from "./components/banner-section";
import PacksSection from "./components/packs-section";
import PrivilegeSection from "./components/privilege-section";
import DiscountSection from "./components/discount-section";
import DetailSection from "./components/detail-section";
import BackgroundSection from "./components/background-section";
import AskAndQuestionSection from "./components/askandquestion-section";
import { PaymentSuccess } from "./components/register-sub/payment-success";

const SubcriptionFeature = () => {
  return (
    <Bounded className="flex items-start gap-5 relative py-5">
      <div className="flex flex-col w-full max-w-[800px] gap-4">
        <BannerSection />
        <PacksSection isMobile />
        <PrivilegeSection />
        <DiscountSection />
        <DetailSection />
        <BackgroundSection />
        <AskAndQuestionSection />
      </div>
      <div className="flex-shrink !w-[380px] sticky top-0 hidden desktop:block">
        <PacksSection />
      </div>

      {/* Payment Success */}
      <PaymentSuccess />
    </Bounded>
  );
};

export default SubcriptionFeature;
