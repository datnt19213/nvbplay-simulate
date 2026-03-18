import Bounded from "@/components/base-components/containers/bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import {FadeUpMotionLayout} from "@/layouts/component-layouts";

interface FormFeatureType {
  slice: Content.FormsSliceDefault;
}
const FormFeature = ({ slice }: FormFeatureType) => {
  return (
    // <FadeUpMotionLayout>
    <div className={cn("relative w-full h-[780px] desktop:h-[720px] p-4")}>
      <PrismicNextImage
        className="w-full h-full object-right-top desktop:object-cover absolute inset-0 z-[0]"
        field={slice.primary.background_image}
        alt=""
      />
      <div className="flex h-full w-full items-end desktop:items-center">
        <Bounded className="flex flex-col items-start justify-start">
          <form className="rounded-lg p-4 desktop:p-8 bg-white z-10 w-full desktop:w-[438px] h-[521px] desktop:h-[512px] flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-semibold">{slice.primary.title}</h3>
              <p className="text-sm text-muted-foreground">
                {slice.primary.short_description}
              </p>
            </div>
            <div className="flex flex-col gap-8 relative">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="size-8 rounded-full bg-[#074183] text-white text-sm flex items-center justify-center">
                    1
                  </span>
                  <p className="text-sm">Lựa chọn nhu cầu của bạn</p>
                </div>
                <div className="pl-11 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-semibold">Bộ môn</Label>
                    <Select>
                      <SelectTrigger className="bg-[#F5F5FA] rounded border-none text-sm">
                        <SelectValue placeholder="Chọn bộ môn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Cầu lông</SelectItem>
                        <SelectItem value="banana">Bóng đá</SelectItem>
                        <SelectItem value="blueberry">Bóng rổ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-sm font-semibold">
                      Trình độ của bạn
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-[#F5F5FA] rounded border-none text-sm">
                        <SelectValue placeholder="Chọn trình độ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Người mới</SelectItem>
                        <SelectItem value="banana">Nghiệp dư</SelectItem>
                        <SelectItem value="blueberry">Chuyên nghiệp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="size-8 rounded-full bg-[#074183] text-white text-sm flex items-center justify-center">
                    1
                  </span>
                  <p className="text-sm">Lựa chọn nhu cầu của bạn</p>
                </div>
                <div className="pl-11">
                  <Button className="rounded-lg w-full">
                    Xây dựng trang bị
                  </Button>
                </div>
              </div>
              <div className="absolute left-4 top-10 border-r border-dashed border-[#074183] h-[178px]" />
            </div>
          </form>
        </Bounded>
      </div>
    </div>
    // </FadeUpMotionLayout>
  );
};

export default FormFeature;
