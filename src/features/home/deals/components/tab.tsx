"use client";

import { FadeUpMotionLayout } from "@/layouts/component-layouts";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { setActive } from "@/stores/datas/price-list";
import { useDispatch, useSelector } from "react-redux";

const TabDeal = () => {
  const { priceList, active } = useSelector(
    (state: RootState) => state.price_list
  );
  const dispatch = useDispatch();

  const handleSetActive = (id: string) => {
    dispatch(setActive(id));
  };
  return (
    <div className="px-0 desktop:px-4 flex items-center">
      {priceList && (
        <>
          {priceList.map((item, index) => (
            <FadeUpMotionLayout key={index}>
              <div
                onClick={() => handleSetActive(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center border-b px-2.5 desktop:px-4 py-2 cursor-pointer -mb-1 ",
                  {
                    "border-b-2 border-b-primary bg-gradient-to-b from-[#FF3F1A]/0 to-[#FF3F1A]/20":
                      active === item.id,
                    "border-b-transparent": active !== item.id,
                  }
                )}
              >
                <h6
                  className={cn("text-sm desktop:text-base font-semibold", {
                    "text-primary": active === item.id,
                    "text-gray-600": active !== item.id,
                  })}
                >
                  {item.status === "active" ? "Hôm nay" : "Sắp tới"}
                </h6>
                <p
                  className={cn("text-xs text-[#515158] text-center desktop:text-sm font-medium", {
                    "text-[#515158]": active === item.id,
                    "text-black": active !== item.id,
                  })}
                >
                  {item.status === "active" ? "Đang diễn ra" : "Sắp diễn ra"}
                </p>
              </div>
            </FadeUpMotionLayout>
          ))}
        </>
      )}
    </div>
  );
};

export default TabDeal;
