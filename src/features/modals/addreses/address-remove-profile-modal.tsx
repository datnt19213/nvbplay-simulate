import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import Modal from "@/components/base-components/modal";
import {useMutationDeleteAddreses} from "@/hooks/queries/addresses/use-delete-addreses";

import {RootState} from "@/stores";
import {setAddressDeleteModal, setAddressModal} from "@/stores/profile";
import {translate} from "@/utilities/translator";
import React from "react";
import {useSelector, useDispatch} from "react-redux";

const AddressDeleteProfileModal = () => {
  const {addressDeleteModal} = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const {isPending, deleteFnc} = useMutationDeleteAddreses();

  const handleRemoveAddress = () => {
    deleteFnc();
    dispatch(setAddressDeleteModal(false));
  };

  return (
    <Modal
      wrapperClass="!z-[49]"
      title={translate("delete_address")}
      size="xs"
      titleClass="text-red-primary font-semibold text-start"
      open={addressDeleteModal}
      onClose={() => dispatch(setAddressDeleteModal(false))}
      footerModalClass="flex justify-end"
      bodyClass="text-sm"
      cancelButton={
        <ButtonSubmitPrimary
          className="bg-gray-primary hover:bg-gray-primary text-txtprimary !w-fit"
          onClickHandle={() => dispatch(setAddressDeleteModal(false))}
        >
          Cancel
        </ButtonSubmitPrimary>
      }
      submitButton={
        <ButtonSubmitPrimary
          className="bg-red-primary hover:bg-red-primary !w-fit"
          onClickHandle={() => handleRemoveAddress()}
          isLoading={isPending}
          disabled={isPending}
        >
          Confirm
        </ButtonSubmitPrimary>
      }
    >
      {translate("do_you_want_delete")}?
    </Modal>
  );
};

export default AddressDeleteProfileModal;
