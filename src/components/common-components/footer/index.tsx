"use client";
import {Button} from "@/components/ui/button";
import React from "react";
import IconCustom from "../icon-custom";
import {useRouter} from "next/navigation";
import {COMMON_DATA} from "@/configs";
import {EcommerceTag, NvbFooter} from "@/assets/images";
import Bounded from "@/components/base-components/containers/bounded";

const Footer = () => {
  const navigation = useRouter();
  const handleSocialClick = (link: string) => {
    navigation.push(link);
  };
  return (
    <div className="w-full bg-black-primary pb-14 desktop:pb-0">
      <Bounded className="flex flex-col px-5 desktop:px-0">
        <div className="w-full h-fit  pt-20 flex flex-col gap-y-14">
          <div className="flex desktop:justify-between desktop:items-end gap-y-16 flex-col desktop:flex-row">
            <div className="max-w-[268px] flex flex-col gap-8">
              <span className="text-[40px] font-semibold text-white leading-[46px]">
                Boost your power scale & grow.
              </span>
              <div className="flex justify-between gap-6">
                {COMMON_DATA.footer.socials.map((data, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="secondary"
                    onClick={() => handleSocialClick(data.url)}
                    className="!p-0 bg-gray-secondary rounded-full h-12 w-12 flex items-center justify-center hover:!bg-gray-secondary"
                  >
                    <IconCustom
                      icon={`${data.icon}`}
                      fontSize={24}
                      className="text-gray-third"
                    />
                  </Button>
                ))}
              </div>
            </div>
            <div className="max-w-[547px] w-full flex flex-col gap-6">
              <div className="flex-nowrap flex items-center gap-2 text-white overflow-hidden">
                <IconCustom
                  icon="ph:dot-outline-fill"
                  fontSize={32}
                  className="text-white leading-none"
                />
                Thông tin khác
              </div>
              <div className="grid desktop:grid-cols-3 grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-gray-secondary desktop:hidden hover:!bg-gray-secondary uppercase !text-[11px] desktop:!text-xs font-[500] text-white rounded-full flex items-center justify-center h-[42px] w-full"
                >
                  Hệ thống cửa hàng
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-gray-secondary desktop:hidden hover:!bg-gray-secondary uppercase !text-[11px] desktop:!text-xs font-[500] text-white rounded-full flex items-center justify-center h-[42px] w-full"
                >
                  Liên hệ hỗ trợ
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-gray-secondary hover:!bg-gray-secondary uppercase !text-[11px] desktop:!text-xs font-[500] text-white rounded-full flex items-center justify-center h-[42px] w-full"
                >
                  Chính sách bảo mật
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-gray-secondary hover:!bg-gray-secondary uppercase !text-[11px] desktop:!text-xs font-[500] px-4 text-white rounded-full flex items-center justify-center h-[42px] w-full"
                >
                  Chính sách thanh toán
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-gray-secondary hover:!bg-gray-secondary uppercase !text-[11px] desktop:!text-xs font-[500] text-white rounded-full flex items-center justify-center h-[42px] w-full"
                >
                  Chính sách đổi trả
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-gray-secondary hover:!bg-gray-secondary uppercase !text-[11px] desktop:!text-xs font-[500] text-white rounded-full hidden desktop:flex items-center justify-center h-[42px] w-full col-span-2 "
                >
                  Chính sách vận chuyển và kiểm tra hàng
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-gray-secondary hover:!bg-gray-secondary uppercase !text-[11px] desktop:!text-xs font-[500] text-white rounded-full flex items-center justify-center h-[42px] w-full"
                >
                  Thoả thuận sử dụng
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-gray-secondary hover:!bg-gray-secondary uppercase !text-[11px] desktop:!text-xs font-[500] text-white rounded-full desktop:hidden flex items-center justify-center h-[42px] w-full col-span-2"
                >
                  Chính sách vận chuyển và kiểm tra hàng
                </Button>
              </div>
            </div>
            <div className="max-w-[257px] w-full max-h-[156px] h-full flex flex-col gap-6">
              <div className="flex-nowrap flex items-center text-white gap-2 overflow-hidden">
                <IconCustom
                  icon="ph:dot-outline-fill"
                  fontSize={32}
                  className="text-white leading-none"
                />
                Về chúng tôi
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white font-medium text-sm flex items-center gap-1">
                  <p className="text-gray-fourth font-medium text-sm">
                    Địa chỉ:
                  </p>
                  62 Lê Bình, Ninh Kiểu, Cần Thơ
                </span>
                <span className="text-white font-medium text-sm flex items-center gap-1">
                  <p className="text-gray-fourth font-medium text-sm">
                    Giờ làm việc:
                  </p>
                  08:00 - 21:00
                </span>
                <span className="text-white font-medium text-sm flex items-center gap-1">
                  <p className="text-gray-fourth font-medium text-sm">
                    Hotline:
                  </p>
                  0987.879.243
                </span>
                <span className="text-white font-medium text-sm flex items-center gap-1">
                  <p className="text-gray-fourth font-medium text-sm">Email:</p>
                  info@nvbplay.vn
                </span>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#dbdbdb]/20 to-transparent w-full" />
          <div className="flex flex-col items-start md:flex-row md:justify-between gap-4 md:gap-8">
            <div className="flex min-h-10 flex-col">
              <span className="font-medium lead-[18px] text-gray-fourth text-xs">
                &copy;2024 NVB PLAY.
              </span>
              <span className="font-medium lead-[18px] text-gray-fourth text-xs">
                Giấy ĐKHKD số 57A8036939 do UBND Q.Ninh Kiều TP. Cần Thơ cấp
                ngày 01 tháng 7 năm 2024
              </span>
            </div>
            <img
              src={EcommerceTag.src}
              alt=""
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
        <img src={NvbFooter.src} className="w-full mx-auto mt-4" alt="" />
      </Bounded>
    </div>
  );
};

export default Footer;
