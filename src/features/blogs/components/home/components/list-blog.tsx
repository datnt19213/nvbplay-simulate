import { BlogCard } from "./blog-card";
import { Post } from "@/hooks/queries/ghost/type";
import { getAblyChannel } from "@/utilities/ably";
import { useEffect, useState } from "react";

export const ListBlog = ({ contents }: { contents: Post[] }) => {
  const [post, setPost] = useState<Post[]>(contents);

  useEffect(() => {
    const channel = getAblyChannel("post_reaction_event");

    const handleNewMessage = (message: any) => {
      const newSetting: {
        post_id: string;
        total_reaction: number;
      } = message.data;
      console.log("🚀 ~ handleNewMessage ~ newSetting:", newSetting);
      if (newSetting) {
        setPost((prev) =>
          prev.map((blog) =>
            blog.id === newSetting.post_id
              ? { ...blog, total_reactions: newSetting.total_reaction }
              : blog
          )
        );
      }
    };

    channel.subscribe("post_reaction_event", handleNewMessage);

    return () => {
      channel.unsubscribe("post_reaction_event", handleNewMessage);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2">
      {post?.map((blog, index) => <BlogCard blog={blog} key={index} />)}
    </div>
  );
};
