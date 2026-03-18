"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import Modal from "@/components/base-components/modal";
import {OverlayTransparent} from "@/components/base-components/overlays";
import {Footer} from "@/components/common-components";
import {Search} from "@/components/particals";
import {AddressProfileModal, PasscodeModal} from "@/features/modals";
import AddressDeleteProfileModal from "@/features/modals/addreses/address-remove-profile-modal";
import AddressUpdateProfileModal from "@/features/modals/addreses/address-update-profile-modal";
import {ThemeProvider} from "@/providers";
import {RootState} from "@/stores";
import {setSignOutModal} from "@/stores/profile";
import {GlobalLayoutProps} from "@/types";
import {RemoveACookie} from "@/utilities/cookies";
import {translate} from "@/utilities/translator";
import {redirect, RedirectType, usePathname} from "next/navigation";
import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import BuilderLayout from "./builder-layout";
import {ClearAllData} from "@/utilities/clear";
import SiteHeader from "@/components/common-components/header";
import SearchSiteContainer from "@/components/common-components/header/widgets/search";
import UpdateInfomationModal from "@/features/modals/profile/update-infomation-modal";
import {SecurityStatusModal} from "@/features/modals/security-status/security-status-modal";
import {OtpPinCodeModal} from "@/features/modals/otp-pin-code/otp-pin-code-modal";
import {SmartOtpModal} from "@/features/modals/smart-otp/smart-otp-modal";
import ResetPasswordModal from "@/features/modals/reset-password";
import {KycAuthorizedModal} from "@/features/modals/kyc";
import {ChangeSetupEquipmentModal} from "@/features/modals/builder/change-setup-equipment-modal";
import {SelectSuitableFeatureModal} from "@/features/modals/builder/select-suitable-feature-modal";
import {ViewMoreModal} from "@/features/modals/builder/view-more-modal";
import {ShareEquipmentModal} from "@/features/modals/builder/share-equipment-modal";
import {SaveEquipmentModal} from "@/features/modals/builder/save-equipment-modal";
import {ViewDetailEquipmentModal} from "@/features/modals/builder/view-detail-equipment-modal";
import {TooltipProvider} from "@/components/ui/tooltip";

const MainLayout: FC<GlobalLayoutProps> = ({children}) => {
  const [layout, setLayout] = useState<"builder" | "main">("main");
  const {overlay} = useSelector((state: RootState) => state.theme);
  const {signOutModal} = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const clear = new ClearAllData();
  const handleSignout = () => {
    RemoveACookie("token");
    dispatch(setSignOutModal(false));
    clear.cookieButAccept("rp").localStorage().sessionStorage().store();
    redirect("/", RedirectType.push);
  };

  useEffect(() => {
    // Lấy thông tin layout từ middleware
    const fetchLayout = async () => {
      const response = await fetch(window.location.href, {method: "HEAD"});
      const layoutHeader = response.headers.get("x-layout");
      setLayout(layoutHeader === "builder" ? "builder" : "main");
    };

    fetchLayout();
  }, []);

  if (layout === "builder" || pathName.startsWith("/builder")) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <BuilderLayout>
          {children}
          <OverlayTransparent open={overlay} />
        </BuilderLayout>
        <ChangeSetupEquipmentModal />
        <SelectSuitableFeatureModal />
        <ViewMoreModal />
        <ShareEquipmentModal />
        <SaveEquipmentModal />
        <ViewDetailEquipmentModal />
      </ThemeProvider>
    );
  }

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <SiteHeader />
          <div className="w-full min-h-[calc(100dvh-300px)] md:min-h-full ">
            {children}
          </div>
          <Footer />
          <Search />
          <SearchSiteContainer />
          <Modal
            title="Đăng xuất"
            size="xs"
            titleClass="text-red-primary font-semibold"
            open={signOutModal}
            onClose={() => dispatch(setSignOutModal(false))}
            footerModalClass="flex justify-end"
            bodyClass="text-sm"
            cancelButton={
              <ButtonSubmitPrimary
                className="bg-gray-primary hover:bg-gray-primary text-txtprimary !w-fit"
                onClickHandle={() => dispatch(setSignOutModal(false))}
              >
                {translate("cancel")}
              </ButtonSubmitPrimary>
            }
            submitButton={
              <ButtonSubmitPrimary
                className="bg-red-primary hover:bg-red-primary !w-fit"
                onClickHandle={() => handleSignout()}
              >
                {translate("confirm")}
              </ButtonSubmitPrimary>
            }
          >
            {translate("you_want_to_log_out")}?
          </Modal>
          <AddressProfileModal />
          <AddressDeleteProfileModal />
          <AddressUpdateProfileModal />
          <UpdateInfomationModal />
          <PasscodeModal />
          <SecurityStatusModal />
          <PasscodeModal />
          <OtpPinCodeModal />
          <SmartOtpModal />
          <ResetPasswordModal />
          <KycAuthorizedModal />
          {/* <PopupFirstRender /> */}
        </TooltipProvider>
      </ThemeProvider>

      <OverlayTransparent open={overlay} />
    </>
  );
};

export default MainLayout;
