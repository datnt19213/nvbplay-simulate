"use client";
import React, { useEffect } from "react";
import ChatList from "./chat-list";
import ChatContent from "./chat-content";
import HeaderChat from "./header";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setListChat } from "@/stores/chats";
import { config } from "./config";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { expanded } = useSelector((state: any) => state.chat);
  useEffect(() => {
    if (config.chats.length > 0) {
      dispatch(setListChat(config.chats));
    }
  }, []);
  return (
    <div
      className={cn(
        "relative flex flex-col w-full h-full bg-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out",
        !expanded && "md:w-[300px]"
      )}
    >
      <HeaderChat />
      <div className="flex h-[calc(100%-65px)] w-full">
        <ChatList />
        <ChatContent />
      </div>
    </div>
  );
};

export default ChatContainer;
