import Modal from "@/components/base-components/modal";
import {useWindowSize} from "@/hooks";
import {cn} from "@/lib/utils";
import {RootState} from "@/stores";
import {setChooseSuitableFeatureModal} from "@/stores/builder-slice";
import {translate} from "@/utilities/translator";
import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import ButtonCardFeature from "./elements/button-card-feature";
import {usePathname, useRouter} from "next/navigation";
import {indexedDbAddItem, indexedDbGetItem} from "@/utilities/indexdb";
import {Collection, ProSuggest, Shirt, StoreSuggest} from "@/assets/icons";

export const SelectSuitableFeatureModal = () => {
  const {chooseSuitableFeatureModal} = useSelector(
    (state: RootState) => state.builder
  );

  const dispatch = useDispatch();
  const [width, height] = useWindowSize();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const starterPopup = async () => {
      try {
        if (pathName.startsWith("/builder")) {
          const res = await indexedDbGetItem("starter");
          console.log("Get starter result:", res);

          if (!res?.success || !res?.data) {
            dispatch(setChooseSuitableFeatureModal(true));
            return;
          }

          dispatch(setChooseSuitableFeatureModal(false));
        }
      } catch (error) {
        console.error("Error in starterPopup:", error);
        dispatch(setChooseSuitableFeatureModal(true));
      }
    };

    starterPopup();
  }, [pathName, dispatch]);

  const handleCloseModal = async () => {
    const res = await indexedDbAddItem({
      id: "starter",
      value: new Date().toISOString(),
    });
    if (res.success) {
      dispatch(setChooseSuitableFeatureModal(false));
    }
  };

  return (
    <Modal
      verticalPos={width < 1200 ? "bottom" : "center"}
      wrapperClass={cn("z-[52] desktop:h-dvh desktop:top-0")}
      size={width < 1200 ? "full" : "max-w-[476px]"}
      onClose={() => handleCloseModal()}
      open={chooseSuitableFeatureModal}
      cancelButton={false}
    >
      <div className=" gap-5 flex flex-col items-center w-full max-w-[412px] mx-auto">
        <div className="flex flex-col gap-1 items-center w-full">
          <span className="font-semibold text-lg text-txtprimary">
            {translate("choose_the_right_function")}
          </span>
          <span className="font-semibold text-sm  text-gray-icon text-center">
            {translate(
              "nvb_play_provides_many_features_to_support_equipment_choose_the_function_that_suits_your_needs"
            )}
          </span>
        </div>
        <div className="w-full grid grid-cols-2 gap-3">
          <ButtonCardFeature
            icon={<img src={Shirt.src} className="w-[32px] h-[32px]" />}
            onClick={() => router.push("/builder/build-new")}
            title={translate("build_equipment")}
            description={translate(
              "self_built_new_equipment_according_to_your_preferences"
            )}
          />
          <ButtonCardFeature
            icon={<img src={Collection.src} className="w-[32px] h-[32px]" />}
            onClick={() => router.push("/builder/collection")}
            title={translate("collection_saved")}
            description={translate(
              "quick_access_to_the_list_of_stored_equipment"
            )}
          />
          <ButtonCardFeature
            icon={<img src={StoreSuggest.src} className="w-[32px] h-[32px]" />}
            onClick={() => router.push("/builder/store-suggest")}
            title={translate("suggestions_from_the_store")}
            description={translate("discover_the_equipment_built_by_the_store")}
          />
          <ButtonCardFeature
            icon={<img src={ProSuggest.src} className="w-[32px] h-[32px]" />}
            onClick={() => router.push("/builder/pro-suggest")}
            title={translate("suggestions_from_experts")}
            description={translate("discover_the_equipment_to_send_by_experts")}
          />
        </div>
      </div>
    </Modal>
  );
};
