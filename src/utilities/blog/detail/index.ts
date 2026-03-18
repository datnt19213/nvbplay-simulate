import { BlogDetail } from "@/services/blog/type";

export const blogUtils = {
  // Extract basic blog information
  getBasicInfo: (blog: BlogDetail) => {
    return {
      id: blog?.entry?.id,
      status: blog?.entry?.status,
      name: blog?.entry?.name,
      slug: blog?.entry?.slug,
      createdAt: blog?.entry?.created_at,
      totalComments: blog?.entry?.total_comments,
      totalReactions: blog?.entry?.total_reactions,
    };
  },
  // Get content by schema name
  getContentBySchema: (blog: BlogDetail, schemaName: string) => {
    return (
      blog?.entry?.content_data?.find(
        (content) => content?.schema_name === schemaName
      )?.value || ""
    );
  },
  // Get thumbnail URL (returns first image from thumbnail array)
  getThumbnail: (blog: BlogDetail) => {
    const thumbnailStr =
      blog?.entry?.content_data?.find(
        (content) => content?.schema_slug === "thumbnail"
      )?.value || "[]";
    const thumbnails = JSON.parse(thumbnailStr);
    return thumbnails[0] || "";
  },
  // Get all categories
  getCategories: (blog: BlogDetail) => {
    return (
      blog?.entry?.taxonomies
        ?.find((tax) => tax?.slug === "categories")
        ?.terms.map((term) => ({
          name: term?.name,
          slug: term?.slug,
        })) || []
    );
  },
  // Get author information
  getAuthor: (blog: BlogDetail) => {
    const userMetaStr =
      blog?.entry?.meta_data?.find((meta) => meta?.meta_key === "user")
        ?.meta_value || "{}";
    return JSON.parse(userMetaStr);
  },
  // Extract all images from content
  getContentImages: (blog: BlogDetail) => {
    const content =
      blog?.entry?.content_data?.find(
        (content) => content?.schema_slug === "description"
      )?.value || "";

    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const images: string[] = [];
    let match;

    while ((match = imgRegex.exec(content)) !== null) {
      images.push(match[1]);
    }

    return images;
  },
};
