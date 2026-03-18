import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PanelRightClose, PanelRightOpen, X } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat, setExpanded } from "@/stores/chats";
import { config } from "./config";

interface HeaderChatProps {}
const HeaderChat = () => {
  const dispatch = useDispatch();
  const { expanded, activeChat } = useSelector((state: any) => state.chat);
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const chat = useMemo(() => {
    return config.chats.find((item: any) => item.chatId === activeChat);
  }, [activeChat]);
  return (
    <div className="w-full flex items-center justify-between py-2.5 px-4 md:py-3 md:pl-4 md:pr-2 border-b border-neutral-50">
      {!activeChat && isMobile && (
        <>
          <div className="block size-10 md:hidden" />
          <h4 className="text-base font-semibold">Tin nhắn</h4>
        </>
      )}
      {!isMobile && (
        <>
          <h4 className="text-base font-semibold">Tin nhắn</h4>
        </>
      )}
      {activeChat && isMobile && (
        <>
          <Button
            variant="ghost"
            size={"icon"}
            onClick={() => dispatch(setActiveChat(null))}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <div className="w-full flex items-center gap-2">
            <div className="relative size-10 aspect-square">
              <Avatar>
                <AvatarImage src={chat?.recipient.avatar} className="size-10" />
                <AvatarFallback>
                  {chat?.recipient.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-base font-semibold">
                {chat?.recipient.name}
              </h4>
              <p className="text-xs text-neutral-500">Đang hoạt động</p>
            </div>
          </div>
        </>
      )}
      <div className="flex items-center">
        <div className="hidden md:block">
          <Button
            disabled={!chat}
            variant="ghost"
            size={"icon"}
            onClick={() => dispatch(setExpanded(!expanded))}
          >
            {expanded ? (
              <PanelRightClose className="size-5" />
            ) : (
              <PanelRightOpen className="size-5" />
            )}
          </Button>
        </div>
        <SheetClose asChild>
          <Button variant="ghost" size={"icon"}>
            <X className="size-5" />
          </Button>
        </SheetClose>
      </div>
    </div>
  );
};

export default HeaderChat;
