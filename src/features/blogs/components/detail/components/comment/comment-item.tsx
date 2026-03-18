import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment } from "@/hooks/queries/ghost/type";
import { formatDistanceToNowStrict, isEqual } from "date-fns";
import { vi } from "date-fns/locale";
import { MoreHorizontalIcon, PencilLine, Trash2, User } from "lucide-react";
import { CreateComment } from "./create-comment";
import { UpdateComment } from "./update-comment";
import { useGhostPosts } from "@/hooks/queries/ghost";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useMemo, useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommentItemProps {
  postId: string;
  comment: Comment;
  slug?: string;
  level?: number;
  onReplyAtParent?: (user_name: string, user_id: string) => void;
  expandedComments?: Map<string, boolean>;
  toggleExpand?: (commentId: string) => void;
}

export const CommentItem = ({
  postId,
  comment,
  slug,
  level = 1,
  onReplyAtParent,
  expandedComments,
  toggleExpand,
}: CommentItemProps) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [taggedUserName, setTaggedUserName] = useState<{
    user_name: string;
    user_id: string;
  } | null>(null);

  const { deleteComment } = useGhostPosts();
  const replyRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.users_data.user);
  const handleDeleteComment = async (id: string) => {
    await deleteComment.mutateAsync({
      id: id,
      user_id: user?.id || "",
    });
  };

  const isCanEdit = useMemo(() => {
    if (user) {
      if (user?.id === comment?.user_id) {
        return true;
      }
    }
    return false;
  }, [user, comment]);

  useEffect(() => {
    if (isReply) {
      if (replyRef.current) {
        replyRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [isReply]);

  return (
    <>
      <div className="flex w-full justify-start relative items-start gap-1.5 md:gap-2 pb-2 animate-fade duration-300 animate-ease-linear">
        {!isUpdate ? (
          <div className="flex gap-1.5 md:gap-2 h-full w-full">
            <div className="flex flex-1 flex-col items-start justify-start h-full">
              <div className="flex flex-1 flex-col items-center justify-start h-full">
                {/* Avatar */}
                <Avatar
                  className={cn(
                    comment?.children && comment.parent_id === null && "size-9",
                    comment.parent_id !== null && "size-6 md:size-7",
                    comment?.deleted_at && "opacity-80 aspect-square relative"
                  )}
                >
                  <AvatarImage
                    src={
                      !comment.deleted_at
                        ? comment?.user_image || undefined
                        : undefined
                    }
                  />
                  <AvatarFallback className="text-primary font-semibold text-lg">
                    {comment.deleted_at ? (
                      <User className="size-4 text-neutral-500" />
                    ) : (
                      comment?.user_name?.charAt(0)
                    )}
                  </AvatarFallback>
                </Avatar>

                {/* Đường viền */}
                <div
                  className={cn(
                    "w-[1px] bg-neutral-200",
                    (comment?.children && comment?.children?.length > 0) ||
                      isReply
                      ? "min-h-14 h-full"
                      : "h-0 opacity-0",
                    comment?.deleted_at && "min-h-5"
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col w-full justify-start items-start gap-1">
              <div
                className={cn(
                  "w-full border border-[#F5F5FA] bg-[#F5F5FA] rounded-lg p-2",
                  comment?.deleted_at && "opacity-50",
                  isReply && "bg-blue-500/30"
                )}
              >
                {!comment?.deleted_at && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="text-black font-bold text-xs md:text-sm">
                        {comment?.user_name}
                      </div>

                      <div className="text-neutral-500 font-semibold text-xs md:text-sm">
                        {!isEqual(
                          new Date(comment?.created_at),
                          new Date(comment?.updated_at)
                        ) && "(Đã cập nhật)"}
                      </div>
                    </div>

                    <>
                      {isCanEdit && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="text-neutral-500 font-semibold text-sm cursor-pointer">
                              <MoreHorizontalIcon className="size-4" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              className="w-full flex justify-start items-start gap-2 cursor-pointer p-3 hover:bg-neutral-200"
                              onClick={() => setIsUpdate(true)}
                            >
                              <PencilLine className="size-4" />
                              <div className="flex flex-col justify-start items-start gap-0">
                                <p className="text-sm font-semibold text-neutral-900">
                                  Chỉnh sửa
                                </p>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="w-full flex justify-start items-start gap-2 cursor-pointer p-3 hover:bg-neutral-200"
                              onClick={async () => {
                                await handleDeleteComment(comment?.id || "");
                              }}
                            >
                              <Trash2 className="size-4 text-red-700" />
                              <div className="flex flex-col justify-start items-start gap-0">
                                <p className="text-sm font-semibold text-red-700">
                                  Xóa
                                </p>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </>
                  </div>
                )}
                {/* <AutosizeTextarea
                    readOnly
                    className="text-neutral-900 font-normal text-sm leading-normal bg-transparent border-none scrollbar-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 resize-none"
                    placeholder={
                        comment?.deleted_at
                        ? "Bình luận này đã bị ẩn!"
                        : comment?.content
                    }
                    /> */}
                <p className="text-neutral-900 font-normal text-sm leading-normal break-all whitespace-pre-wrap">
                  {comment?.deleted_at ? (
                    "Bình luận này đã bị ẩn!"
                  ) : comment?.user_reply ? (
                    <span className="flex flex-wrap items-start justify-start gap-1">
                      <span className="text-neutral-900 font-semibold underline text-nowrap">
                        {comment?.user_reply}
                      </span>
                      <span className="text-neutral-700 font-normal text-sm leading-normal break-all whitespace-pre-wrap">
                        {comment?.content}
                      </span>
                    </span>
                  ) : (
                    comment?.content
                  )}
                </p>
              </div>
              {!comment?.deleted_at && (
                <div className="w-full flex justify-between items-center">
                  <div className="flex justify-start items-start gap-5">
                    <div className="text-neutral-500 font-medium text-xs md:text-sm">
                      {formatDistanceToNowStrict(
                        new Date(comment?.created_at || ""),
                        {
                          addSuffix: true,
                          locale: vi,
                        }
                      )}
                    </div>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="text-neutral-500 font-semibold text-xs md:text-sm">
                          Thích
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tính năng đang phát triển</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          className={cn(
                            "text-neutral-500 font-semibold text-xs md:text-sm cursor-pointer hover:text-primary",
                            isReply && "text-primary underline"
                          )}
                          onClick={() => {
                            if (!user) {
                              toast.error(
                                "Vui lòng đăng nhập để thực hiện thao tác này"
                              );
                              return;
                            } else {
                              if (level === 3 && onReplyAtParent) {
                                // Nếu vượt cấp, gọi hàm từ parent để xử lý việc tag
                                onReplyAtParent(
                                  comment?.user_name || "",
                                  comment?.user_id || ""
                                );
                              } else {
                                // Nếu chỉ đơn giản là reply, đặt trạng thái tag và mở reply
                                setTaggedUserName({
                                  user_name: comment?.user_name || "",
                                  user_id: comment?.user_id || "",
                                }); // Lưu tên của comment hiện tại
                                setIsReply(!isReply);
                              }
                            }
                          }}
                        >
                          {isReply ? "Hủy" : "Trả lời"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Phản hồi bình luận</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full">
            <UpdateComment
              commentId={comment?.id || ""}
              parentId={comment?.parent_id || undefined}
              initialContent={comment?.content || ""}
              setIsUpdate={setIsUpdate}
              isFocus={true}
              childrens={comment?.children}
            />
          </div>
        )}
      </div>

      {/* Recursive rendering with proper key and handlers */}
      {/* Đệ quy comment con (tối đa cấp 3) */}
      {level < 3 && comment?.children && comment?.children?.length > 0 && (
        <div className="flex items-start w-full h-full justify-start gap-3">
          <div className="border-gray-300 w-full">
            {!expandedComments?.has(comment.id) ||
            expandedComments?.get(comment.id) === false ? (
              <div className={cn("py-3 relative", "pl-9 md:pl-11")}>
                {/* // Hiển thị nút "Xem thêm bình luận" nếu chưa mở */}
                {(isReply ||
                  (expandedComments?.has(comment.id) &&
                    expandedComments?.get(comment.id) === true)) && (
                  <div
                    className={cn(
                      "absolute top-0 left-[12px] md:left-[17px] w-[1px] h-[calc(100%+10px)] bg-neutral-200",
                      comment.parent_id === null && "left-[18px]",
                      comment.parent_id !== null && "md:left-[13px]"
                    )}
                  />
                )}
                {comment.children.length === 1 && (
                  <div
                    className={cn(
                      "absolute -top-2 md:-top-1 left-[12px] md:left-[17px] w-[1px] h-5 bg-neutral-200",
                      comment.parent_id === null && "left-[18px]",
                      comment.parent_id !== null && "md:left-[13px]"
                    )}
                  />
                )}
                <div
                  className={cn(
                    "absolute -top-3 md:-top-2 left-[12px] md:left-[17px] w-3 h-8 md:w-5 rounded-bl-lg border-b border-l border-neutral-200",

                    comment.parent_id === null && "left-[18px]",

                    comment.parent_id !== null && "md:left-[13px]"
                  )}
                />
                <div
                  className="text-muted-foreground font-medium text-xs md:text-sm cursor-pointer hover:underline"
                  onClick={() => toggleExpand && toggleExpand(comment.id)}
                >
                  Xem thêm bình luận ({comment.children.length})
                </div>
              </div>
            ) : (
              <>
                {comment.children.map((reply, index) => (
                  <div
                    key={reply.id}
                    className={cn(
                      "py-2 relative",
                      "pl-9 md:pl-11",
                      comment.parent_id !== null && "pl-7 md:pl-9",
                      index < comment.children?.length - 1 && "pb-2"
                    )}
                  >
                    {(index < comment.children?.length - 1 ||
                      isReply ||
                      (expandedComments?.has(comment.id) &&
                        expandedComments?.get(comment.id) === true)) && (
                      <div
                        className={cn(
                          "absolute top-0 left-[12px] md:left-[17px] w-[1px] h-[calc(100%+10px)] bg-neutral-200",
                          comment.parent_id === null && "left-[18px]",
                          comment.parent_id !== null && "md:left-[13px]"
                        )}
                      />
                    )}

                    {comment.children.length === 1 && (
                      <div
                        className={cn(
                          "absolute -top-2 md:-top-1 left-[12px] md:left-[17px] w-[1px] h-5 bg-neutral-200",
                          comment.parent_id === null && "left-[18px]",
                          comment.parent_id !== null && "md:left-[13px]"
                        )}
                      />
                    )}
                    <div
                      className={cn(
                        "absolute -top-3 md:-top-2 left-[12px] md:left-[17px] w-3 h-8 md:w-5 rounded-bl-lg border-b border-l border-neutral-200",

                        comment.parent_id === null && "left-[18px]",

                        comment.parent_id !== null && "md:left-[13px]"
                      )}
                    />

                    <CommentItem
                      key={reply.id}
                      postId={postId}
                      comment={reply}
                      onReplyAtParent={(userName) => {
                        setTaggedUserName({
                          user_name: userName,
                          user_id: "",
                        }); // Lưu tên của comment cần tag (Item 3)
                        setIsReply(true); // Mở khung reply
                      }}
                      expandedComments={expandedComments}
                      toggleExpand={toggleExpand}
                      slug={slug}
                      level={level + 1}
                    />
                  </div>
                ))}
                <div className={cn("py-3 pt-1 relative", "pl-9 md:pl-11")}>
                  {isReply && (
                    <div
                      className={cn(
                        "absolute top-0 left-[12px] md:left-[17px] w-[1px] h-[calc(100%+10px)] bg-neutral-200",
                        comment.parent_id === null && "left-[18px]",
                        comment.parent_id !== null && "md:left-[13px]"
                      )}
                    />
                  )}
                  {comment.children.length === 1 && (
                    <div
                      className={cn(
                        "absolute -top-2 md:-top-3 left-[12px] md:left-[17px] w-[1px] h-5 bg-neutral-200",
                        comment.parent_id === null && "left-[18px]",
                        comment.parent_id !== null && "md:left-[13px]"
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      "absolute -top-3 md:-top-4 left-[12px] md:left-[17px] w-3 h-8 md:w-5 rounded-bl-lg border-b border-l border-neutral-200",

                      comment.parent_id === null && "left-[18px]",

                      comment.parent_id !== null && "md:left-[13px]"
                    )}
                  />
                  <div
                    className="text-muted-foreground font-medium text-xs md:text-sm cursor-pointer hover:underline"
                    onClick={() => {
                      if (expandedComments?.has(comment.id)) {
                        toggleExpand && toggleExpand(comment.id);
                      }
                    }}
                  >
                    Ẩn bớt bình luận
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isReply && (
        <>
          <div className={cn("py-2 relative pl-7 md:pl-9")}>
            {isReply && (
              <div
                className={cn(
                  "absolute -top-2 md:-top-1 left-[12px] md:left-[17px] w-[1px] h-5 bg-neutral-200",
                  comment.parent_id === null && "left-[18px]",
                  comment.parent_id !== null && "md:left-[13px]"
                )}
              />
            )}
            <div
              className={cn(
                "absolute -top-3 md:-top-2 left-[12px] md:left-[17px] w-3 h-8 md:w-5 rounded-bl-lg border-b border-l border-neutral-200",

                comment.parent_id === null && "left-[18px]",

                comment.parent_id !== null && "md:left-[13px]"
              )}
            />

            <div ref={replyRef}>
              <CreateComment
                post_id={postId}
                parent_id={comment.id}
                setIsReply={setIsReply}
                slug={slug}
                isFocus={true}
                userInfo={taggedUserName ? taggedUserName : undefined}
                setUserInfo={setTaggedUserName}
                childrens={comment?.children}
                toggleExpand={toggleExpand}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
