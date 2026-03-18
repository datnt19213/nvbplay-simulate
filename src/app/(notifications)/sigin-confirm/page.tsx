"use client";
import Countdown from "@/components/base-components/countdown";
import {NotiSuccessPrimary} from "@/components/base-components/notifications";
import {RootState} from "@/stores";
import {stop} from "@/stores/count-down";
import {useRouter} from "next/navigation";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

const SignInConfirm = () => {
  const router = useRouter();
  const {} = useSelector((state: RootState) => state.countdown);
  const dispatch = useDispatch();
  return (
    <NotiSuccessPrimary
      buttonTitle={`The next page in ${(<Countdown initialTime={6} onComplete={() => null} />)}s`}
      title={"Đăng nhập thành công"}
      subTitle={"Bắt đầu mua sắm và nhận ưu đãi ngay nhé!"}
      handleOnClick={() => null}
    />
  );
};

export default SignInConfirm;
