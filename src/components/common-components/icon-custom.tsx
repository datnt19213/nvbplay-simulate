import React, {FC} from "react";
import {Icon, IconProps} from "@iconify/react";

const IconCustom: FC<IconProps> = ({...props}) => {
  return <Icon {...props} />;
};

export default IconCustom;
