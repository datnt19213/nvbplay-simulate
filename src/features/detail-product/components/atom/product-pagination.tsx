import { cn } from "@/lib/utils";
import { Icon } from "@iconify-icon/react";

const ProductPagination = () => {
  const baseClassname =
    " size-[32px] flex justify-center rounded-full text-gray-icon text-sm font-[600] items-center";

  return (
    <div className="flex justify-end">
      <div className="flex gap-[8px]">
        <button className={baseClassname}>
          <Icon
            className="text-gray-icon"
            icon="material-symbols:chevron-left"
            width="20"
            height="20"
          />
        </button>
        {Array.from({ length: 3 }).map((_, index) => (
          <button
            key={index}
            className={cn(
              baseClassname,
              index === 0 && "bg-[#ff3f1a] text-white"
            )}
          >
            {index + 1}
          </button>
        ))}
        <button className={baseClassname}>
          <Icon
            className="text-gray-icon"
            icon="material-symbols:chevron-right"
            width="20"
            height="20"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductPagination;
