"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React, { useState } from "react";
import { StoryContent } from "./create-story-content";

export const CreateStoryModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [content, setContent] = useState("");
  const [activeChooseColor, setActiveChooseColor] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    first: "#FFFFFF",
    second: "#FFFFFF",
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isMobile ? (
        <Drawer>
          <DrawerTrigger asChild>{children}</DrawerTrigger>
          <DrawerContent className="h-[90vh]">
            <DrawerHeader>
              <DrawerTitle className="mx-auto text-center -mt-2">
                Thêm câu chuyện
              </DrawerTitle>
              <VisuallyHidden>
                <DrawerDescription>Thêm câu chuyện</DrawerDescription>
              </VisuallyHidden>
            </DrawerHeader>

            <StoryContent
              content={content}
              setContent={setContent}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              activeChooseColor={activeChooseColor}
              setActiveChooseColor={setActiveChooseColor}
              isMobile={isMobile}
            />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="min-w-[560px]">
            <DialogHeader>
              <DialogTitle className="mx-auto text-center -mt-2">
                Thêm câu chuyện
              </DialogTitle>
              <VisuallyHidden>
                <DialogDescription>Thêm câu chuyện</DialogDescription>
              </VisuallyHidden>
            </DialogHeader>

            <StoryContent
              content={content}
              setContent={setContent}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              activeChooseColor={activeChooseColor}
              setActiveChooseColor={setActiveChooseColor}
              isMobile={isMobile}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
