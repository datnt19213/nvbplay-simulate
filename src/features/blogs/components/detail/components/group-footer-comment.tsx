import { ListComment } from "./comment/list-comment";
import { BlogDetailFooter } from "./footer";
import { Post } from "@/hooks/queries/ghost/type";

export const GroupFooterComment = ({ blogDetail }: { blogDetail: Post }) => {
    
  return (
    <div>
      <BlogDetailFooter blogDetail={blogDetail} />
      <div className="mt-4">
        <ListComment blogDetail={blogDetail} />
      </div>
    </div>
  );
};
