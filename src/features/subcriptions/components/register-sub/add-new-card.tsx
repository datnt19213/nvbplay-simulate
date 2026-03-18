import Image from "next/image";
import React from "react";

export const AddNewCard = () => {
  return (
    <div className="border border-dashed border-neutral-700 p-3 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          src="/images/subcription/add-new-card.svg"
          alt="add-new-card"
          width={20}
          height={20}
        />
        <span className="text-neutral-800 text-sm font-semibold">
          Thêm thẻ mới
        </span>
      </div>
    </div>
  );
};
