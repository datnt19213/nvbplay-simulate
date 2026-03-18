import React from "react";

export const BlogDetailContent = ({ content }: { content: string }) => {
  return (
    <div
      className="prose lg:prose-xl"
      dangerouslySetInnerHTML={{
        __html: content || "",
      }}
    />
  );
};
