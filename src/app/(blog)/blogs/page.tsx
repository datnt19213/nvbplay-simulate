import BlogsFeatures from "@/features/blogs";
import { Metadata, ResolvingMetadata } from "next";
type Props = {};
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title, description, openGraph } = await parent;

  return {
    title: `Bảng tin NVBPlay - Khám phá các sản phẩm và nội dung mới nhất của NVBPlay`,
    description: `Khám phá các sản phẩm và nội dung mới nhất của NVBPlay`,
    openGraph: {
      images: [...(openGraph?.images || [])],
      title: title || "Khám phá các sản phẩm và nội",
      description:
        description || "Khám phá các sản phẩm và nội dung mới nhất của NVBPlay",
      url: `/blog`,
      locale: "en-US",
      siteName:
        "NVP Play Feed - Khám phá các sản phẩm và nội dung mới nhất của NVBPlay",
      type: "article",
    },
    alternates: {
      canonical: `/blog`,
    },
    twitter: {
      title: `NVBPlay Feed - Khám phá các sản phẩm và nội dung mới nhất của NVBPlay`,
      description: "Khám phá các sản phẩm và nội dung mới nhất của NVBPlay",
      images: [...(openGraph?.images || [])],
      card: "summary_large_image",
    },
  };
}

const BlogsPage = () => {
  return <BlogsFeatures />;
};

export default BlogsPage;
