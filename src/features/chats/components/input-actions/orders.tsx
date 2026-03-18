import PopoverResponsive from "@/components/base-components/popover/popover-responsive";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { useState } from "react";

const ChooseOrder = () => {
  const [open, setOpen] = useState(false);
  return (
    <PopoverResponsive
      trigger={<Trigger />}
      open={open}
      setOpen={setOpen}
      popoverProps={{
        align: "start",
        side: "top",
        sideOffset: 10,
      }}
    >
      <div className="flex flex-col gap-2">
        <p>Choose order</p>
      </div>
    </PopoverResponsive>
  );
};

export default ChooseOrder;

const Trigger = () => {
  return (
    <Button variant="ghost" size="icon" className="size-5">
      <ClipboardList className="size-4 text-neutral-600" />
    </Button>
  );
};
