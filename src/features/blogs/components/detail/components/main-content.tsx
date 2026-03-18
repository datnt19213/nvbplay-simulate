import { BlogDetail } from "@/services/blog/type";
import { blogUtils } from "@/utilities/blog/detail";
import { HotBlog } from "../../home/components/hot-blog";
import { PromotionSide } from "../../home/components/promotion/promotion-side";
import { BlogDetailContent } from "./content";
import { GroupFooterComment } from "./group-footer-comment";
import { BlogDetailHeader } from "./header";
import { MoreBlog } from "./more-blog";
import { Navigation } from "./navigation";
import { Post } from "@/hooks/queries/ghost/type";

export const MainContent = ({ blogDetail }: { blogDetail: Post }) => {
  const data = {
    basicInfo: {
      id: blogDetail.id,
      status: blogDetail.status,
      name: blogDetail.title,
      slug: blogDetail.slug,
      createdAt: blogDetail.created_at,
      totalComments: blogDetail.total_comments,
      totalReactions: blogDetail.total_reactions,
    },
    author: {
      name: blogDetail.authors.name,
      avatar: blogDetail.authors.profile_image || "",
    },
    thumbnail: blogDetail.feature_image || "",
  };
  return (
    <>
      <Navigation />

      <div className="grid grid-cols-12 gap-8">
        {/* Left side */}
        <div className="col-span-12 md:col-span-8">
          <div className="bg-white rounded-lg py-4 px-4">
            <BlogDetailHeader
              basicInfo={data.basicInfo}
              author={data.author}
              thumbnail={data.thumbnail}
            />
            <article className="my-4">
              <BlogDetailContent content={blogDetail?.html || ""} />
            </article>

            {/* Footer & Comment */}
            <GroupFooterComment blogDetail={blogDetail} />
          </div>
          {/* <div className="my-8">
            <MoreBlog blogDetail={blogDetail} />
          </div> */}

          {/* <div className="bg-white rounded-lg !py-4 px-6 ">
            <HotBlog />
          </div> */}
        </div>

        {/* Right side */}
        <div className="hidden md:block col-span-12 md:col-span-4">
          <PromotionSide />
        </div>
      </div>
    </>
  );
};
