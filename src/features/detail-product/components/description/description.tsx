import { cn } from "@/lib/utils";
import Heading from "../atom/heading";

interface IProps {
  className?: string;
  description: string;
  showMoreDescription: boolean;
  setShowMoreDescription: (value: boolean) => void;
}

const Description: React.FC<IProps> = ({
  className,
  description,
  showMoreDescription,
  setShowMoreDescription,
}) => {
  const sanitizeDescription = (description: string) => {
    if (!description) return "";

    // Loại bỏ các ký tự \r và \n, thay bằng thẻ <br />
    return description
      .replace(/\\r\\n|\\n|\\r|\\t/g, "")
      .replace(
        /\[caption.*?align.*?\](<img.*?>)(.*?)\[\/caption\]/g,
        "<figure>$1<figcaption class='text-center'>$2</figcaption></figure>"
      ) // Chuyển [caption] thành <figure>
      .replace(/\\/g, ""); // Loại bỏ dấu backslash dư thừa; // Thay \r\n, \n, \r bằng <br />
  };

  return (
    <div
      className={cn(
        "w-full md:min-w-[684px] h-[500px] overflow-hidden min-w-full relative md:max-w-[684px] max-w-full md:p-[24px] py-[24px] text-[#38383d] space-y-[16px]",
        className,
        showMoreDescription && "h-full"
      )}
    >
      <Heading title="Mô tả sản phẩm" />
      <p
        className={cn(
          "w-full min-w-full prose lg:prose-lg",
          showMoreDescription && "pb-8"
        )}
        dangerouslySetInnerHTML={{
          __html: sanitizeDescription(description),
        }}
      />

      <div
        className={cn(
          "absolute bottom-0 left-0 flex flex-col justify-end w-full",
          !showMoreDescription
            ? "bg-gradient-to-t from-white via-white to-transparent h-[188px]"
            : "bg-gradient-to-t from-white via-white to-transparent h-[80px]"
        )}
      >
        <div className={"flex justify-center"}>
          <button
            className={cn(
              "py-[8px] px-[16px] text-[#ff3f1a] font-[600] mx-auto"
            )}
            onClick={() => setShowMoreDescription(!showMoreDescription)}
          >
            {showMoreDescription ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Description;
