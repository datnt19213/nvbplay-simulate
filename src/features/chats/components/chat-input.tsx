import { StarLinearIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { set } from "date-fns";
import {
  Camera,
  ClipboardList,
  Grid2X2Plus,
  Image,
  SendHorizonal,
  Shirt,
} from "lucide-react";
import { useState } from "react";
import ChooseOrder from "./input-actions/orders";
import ChooseProduct from "./input-actions/products";

interface ChatInputProps {
  onSend: (message: any) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [value, setValue] = useState("");
  return (
    <div className="w-full bg-white">
      {/* DESKTOP */}
      <div className="hidden md:block">
        <div className="flex items-start gap-3 pl-2 pr-4 pt-3">
          <img
            src={StarLinearIcon.src}
            alt=""
            className="size-5"
            loading="lazy"
          />
          <Textarea
            className="w-full border-none outline-none shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-offset-0 resize-none p-0 placeholder:text-primary !min-h-10"
            placeholder="Tôi có thể giúp gì cho bạn?"
          />
        </div>

        <div className="flex justify-between items-center p-2 pr-3">
          <div className="flex items-center gap-2">
            <ChooseOrder />
            <ChooseProduct />
            <Button variant="ghost" size="icon" className="size-5">
              <Image className="size-4 text-neutral-600" />
            </Button>
            <Button variant="ghost" size="icon" className="size-5">
              <Camera className="size-4 text-neutral-600" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <SendHorizonal className="size-5 text-neutral-600" />
          </Button>
        </div>
      </div>
      {/* MOBILE */}
      <div className="block md:hidden">
        <form
          className="flex w-full py-2 px-4 gap-3 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            onSend({
              messageId: new Date().getTime().toString(),
              senderId: "1",
              receiverId: "2",
              type: "text",
              content: value,
              timestamp: new Date().toISOString(),
              status: "delivered",
            });
            setValue("");
          }}
        >
          <Button variant="ghost" size="icon">
            <Grid2X2Plus className="size-5 text-neutral-600" />
          </Button>
          <div className="flex items-center gap-2 h-10 pl-3 p-2 w-full bg-[#F5F5FA] rounded-full">
            <div className="aspect-square size-5 flex items-center justify-center">
              <img
                src={StarLinearIcon.src}
                alt=""
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <Textarea
              rows={1}
              className="w-full border-none outline-none shadow-none text-sm focus-visible:border-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-offset-0 resize-none p-0 placeholder:text-primary !min-h-0 h-full  max-h-12 bg-transparent items-center justify-center pr-3 rounded-none"
              placeholder="Tôi có thể giúp gì cho bạn?"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon" type="submit">
            <SendHorizonal className="size-5 text-neutral-600" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
