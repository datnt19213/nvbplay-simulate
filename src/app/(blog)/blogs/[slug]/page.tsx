import { BlogDetailFeature } from "@/features/blogs/components/detail";
import { getGhostPostBySlug, getGhostPosts } from "@/services/ghost";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ResolvingMetadata } from "next";
import { Post } from "@/hooks/queries/ghost/type";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const article = await getGhostPostBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleTitle = article?.data?.data?.title;

  const { title, description, openGraph } = await parent;

  return {
    title:
      `${articleTitle} - Khám phá các sản phẩm và nội dung mới nhất của NVBPlay | NVB Play Blog` ||
      title,
    description: `${articleTitle}` || description,
    openGraph: {
      images: [...(openGraph?.images || [])],
      title:
        articleTitle ||
        "Khám phá các sản phẩm và nội dung mới nhất của NVBPlay | NVB Play Blog",
      description:
        articleTitle ||
        "Khám phá các sản phẩm và nội dung mới nhất của NVBPlay",
      url: `/${slug}`,
      locale: "en-US",
      siteName:
        "NVB Play Blog - Khám phá các sản phẩm và nội dung mới nhất của NVBPlay",
      type: "article",
    },
    alternates: {
      canonical: `/blogs/${article?.data?.data?.slug}`,
    },
    twitter: {
      title: `${articleTitle} - NVB Play Blog`,
      description: "Khám phá các sản phẩm và nội dung mới nhất của NVBPlay",
      images: [...(openGraph?.images || [])],
      card: "summary_large_image",
    },
  };
}

export async function generateStaticParams() {
  try {
    const articles = await getGhostPosts();

    if (!Array.isArray(articles)) {
      console.error("No articles found or invalid format.");
      return [];
    }

    return articles?.data?.data?.result
      ?.filter((article: Post) => article?.slug)
      .map((article: Post) => ({
        slug: article.slug,
      }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

const BlogDetailPage = async ({ params }: Props) => {
  const { slug } = await params;

  return <BlogDetailFeature slug={slug} />;
};

export default BlogDetailPage;
