import React, { createContext, useContext, useState } from "react";

const ExpandedCommentsContext = createContext<{
  expandedComments: Set<string>;
  toggleExpand: (commentId: string) => void;
}>({
  expandedComments: new Set(),
  toggleExpand: () => {},
});

export const ExpandedCommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  const toggleExpand = (commentId: string) => {
    setExpandedComments((prev) => new Set([...prev, commentId]));
  };

  return <ExpandedCommentsContext.Provider value={{ expandedComments, toggleExpand }}>{children}</ExpandedCommentsContext.Provider>;
};

export const useExpandedComments = () => useContext(ExpandedCommentsContext);