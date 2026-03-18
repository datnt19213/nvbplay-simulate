// "use server";

import { notFound } from "next/navigation";
import { Categories, Category } from "./type";
    import { Content, IBlog } from "../type";
import { GlobalKeys } from "@/services/globals";
import { getGlobalKey } from "@/services/globals";
import { SettingsService } from "@/services/settings";

export const preLoadFetchAllCategory = () => {
  void fetchAllCategory();
};

export const fetchAllCategory = async (): Promise<Category[] | null> => {
  try {
    await SettingsService.getInstance().initializeServer();
    const blogApiUrl = getGlobalKey(GlobalKeys.BLOG_API_URL);
    const user_id = getGlobalKey(GlobalKeys.USER_ID);
    const channel_id = getGlobalKey(GlobalKeys.CHANNEL_ID);
    const content_model_id = getGlobalKey(GlobalKeys.CONTENT_MODEL_ID);
    const res = await fetch(`${blogApiUrl}/entries/categories/detail`, {
      headers: {
        user_id: user_id || "58",
        channel_id: channel_id || "73",
        content_model_id: content_model_id || "100",
        "ngrok-skip-browser-warning": "true",
      },
      next: {
        revalidate: 60,
      },
    });

    const listCategory: Categories = await res.json();

    if (!listCategory) {
      notFound();
    }

    return listCategory.data as Category[];
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};

export const preloadGetListArticleByCategory = (category: string) => {
  void fetchAllBlogByCategory(category);
};

export const fetchAllBlogByCategory = async (
  category: string
): Promise<Content[] | null> => {
  await SettingsService.getInstance().initializeServer();
  const blogApiUrl = getGlobalKey(GlobalKeys.BLOG_API_URL);
  const user_id = getGlobalKey(GlobalKeys.USER_ID);
  const channel_id = getGlobalKey(GlobalKeys.CHANNEL_ID);
  const content_model_id = getGlobalKey(GlobalKeys.CONTENT_MODEL_ID);
  try {
    const res = await fetch(`${blogApiUrl}/entries/data/list/content`, {
      headers: {
        user_id: user_id || "58",
        channel_id: channel_id || "73",
        content_model_id: content_model_id || "100",
        category: category,
        "ngrok-skip-browser-warning": "true",
      },
      next: {
        revalidate: 60,
      },
    });

    const listArticle: IBlog = await res.json();

    if (!listArticle || !listArticle) {
      notFound();
    }

    return listArticle.contents as Content[];
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};
