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
  size?: "small" | "medium" | "large";
}

const CallToAction4: React.FC<IProps> = ({
  className,
  disabled,
  canAction = true,
  size = "large",
}) => {
  const { isMobile } = useMediaQueryScreen();

  const classNameButton = {
    large: "h-[56px] font-[700] flex-1  !px-0",
    medium: "",
    small: "",
  };

  return (
    <div
      className={cn(
        "flex mt-[20px] gap-[12px] w-full bg-white items-center",
        className
      )}
    >
      <Button
        disabled={disabled}
        variant={"outline"}
        className={cn(
          "font-[600] text-primary hover:text-primary border-primary  disabled:text-black/15 disabled:bg-white",
          classNameButton[size]
        )}
      >
        Thêm vào giỏ hàng
      </Button>
      <Button
        disabled={disabled}
        className={cn(
          " disabled:text-black/15 disabled:bg-white",
          classNameButton[size]
        )}
      >
        Mua ngay
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

export default CallToAction4;
