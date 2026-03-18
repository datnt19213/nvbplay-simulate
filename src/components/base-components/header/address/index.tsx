"use client";
import DialogResponsive from "../../dialog/dialog-responsive";
import AddressTrigger from "./trigger";
import { Address } from "./address";
import { useState } from "react";

const AddressDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <DialogResponsive
      trigger={<AddressTrigger />}
      open={open}
      setOpen={setOpen}
    >
      <Address open={open} setOpenRoot={setOpen} />
    </DialogResponsive>
  );
};

export default AddressDialog;
