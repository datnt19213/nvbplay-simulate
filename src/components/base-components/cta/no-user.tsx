import {Icon} from "@/components/common-components";
import React, {FC, HTMLAttributes} from "react";

type NoUserProps = HTMLAttributes<HTMLDivElement>;

const NoUser: FC<NoUserProps> = ({...props}) => {
  return (
    <div
      {...props}
      className="flex items-center justify-center bg-gray-primary rounded-full h-10 w-10 aspect-square cursor-pointer"
    >
      <Icon icon="ph:user-fill" fontSize={24} fill="#515158" />
    </div>
  );
};

export default NoUser;
