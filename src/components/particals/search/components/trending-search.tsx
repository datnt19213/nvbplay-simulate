import {TrendingSearch} from "@/assets/icons";
import {Icon} from "@/components/common-components";
import {COMMON_DATA} from "@/configs";
import React, {FC} from "react";

const TrendingsSearch = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <div className="text-primary font-semibold flex gap-2 h-6">
          <img
            src={TrendingSearch.src}
            alt="trending-search-ico"
            className="h-6 w-6 aspect-square rounded-md"
          />
          Xu hướng tìm kiếm
        </div>
      </div>
      <div className="flex flex-wrap gap-3 overflow-hidden max-h-24">
        {COMMON_DATA.header.trend_search.map((trend, index) => (
          <TrendingItem key={index} name={trend.name} />
        ))}
      </div>
    </div>
  );
};

export default TrendingsSearch;
type TrendingItemProps = {
  name: string;
};
const TrendingItem: FC<TrendingItemProps> = ({name}) => {
  return (
    <span className="py-1 px-4 rounded-full bg-gray-primary h-10 flex items-center justify-center cursor-pointer w-fit text-sm font-medium">
      {name}
    </span>
  );
};
