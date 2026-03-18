"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGhostPosts } from "@/hooks/queries/ghost";
import { RootState } from "@/stores";
import { Loader2, SendIcon, SmileIcon, UserIcon, X } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Comment } from "@/hooks/queries/ghost/type";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface CreateCommentProps {
  post_id?: string;
  parent_id?: string;
  setIsReply?: (value: boolean) => void;
  slug?: string;
  isFocus?: boolean;
  childrens?: Comment[];
  userInfo?: {
    user_name: string;
    user_id: string;
  };
  setUserInfo?: (value: { user_name: string; user_id: string } | null) => void;
  isCancelled?: boolean;
  setIsCancelled?: (value: boolean) => void;
  toggleExpand?: (id: string) => void;
}

export const CreateComment = ({
  post_id,
  parent_id,
  setIsReply,
  slug,
  isFocus,
  childrens,
  userInfo,
  setUserInfo,
  toggleExpand,
}: CreateCommentProps) => {
  const [comment, setComment] = useState("");
  const { createComment } = useGhostPosts();
  const user = useSelector((state: RootState) => state.users_data.user);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
      textareaRef.current.focus();
    }
  }, [comment]);
  //   const handleClickOutside = () => {
  //     // Chỉ đóng khi không phải do nút "Hủy" gây ra
  //     if (!isCancelled && isFocus) {
  //       setIsReply && setIsReply(false);
  //     }
  //     setIsCancelled && setIsCancelled(false); // Reset trạng thái sau khi xử lý outside click
  //   };

  //   useOnClickOutside(ref, handleClickOutside);

  const handleAddComment = async ({
    content,
    parent_id,
    post_id,
    user_reply,
    user_data,
  }: {
    post_id: string;
    parent_id?: string;
    content: string;
    user_reply: string;
    user_data: {
      id: string;
      name: string;
      image: string;
    };
  }) => {
    const params: {
      post_id: string;
      content: string;
      parent_id?: string;
      user_reply: string;
      user_data: {
        id: string;
        name: string;
        image: string;
      };
    } = {
      post_id,
      content,
      parent_id: parent_id,
      user_reply: user_reply,
      user_data: {
        id: user_data.id,
        name: user_data.name,
        image: user_data.image,
      },
    };

    const res = await createComment.mutateAsync(params);
    if (res) {
      setComment("");
      setIsReply && setIsReply(false);
      if (res.data.data) {
        const parent_id = res.data.data.parent_id;
        if (parent_id) {
          toggleExpand && toggleExpand(parent_id);
        }
        toggleExpand && toggleExpand(res.data.data.id);
      }
    }
  };
  return (
    <div
      ref={ref}
      className="flex justify-start items-start gap-2 animate-shake duration-300"
    >
      <div className="flex flex-col items-center justify-center flex-1 h-full relative">
        <div className="absolute top-0 -left-full w-[5px] bg-neutral-200" />
        <Avatar className={cn("size-9", parent_id && "size-6 md:size-7")}>
          <AvatarImage src={user?.metadata?.avatar} />
          <AvatarFallback className="text-lg font-bold text-primary">
            {user ? (
              <>{user?.first_name?.charAt(0)}</>
            ) : (
              <UserIcon className="size-5 text-foreground" />
            )}
          </AvatarFallback>
        </Avatar>
        {/* <div className="flex-1 min-h-[110px] h-full w-[1px] bg-neutral-200" /> */}
      </div>

      <div className="w-full border border-neutral-200 rounded-lg p-2">
        {isFocus && userInfo?.user_name && (
          <div className="flex items-center gap-1">
            <span className="text-sm text-white bg-blue-500/70 px-1 py-0.5 cursor-pointer">
              Trả lời cho {userInfo?.user_name}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-4"
              onClick={() => setUserInfo && setUserInfo(null)}
            >
              <X className="size-3" />
            </Button>
          </div>
        )}
        <Textarea
          ref={textareaRef}
          placeholder={parent_id ? "Viết phản hồi..." : "Viết bình luận..."}
          autoFocus={isFocus}
          rows={3}
          className="w-full border-none outline-none shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-offset-0"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddComment({
                post_id: post_id || "",
                content: comment,
                parent_id: parent_id || "",
                user_reply: userInfo?.user_name || "",
                user_data: {
                  id: user?.id || "",
                  name: user?.first_name || "",
                  image: user?.metadata?.avatar || "",
                },
              });
            }
          }}
          disabled={createComment.isPending || !user}
        />
        <div className="flex justify-between items-center">
          <Popover>
            <PopoverTrigger
              className="disabled:cursor-not-allowed"
              disabled={createComment.isPending || !user}
            >
              <SmileIcon className="size-6 text-neutral-300" />
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 border-none shadow-none bg-transparent">
              <Picker
                data={data}
                theme="light"
                locale="vi"
                onEmojiSelect={(emoji: any) => {
                  const { native } = emoji;
                  setComment(comment + native);
                }}
              />
            </PopoverContent>
          </Popover>
          {user && (
            <Button
              className="p-0 px-4 bg-[#EBEBF0] hover:bg-neutral-200 rounded-lg text-black"
              onClick={() =>
                handleAddComment({
                  post_id: post_id || "",
                  content: comment,
                  parent_id: parent_id || "",
                  user_reply: userInfo?.user_name || "",
                  user_data: {
                    id: user?.id || "",
                    name: user?.first_name || "",
                    image: user?.metadata?.avatar || "",
                  },
                })
              }
              disabled={createComment.isPending || !comment.trim() || !user}
            >
              {createComment.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span className="ml-2">Đang gửi...</span>
                </>
              ) : (
                <>
                  {parent_id ? "Phản hồi" : "Gửi"}{" "}
                  <SendIcon className="size-4" />
                </>
              )}
            </Button>
          )}
          {!user && (
            <Button className="rounded-lg" asChild>
              <Link href={`/auth?redirect=blogs/${slug}`}>
                <UserIcon className="size-4" />
                <span>Đăng nhập để bình luận</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
