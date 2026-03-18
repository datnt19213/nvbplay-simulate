import { NVBPlayAvt } from "@/assets/icons";
import SearchInput from "@/components/base-components/input/search-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { config } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat, setExpanded } from "@/stores/chats";
import { useMemo, useState } from "react";
import { searchObjects } from "@/utilities/filters";
import { RootState } from "@/stores";
import { Chat } from "@/stores/chats/type";

interface ListChatsProps {
  setChat: (chat: any) => void;
  chat: any;
}

const ChatList = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const [search, setSearch] = useState("");
  const { activeChat, listChat } = useSelector(
    (state: RootState) => state.chat
  );

  const handleClickChat = (chat: Chat) => {
    dispatch(setActiveChat(chat.chatId));
    dispatch(setExpanded(true));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredListChat = useMemo(
    () => (listChat ? searchObjects(listChat, search, "chatId") : []),
    [listChat, search]
  );

  return (
    <div
      className={cn(
        "w-full md:max-w-[300px] h-full",
        isMobile && activeChat ? "hidden" : "block"
      )}
    >
      <div className="flex flex-col h-full gap-2">
        <div className="flex items-center w-full gap-2 py-2 px-4 md:py-4 md:px-2">
          <SearchInput
            placeholder="Nhập tên cửa hàng"
            className="rounded-full"
            containerClassName="px-2 w-full"
            onChange={handleSearch}
            value={search}
          />
          <Button
            variant="secondary"
            className="rounded-full aspect-square"
            size={"icon"}
          >
            <ChevronsUpDown className="size-4 text-neutral-500" />
          </Button>
        </div>
        <div className="flex flex-col gap-4 py-2 md:py-0 md:gap-0 h-full overflow-y-auto scrollbar-none">
          {filteredListChat?.map((item) => {
            const activeChatInfo = item.recipient;
            const lastMessage = item.messages[item.messages.length - 1];
            return (
              <div
                onClick={() => handleClickChat(item)}
                key={item.chatId}
                className={cn(
                  "flex items-center gap-2 py-1 px-4 md:p-4 hover:bg-neutral-100 cursor-pointer select-none transition-all duration-300 ease-in-out",
                  item.chatId === activeChat && "bg-neutral-100"
                )}
              >
                <div className="relative size-14 aspect-square">
                  <Avatar className="size-full">
                    <AvatarImage src={activeChatInfo.avatar} />
                    <AvatarFallback>
                      {activeChatInfo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {lastMessage.status === "sent" && (
                    <div className="absolute bottom-2 right-0.5 size-3 bg-green-600 rounded-full" />
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold">
                      {activeChatInfo.name}
                    </h4>
                    <p
                      className={cn(
                        "text-sm font-semibold text-neutral-700",
                        item.lastUpdated && "font-normal text-neutral-600"
                      )}
                    >
                      {format(item.lastUpdated, "HH:mm")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p
                      className={cn(
                        "text-sm line-clamp-1 font-medium text-neutral-700",
                        lastMessage.status === "sent" &&
                          "font-normal text-neutral-600"
                      )}
                    >
                      {lastMessage.content}
                    </p>
                    {lastMessage.status === "sent" && (
                      <div className="aspect-square size-2 bg-primary rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
