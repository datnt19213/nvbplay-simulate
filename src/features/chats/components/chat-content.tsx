import { BotChatIcon, StarLinearIcon, NVBPlayAvt } from "@/assets/icons";
import Image from "@/components/base-components/images/image";
import { cn } from "@/lib/utils";
import { List, RefreshCw } from "lucide-react";
import ChatIcon from "./chat-icon";
import ChatInput from "./chat-input";
import { config } from "./config";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { m } from "framer-motion";

interface ChatContentProps {}

const ChatContent = () => {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const { activeChat, expanded } = useSelector((state: any) => state.chat);
  const chat = useMemo(() => {
    return config.chats.find((item: any) => item.chatId === activeChat);
  }, [activeChat]);

  const [messages, setMessages] = useState(chat?.messages || []);
  const messagesRef = useRef(messages);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  // Hàm thêm tin nhắn mới
  const addMessage = (newMessage: {
    messageId: string;
    senderId: string;
    receiverId: string;
    type: string;
    content: string;
    timestamp: string;
    status: string;
  }) => {
    messagesRef.current = [...messagesRef.current, newMessage]; // Cập nhật ref
    setMessages(messagesRef.current); // Cập nhật state để re-render
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (chat?.messages) {
      setMessages(chat.messages);
    }
  }, [chat]);

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div
      className={cn(
        "w-full h-full",
        isMobile
          ? activeChat
            ? "block"
            : "hidden"
          : expanded
            ? "visible"
            : "hidden"
      )}
    >
      <div className="w-full h-full flex flex-col bg-[#F5F5FA]">
        {/* TOP */}
        <div className="flex w-full flex-col gap-3 p-4 justify-start items-start mb-auto overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-center w-full">
            <p className="text-sm font-medium text-neutral-600">
              {format(chat?.lastUpdated || new Date(), "HH:mm")}
            </p>
          </div>
          {messages && messages.length > 0 ? (
            messages.map((message: any, index: number) => {
              const isLastMessage = index === messages.length - 1;
              if (message.senderId === chat?.user.userId) {
                return (
                  <div
                    className="flex items-end justify-end w-full slide-in-from-right-0"
                    key={message.messageId}
                    ref={isLastMessage ? latestMessageRef : null}
                  >
                    <div className="flex flex-col rounded-xl border border-[#F9AFA4] bg-[#F6DFDF] gap-2 p-3 max-w-[280px]">
                      <p className="text-base text-neutral-900 whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <span className="flex w-full items-end justify-end text-xs text-neutral-600">
                        {format(new Date(message.timestamp), "HH:mm")}
                      </span>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  className="flex items-start justify-start w-full slide-in-from-left-0"
                  key={message.messageId}
                  ref={isLastMessage ? latestMessageRef : null}
                >
                  <div className="flex flex-col rounded-xl bg-white gap-2 p-3 max-w-[280px]">
                    <p className="text-base text-neutral-900 whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <span className="flex w-full gap-1 items-end justify-end text-xs text-neutral-600">
                      {format(new Date(message.timestamp), "HH:mm")}
                      <img
                        src={StarLinearIcon.src}
                        alt="StarLinearIcon"
                        className="size-4"
                      />
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              {/* CHAT INFO */}
              <div className="flex w-full gap-2">
                <div className="flex flex-col rounded-lg relative  bg-white">
                  <div className="w-[116px] h-[135px]">
                    <Image
                      src={BotChatIcon.src}
                      alt="NVB Play"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-0.5 px-3 py-2">
                    <div className="flex items-center gap-1">
                      <h3 className="text-sm font-semibold">Trợ thủ AI</h3>
                      <img
                        src={StarLinearIcon.src}
                        alt="StarLinearIcon"
                        className="size-5"
                      />
                    </div>
                    <p className="text-xs text-neutral-700">Hỗ trợ 24/7</p>
                  </div>
                </div>
                <div className="flex flex-col w-full bg-white rounded-lg">
                  <div className="flex items-center justify-between p-3 border-b border-neutral-100">
                    <h3 className="text-sm font-semibold">Bạn muốn hỏi:</h3>
                    <div className="flex items-center gap-0.5 text-xs p-0 cursor-pointer">
                      <RefreshCw className="size-4" />
                      Làm mới
                    </div>
                  </div>
                  <div className="grid grid-cols-1 text-sm divide-y divide-neutral-100">
                    {config.questions.map((question, index) => (
                      <p
                        key={index}
                        className="flex items-center px-3 py-2 hover:bg-neutral-50 cursor-pointer"
                        onClick={() => {}}
                      >
                        {question}
                      </p>
                    ))}
                    <div className="flex items-center px-3 py-2 hover:bg-neutral-50 cursor-pointer">
                      <div className="aspect-square size-5 flex items-center justify-center">
                        <List className="size-4" />
                      </div>
                      <p>Câu hỏi thường gặp</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* MENU */}
              <div className="grid grid-cols-5 w-full gap-2">
                {config.menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-white rounded-lg py-1.5 px-1"
                  >
                    <ChatIcon
                      src={item.icon}
                      alt={item.title}
                      type={item.type as "gradient" | "solid"}
                      from={item.from}
                      to={item.to}
                    />
                    <p className="text-xs text-neutral-700 text-center font-medium">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {/* BOTTOM */}
        <div className="flex flex-col w-full">
          <div className="flex w-full max-w-full md:max-w-[420px] items-center gap-2 p-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 rounded-full bg-white p-1.5 pr-3 cursor-pointer hover:bg-neutral-50">
              <div className="flex items-center justify-center aspect-square size-6 ">
                <img
                  src={NVBPlayAvt.src}
                  alt="NVBLogoIcon"
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm font-medium text-neutral-700 text-nowrap">
                Chat với người bán
              </p>
            </div>
            {config.suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => {
                  addMessage({
                    messageId: new Date().getTime().toString(),
                    senderId: chat?.user.userId || "",
                    receiverId: chat?.user.userId || "",
                    type: "text",
                    content: suggestion,
                    timestamp: new Date().toISOString(),
                    status: "sent",
                  });
                }}
                className="flex items-center justify-center rounded-full bg-white py-2 px-3 hover:bg-neutral-50 cursor-pointer select-none"
              >
                <p className="text-sm font-medium text-neutral-700 text-nowrap">
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
          <ChatInput onSend={addMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
