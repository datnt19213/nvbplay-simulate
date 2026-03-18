import notFound from "@/assets/images/not-found.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  className?: string;
  title?: string;
  showButton?: boolean;
}

const NotFoundBox: React.FC<IProps> = ({ className, title, showButton }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-[16px] py-10",
        className
      )}
    >
      <Image src={notFound} width={300} height={263} alt="not-found" />
      <p className="text-center text-14-21-600 text-[#38383d] max-w-[95%] md:max-w-full">
        {title ? (
          title
        ) : (
          <>
            Không tìm thấy sản phẩm phù hợp theo yêu cầu của bạn! <br /> Vui
            lòng thử lại nhé!
          </>
        )}
      </p>
      {showButton && (
        <Button asChild>
          <Link href={"/"}>Quay lại trang chủ</Link>
        </Button>
      )}
    </div>
  );
};

export default NotFoundBox;
