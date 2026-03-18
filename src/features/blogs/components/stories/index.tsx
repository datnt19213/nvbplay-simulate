import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React from "react";
import { StoryList } from "./components/list/story-list";
import { StoryComment } from "./components/comments/story-comment";
import { StoryContent } from "./components/content/story-content";

export const StoryContainer = ({
  children,
  image,
}: {
  children: React.ReactNode;
  image?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-screen min-w-full h-screen overflow-hidden p-0 [&>button]:hidden">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <DialogClose />
        </VisuallyHidden>
        <div className="w-full h-screen">
          <div className="w-full h-screen grid grid-cols-12 gap-0">
            <div className="hidden md:block col-span-1 h-screen bg-black border-r border-neutral-950 w-full">
              <StoryList />
            </div>
            <div className="col-span-12 md:col-span-7 bg-black w-full h-full">
              <StoryContent image={image} />
            </div>
            <div className="hidden md:block col-span-4 bg-white pt-6 px-6 w-full h-full">
              <StoryComment />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
