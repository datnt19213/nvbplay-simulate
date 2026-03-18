import { logo_star } from "@/assets/icons";
import { membership_bg } from "@/assets/images";
import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MembershipFeature = () => {
  return (
    // <FadeUpMotionLayout>
    <div
      className={cn(
        "relative rounded-lg overflow-hidden bg-gradient-to-b from-[#064D9D] to-[#1A92D2] max-h-[618px] h-[618px]"
      )}
    >
      <Image
        src={membership_bg.src}
        className="w-full h-full object-cover absolute inset-0 z-0"
      />
      <div className="z-[10] h-[618px] w-full flex flex-col justify-between gap-12 items-start px-3 desktop:px-14 py-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center p-2 gap-2">
            <div className="py-2 px-4 rounded-full bg-white/15 text-[10px] desktop:text-sm text-white backdrop-blur flex items-center justify-center">
              Đặc quyền VIP
            </div>
            <div className="py-2 px-4 rounded-full bg-white/15 text-[10px] desktop:text-sm text-white backdrop-blur flex items-center justify-center">
              Quà tặng độc quyền
            </div>
            <div className="py-2 px-4 rounded-full bg-white/15 text-[10px] desktop:text-sm text-white backdrop-blur flex items-center justify-center">
              Chính sách hoàn tiền
            </div>
          </div>
          <Image src={logo_star.src} className="hidden desktop:inline-flex" />
        </div>
        <div className="flex flex-col gap-4 w-3/4 desktop:w-full">
          <div className="flex flex-col gap-2 text-white z-10">
            <div className="flex flex-col">
              <h3 className="uppercase text-lg desktop:text-[32px]">
                KHÁM PHÁ ĐẶC QUYỀN
              </h3>
              <h1 className="uppercase text-xl desktop:text-4xl font-bold">
                KHI LÀ HỘI VIÊN NVB PLAY
              </h1>
            </div>
            <p className="text-xs desktop:text-sm">
              Thoải mái mua sắm và nâng hạng, tận hưởng vô vàn đặc quyền hấp
              dẫn!
            </p>
          </div>
          <Button size="lg" className="bg-black text-white w-fit rounded-lg">
            Tham gia ngay
          </Button>
        </div>
      </div>
    </div>
    // </FadeUpMotionLayout>
  );
};

export default MembershipFeature;
