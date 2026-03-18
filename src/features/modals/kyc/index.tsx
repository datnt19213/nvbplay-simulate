import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import {OtpInput} from "@/components/base-components/input";
import Modal from "@/components/base-components/modal";
import {NotiSuccessPrimary} from "@/components/base-components/notifications";
import {toastNVB} from "@/components/base-components/toast";
import {useWindowSize} from "@/hooks";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setKycModalAuthorized} from "@/stores/kyc-slice";
import {translate} from "@/utilities/translator";
import React from "react";
import {useSelector, useDispatch} from "react-redux";

export const KycAuthorizedModal = () => {
  const {kycModalAuthorized} = useSelector((state: RootState) => state.kyc);
  const dispatch = useDispatch();
  const [width, height] = useWindowSize();
  return (
    <Modal
      verticalPos={width < 1200 ? "bottom" : "center"}
      wrapperClass={cn("z-[51]")}
      size={width < 1200 ? "full" : "max-w-[480px]"}
      open={kycModalAuthorized}
      cancelButton={false}
      xIcon={false}
    >
      <div className="min-h-[348px] flex flex-col justify-center items-center w-full">
        <NotiSuccessPrimary
          title={translate("kyc_authorized")}
          subTitle={translate("please_continue_to_experience_nvb_play")}
        />
        <ButtonSubmitPrimary
          onClickHandle={() => dispatch(setKycModalAuthorized(false))}
        >
          {translate("back_to_settings")}
        </ButtonSubmitPrimary>
      </div>
    </Modal>
  );
};
