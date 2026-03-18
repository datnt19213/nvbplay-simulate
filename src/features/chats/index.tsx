import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import BotTrigger from "./components/bot-trigger";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ChatContainer from "./components/chat-container";

const ChatBot = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="fixed bottom-10 right-10">
        <BotTrigger />
      </SheetTrigger>
      <SheetContent
        withCloseButton={false}
        className="bg-transparent border-none shadow-none ring-0 h-screen md:h-[580px] md:max-h-[580px] min-w-full desktop:min-w-[720px] p-0 top-0 left-0 md:top-auto md:left-auto md:!bottom-2 md:!right-2"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>ChatBot</SheetTitle>
            <SheetDescription>ChatBot</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <div className="relative h-full flex flex-col justify-end items-end w-full">
          <ChatContainer />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBot;
