import dot3 from "@/assets/icons/3-dot.svg";
import { Button } from "@/components/ui/button";
import useMediaQueryScreen from "@/hooks/useMediaQueryScreen";
import { cn } from "@/lib/utils";
import Image from "next/image";
import OptionsPopover from "../popovers/options-popover";
import OptionsSheet from "../sheets/options-sheet";

interface IProps {
  className?: string;
  disabled?: boolean;
  canAction?: boolean;
}

const CallToActionPreOrder: React.FC<IProps> = ({
  className,
  disabled,
  canAction = true,
}) => {
  const { isMobile } = useMediaQueryScreen();

  return (
    <div className={cn("flex mt-[20px] gap-[12px] w-full bg-white", className)}>
      <Button
        disabled={disabled}
        className="h-[56px] bg-[#0b74e5] hover:bg-[#0b74e5] flex-1 !px-0 disabled:text-black/15 disabled:bg-white"
      >
        Đặt trước ngay
      </Button>
      {canAction &&
        (isMobile ? (
          <OptionsSheet
            trigger={
              <button className="size-[56px] flex justify-center items-center">
                <Image src={dot3} alt="3-dot" width={21} height={24} />
              </button>
            }
          />
        ) : (
          <OptionsPopover
            trigger={
              <button className="size-[56px] flex justify-center items-center">
                <Image src={dot3} alt="3-dot" width={21} height={24} />
              </button>
            }
          />
        ))}
    </div>
  );
};

export default CallToActionPreOrder;
