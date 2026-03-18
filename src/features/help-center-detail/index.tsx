import Bounded from "@/components/base-components/containers/bounded";
import { HelpCenterBanner } from "../help-center/components/banner";
import { Categories } from "../help-center/components/categories";
import { SupportInfo } from "../help-center/components/support-info";
import { Heading } from "./components/heading";
import { Content } from "./components/content";
import { FooterNavigation } from "./components/footer-navigation";
import { SaleBanner } from "../help-center/components/sale-banner";

export const HelpCenterDetail = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="block h-[26.25rem]">
        <HelpCenterBanner />
      </div>
      <div className="block mb-4">
        <Bounded>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <div className="p-4 bg-white rounded-lg">
                <Heading />
              </div>
              <div className="p-4 bg-white rounded-lg mt-4">
                <Content />
              </div>
              <div className="p-4 bg-white rounded-lg mt-4">
                <FooterNavigation />
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 rounded-lg">
              <div className="bg-white px-4 h-fit py-4 rounded-lg ">
                <Categories type="accordion" />
              </div>
              <div className="mt-4">
                <SaleBanner />
              </div>
            </div>
          </div>
        </Bounded>

        <div className="mt-4">
          <SupportInfo />
        </div>
      </div>
    </div>
  );
};
