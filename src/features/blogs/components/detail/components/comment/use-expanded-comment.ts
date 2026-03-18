import { useState, useCallback } from "react";

export const useExpandedComments = () => {
  const [expandedComments, setExpandedComments] = useState<
    Map<string, boolean>
  >(new Map());

  const toggleExpand = useCallback((commentId: string) => {
    setExpandedComments((prevExpandedComments) => {
      const newExpandedComments = new Map(prevExpandedComments);
      const currentState = newExpandedComments.get(commentId) || false; // Đặt giá trị mặc định là false nếu không tồn tại
      newExpandedComments.set(commentId, !currentState); // Đảo ngược trạng thái

      return newExpandedComments;
    });
  }, []);

  return {
    expandedComments,
    toggleExpand,
  };
};
