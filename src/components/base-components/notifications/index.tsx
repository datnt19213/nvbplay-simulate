import {TickSuccess} from "@/assets/icons";
import {AuthFormLayout} from "@/layouts/component-layouts/auth-layout";
import React, {FC} from "react";
import {ButtonSubmitPrimary} from "../buttons";

type NotiSuccessPrimaryProps = {
  title: string;
  subTitle?: string;
  isButton?: boolean;
  buttonTitle?: any;
  handleOnClick?: (data?: any) => void;
};

export const NotiSuccessPrimary: FC<NotiSuccessPrimaryProps> = ({
  buttonTitle,
  handleOnClick,
  isButton,
  subTitle,
  title,
}) => {
  return (
    <AuthFormLayout>
      <div className="flex flex-col items-center justify-center mx-auto max-w-[312px]">
        <img
          src={TickSuccess.src}
          alt=""
          className="size-20 aspect-square mb-5"
        />
        <div className="flex flex-col gap-1 justify-center items-center text-center mb-5">
          <span className="text-txtprimary font-semibold text-2xl leading-9">
            {title}
          </span>
          <span className="text-gray-icon text-sm font-medium">{subTitle}</span>
        </div>
        {isButton && (
          <ButtonSubmitPrimary onClick={() => handleOnClick && handleOnClick()}>
            {buttonTitle}
          </ButtonSubmitPrimary>
        )}
      </div>
    </AuthFormLayout>
  );
};
