"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGhostPosts } from "@/hooks/queries/ghost";
import { RootState } from "@/stores";
import { SendIcon, SmileIcon, UserIcon } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Comment } from "@/hooks/queries/ghost/type";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface UpdateCommentProps {
  commentId: string;
  parentId?: string;
  initialContent: string;
  setIsUpdate: (isUpdate: boolean) => void;
  isFocus?: boolean;
  childrens?: Comment[];
}

export const UpdateComment = ({
  commentId,
  parentId,
  initialContent,
  setIsUpdate,
  childrens,
  isFocus,
}: UpdateCommentProps) => {
  const { updateComment } = useGhostPosts();
  const user = useSelector((state: RootState) => state.users_data.user);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isFocus && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [isFocus]);

  const [content, setContent] = useState(initialContent);

  const handleUpdateComment = async () => {
    await updateComment.mutateAsync({
      id: commentId,
      content: content,
      user_id: user?.id || "",
    });

    setIsUpdate(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      content.trim().length > 0 &&
      content !== initialContent
    ) {
      e.preventDefault();
      handleUpdateComment();
    }
  };

  return (
    <div className="flex justify-start items-start gap-2 h-full">
      <div className="flex flex-col items-center justify-center flex-1 h-full">
        <Avatar className={cn("size-9", parentId && "size-6 md:size-7")}>
          <AvatarImage src={user?.metadata?.avatar || undefined} />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
        {childrens && childrens.length >= 1 && (
          <div className="flex-1 min-h-[110px] h-full w-[1px] bg-neutral-200" />
        )}
      </div>

      <div className="w-full border border-neutral-200 rounded-lg p-2">
        <Textarea
          placeholder="Bình luận của bạn"
          rows={3}
          className="w-full border-none outline-none shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-offset-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus={isFocus}
          ref={textareaRef}
        />
        <div className="flex justify-between items-center">
          <Popover>
            <PopoverTrigger className="disabled:cursor-not-allowed">
              <SmileIcon className="size-6 text-neutral-300" />
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Picker
                data={data}
                theme="light"
                locale="vi"
                onEmojiSelect={(emoji: any) => {
                  const { native } = emoji;
                  setContent(content + native);
                }}
              />
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2">
            <Button
              className="p-0 px-4 bg-[#EBEBF0] hover:bg-neutral-200 rounded-lg text-black"
              onClick={() => setIsUpdate(false)}
              disabled={updateComment.isPending}
            >
              Hủy
            </Button>
            <Button
              className="p-0 px-4 bg-[#EBEBF0] hover:bg-neutral-200 rounded-lg text-black"
              onClick={handleUpdateComment}
              disabled={
                updateComment.isPending ||
                content === initialContent ||
                content.trim().length === 0
              }
            >
              Cập nhật <SendIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
