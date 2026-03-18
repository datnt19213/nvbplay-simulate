import React, {FC, ReactNode} from "react";

type SecurityItemProps = {
  title: string;
  icon: ReactNode;
  description: string;
  end?: ReactNode;
};
export const SecurityItem: FC<SecurityItemProps> = ({
  description,
  icon,
  title,
  end,
}) => {
  return (
    <div className="flex gap-3 items-center py-3">
      {icon && icon}
      <div className="flex flex-col w-full">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-xs text-gray-sixth">{description}</span>
      </div>
      {end && end}
    </div>
  );
};
