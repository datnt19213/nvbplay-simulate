import { Post } from "@/hooks/queries/ghost/type";
import { CommentItem } from "./comment-item";
import { CreateComment } from "./create-comment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAblyChannel } from "@/utilities/ably";
import { Comment } from "@/hooks/queries/ghost/type";
import { useExpandedComments } from "./use-expanded-comment";

export const ListComment = ({ blogDetail }: { blogDetail: Post }) => {
    const { expandedComments, toggleExpand } = useExpandedComments();
  const [comments, setComments] = useState<Comment[]>(
    blogDetail?.comments || []
  );

  const addCommentToNestedList: any = (
    comments: Comment[],
    parentId: string,
    newComment: Comment
  ) => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          children: [...(comment.children || []), newComment],
        };
      }
      if (comment.children && comment.children.length > 0) {
        return {
          ...comment,
          children: addCommentToNestedList(
            comment.children,
            parentId,
            newComment
          ),
        };
      }
      return comment;
    });
  };

  const updateCommentToNestedList = (
    comments: Comment[],
    commentId: string,
    newComment: Partial<Comment>
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment, // Giữ nguyên dữ liệu hiện tại
          ...newComment, // Cập nhật các trường mới
          children: comment.children, // Giữ nguyên children
        };
      }

      if (comment.children && comment.children.length > 0) {
        return {
          ...comment,
          children: updateCommentToNestedList(
            comment.children,
            commentId,
            newComment
          ),
        };
      }

      return comment; // Không thay đổi comment nào không liên quan
    });
  };

  const deleteCommentFromNestedList = (
    comments: Comment[],
    commentId: string
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          deleted_at: new Date().toDateString(), // Thêm thuộc tính deletedAt
        };
      }

      if (comment.children && comment.children.length > 0) {
        return {
          ...comment,
          children: deleteCommentFromNestedList(comment.children, commentId), // Tiếp tục kiểm tra trong children
        };
      }

      return comment; // Không thay đổi nếu không phải comment cần xóa
    });
  };

  useEffect(() => {
    const channel = getAblyChannel("post_comment_event");

    const handleNewMessage = (message: any) => {
      const newSetting = message.data;
      console.log("🚀 ~ handleNewMessage ~ newSetting:", newSetting);
      if (newSetting) {
        const type = newSetting.action;
        if (type === "create") {
          if (newSetting.data.parent_id) {
            setComments((prev) =>
              addCommentToNestedList(
                prev,
                newSetting.data.parent_id,
                newSetting.data
              )
            );
          } else {
            setComments((prev) => [newSetting.data, ...prev]);
          }
        }
        if (type === "update") {
          if (newSetting.data.parent_id) {
            // Cập nhật nếu comment có parent_id (là comment con)
            setComments((prev) =>
              updateCommentToNestedList(
                prev,
                newSetting.data.id,
                newSetting.data
              )
            );
          } else {
            // Cập nhật nếu comment là comment gốc
            setComments((prev) =>
              prev.map((comment) =>
                comment.id === newSetting.data.id
                  ? {
                      ...comment,
                      ...newSetting.data, // Cập nhật dữ liệu
                      children: comment.children, // Giữ nguyên children
                    }
                  : comment
              )
            );
          }
        }

        if (type === "delete") {
          if (newSetting.data.comment_id) {
            setComments((prev) =>
              deleteCommentFromNestedList(prev, newSetting.data.comment_id)
            );
          }
        }
      }
    };

    channel.subscribe("post_comment_event", handleNewMessage);

    return () => {
      channel.unsubscribe("post_comment_event", handleNewMessage);
    };
  }, []);

  const commentsFilter = useMemo(() => {

    const filterComments = (comments: Comment[]): Comment[] => {
      return comments
        .map((comment) => ({
          ...comment,
          // Đệ quy để lọc children trước
          children: filterComments(comment.children || []),
        }))
        .filter(
          (comment) =>
            comment.deleted_at === null || comment.children.length > 0 // Giữ lại comment nếu chưa bị xóa hoặc có children
        );
    };

    return filterComments(comments);
  }, [comments]);
  return (
    <>
      <CreateComment
        post_id={blogDetail.id}
        slug={blogDetail.slug}
        toggleExpand={toggleExpand}
      />
      <div className="grid grid-cols-1 relative mt-6">
        {commentsFilter?.map((comment) => (
          <CommentItem
            slug={blogDetail.slug}
            postId={blogDetail.id}
            key={comment.id}
            comment={comment}
            expandedComments={expandedComments}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>
    </>
  );
};
