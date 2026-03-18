"use client";

import AddressTrigger from "./trigger";
import { Address } from "./address";
import { useState } from "react";
import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";

const AddressDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <DialogResponsive
      trigger={<AddressTrigger />}
      open={open}
      setOpen={setOpen}
      dialogClassname="h-[538px]"
      sheetClassname="h-[90vh]"
    >
      <Address open={open} setOpenRoot={setOpen} />
    </DialogResponsive>
  );
};

export default AddressDialog;
