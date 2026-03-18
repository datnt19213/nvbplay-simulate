import { Content } from "@/services/blog/type";

interface ParsedBlogData {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnails: string[];
  author: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
  category: string;
  createdAt: string;
}

export const parseBlogData = (data: Content): ParsedBlogData => {
  const thumbnailData = data.content_data.find(
    (item) => item.schema_slug === "thumbnail"
  );
  let thumbnails: string[] = [];

  if (thumbnailData?.value) {
    try {
      // Remove any extra quotes that might be causing JSON parse issues
      const cleanValue = thumbnailData.value.replace(/^"|"$/g, "");
      thumbnails = JSON.parse(cleanValue);
    } catch (error) {
      console.error("Error parsing thumbnails:", error);
      // If parsing fails, check if it's a single URL string
      if (typeof thumbnailData.value === "string") {
        thumbnails = [thumbnailData.value];
      }
    }
  }

  // Parse description - remove HTML tags
  const descriptionData = data.content_data.find(
    (item) => item.schema_slug === "description"
  );
  const description = descriptionData
    ? descriptionData.value.replace(/<[^>]*>/g, "")
    : "";
  // Parse author data
  const userData = data.meta_data.find((item) => item.meta_key === "user");
  const user = userData ? JSON.parse(userData.meta_value) : {};
  // Get first category if exists
  const category =
    data.taxonomies.find((tax) => tax.slug === "categories")?.terms[0]?.name ||
    "";
  return {
    id: data.id,
    title: data.name,
    slug: data.slug,
    description,
    thumbnails,
    author: {
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      avatar: user.avatar || "",
    },
    category,
    createdAt: data.created_at,
  };
};
