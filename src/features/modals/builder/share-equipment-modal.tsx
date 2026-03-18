"use client";
import {Batminton} from "@/assets/images";
import Image from "@/components/base-components/images/image";
import Modal from "@/components/base-components/modal";
import {Icon} from "@/components/common-components";
import {Button} from "@/components/ui/button";
import {COMMON_DATA, STYLES} from "@/configs";
import {useCopyToClipboard, useWindowSize} from "@/hooks";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setShareEquipmentModal} from "@/stores/builder-slice";
import {translate} from "@/utilities/translator";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";
import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "lucide-react";
import {toastNVB} from "@/components/base-components/toast";
import {useRouter} from "next/navigation";

export const ShareEquipmentModal = () => {
  const [width, height] = useWindowSize();
  const {shareEquipmentModal} = useSelector(
    (state: RootState) => state.builder
  );
  const dispatch = useDispatch();
  const {copyToClipboard, isCopied} = useCopyToClipboard();

  function handleCloseModal(): void {
    dispatch(setShareEquipmentModal(false));
  }

  function handleCopyLink(): void {
    copyToClipboard("https://www.youtube.com");
    isCopied && toastNVB({type: "success", msg: "Link copied"});
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-1">
          {translate("share_equipment")}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icon icon="tabler:info-circle" fontSize={20} xlinkTitle="" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Share the equipment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      }
      titleClass="text-left font-semibold text-txtprimary"
      verticalPos={width < 1200 ? "bottom" : "center"}
      wrapperClass={cn("z-[52] desktop:h-dvh desktop:top-0")}
      headerModalClass="border-b"
      footerModalClass="border-t"
      size={width < 1200 ? "full" : "max-w-[400px]"}
      onClose={() => handleCloseModal()}
      open={shareEquipmentModal}
      cancelButton={false}
      submitButton={
        <div className="flex w-full justify-between px-2">
          <Button
            disabled
            className={cn(
              STYLES.disableFocusVisible,
              "h-10 px-3 text-black/15 bg-black/5"
            )}
          >
            {translate("release")}
          </Button>
          <Button
            className={cn(
              STYLES.disableFocusVisible,
              "h-10 px-3 bg-white rounded-lg border border-gray-border text-txtprimary hover:bg-white"
            )}
            onClick={() => handleCopyLink()}
          >
            <Link size={24} />
            {translate("copy_the_link")}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 py-4 px-2 pt-3 w-full">
        <ShareProductItem
          data={undefined}
          name={"Summer 2025"}
          price={"1.512.000ð"}
          description={"Summer 2025"}
          image={Batminton.src}
        />
        <ShareSocialMedia itemSharedUrl="https://www.youtube.com/" />
      </div>
    </Modal>
  );
};

type ShareProductItemProps = {
  data: any;
  name: string;
  price: number | string;
  description: string;
  image: string;
};
export const ShareProductItem: FC<ShareProductItemProps> = ({
  data,
  description,
  image,
  name,
  price,
}) => {
  const router = useRouter();
  function handleNavigateToEquipment(slug: string): void {
    router.push(`/products/${slug}`);
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-eighth p-4">
      <img
        src={Batminton.src || image}
        alt="p-img"
        className="w-auto h-auto max-h-[168px] object-contain"
      />
      <div className="flex w-full justify-between items-end">
        <div className="flex flex-col gap-1">
          <span
            className="font-semibold text-sm text-txtprimary hover:text-txtthird transition-colors select-none cursor-pointer"
            onClick={() => handleNavigateToEquipment("123")}
          >
            {name}
          </span>
          <span className="text-sm fontmedium text-txtsecondary">
            {description}
          </span>
        </div>
        <span className=" font-bold text-txtthird text-end leading-6">
          {price}
        </span>
      </div>
    </div>
  );
};

type ShareSocialMediaProps = {
  itemSharedUrl: string;
};
export const ShareSocialMedia: FC<ShareSocialMediaProps> = ({
  itemSharedUrl = "",
}) => {
  function handleNavigateToShare(url: string): void {
    window.open(`${url + itemSharedUrl}`, "_blank");
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold text-sm text-txtprimary">
        {translate("social_network")}
      </span>
      <div className="flex items-center gap-3">
        {COMMON_DATA.share_url.map((shareUrl) => (
          <img
            src={shareUrl.img}
            alt="logo-m-share"
            className="aspect-square cursor-pointer"
            onClick={() => handleNavigateToShare(`${shareUrl.url}`)}
          />
        ))}
      </div>
    </div>
  );
};
