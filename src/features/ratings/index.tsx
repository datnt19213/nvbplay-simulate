import React, {FC} from "react";
import {RatingsItem, ReviewedItem} from "./components";
import ComingSoon from "@/components/base-components/cta/coming-soon";

type RatingListsProps = {
  type: "unprecedented" | "reviewed";
};
const RatingLists: FC<RatingListsProps> = ({type}) => {
  return (
    <>
      {type === "unprecedented" && (
        <div className="flex flex-col gap-3">
          {Array.from({length: 10}).map((_, index) => (
            <RatingsItem
              key={index}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              status={"pending"}
              data={[]}
            />
          ))}
        </div>
      )}
      {type === "reviewed" && (
        <div className="flex flex-col gap-3">
          {Array.from({length: 10}).map((_, index) => (
            <ReviewedItem
              key={index}
              data={undefined}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </>
    // <ComingSoon />
  );
};

export default RatingLists;
