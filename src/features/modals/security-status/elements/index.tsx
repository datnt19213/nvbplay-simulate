import {cn} from "@/lib/utils";
import {Check} from "lucide-react";
import React, {FC} from "react";

type CheckActionProps = {
  active?: boolean;
};
export const CheckAction: FC<CheckActionProps> = ({active = false}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-6 min-w-6 rounded-full",
        active ? "bg-green-primary" : "bg-black/5"
      )}
    >
      <Check
        size={16}
        className={cn(active ? "text-white" : "text-gray-seventh")}
      />
    </div>
  );
};
