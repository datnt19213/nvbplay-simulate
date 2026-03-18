import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React from "react";
import { StoryComment } from "./comments/story-comment";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const MobileCommentDrawer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[90vh] p-4">
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <DrawerClose />
        </VisuallyHidden>
        <div className="h-[90vh] overflow-y-scroll scrollbar-none">
          <StoryComment />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
