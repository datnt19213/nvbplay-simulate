// "use server";

import { BLOG_API_URL, CHANNEL_ID, CONTENT_MODEL_ID, USER_ID } from "@/configs";
import { notFound } from "next/navigation";
import { BlogDetail, IBlog } from "./type";
import { GlobalKeys } from "../globals";
import { getGlobalKey } from "../globals";
import { SettingsService } from "../settings";

export const preloadBlogFetchAllData = (userId: string) => {
  void fetchAllBlogData(userId);
};

export const fetchAllBlogData = async (
  userId: string
): Promise<IBlog | null> => {
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
        guest_id: userId,
        "ngrok-skip-browser-warning": "false",
      },
      next: { revalidate: 5 },
    });

    if (!res) {
      return null;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const preloadBlogDetailData = (slug: string) => {
  void fetchBlogDetailData(slug);
};

export const fetchBlogDetailData = async (
  slug: string
): Promise<BlogDetail | null> => {
  await SettingsService.getInstance().initializeServer();
  const blogApiUrl = getGlobalKey(GlobalKeys.BLOG_API_URL);
  const user_id = getGlobalKey(GlobalKeys.USER_ID);
  const channel_id = getGlobalKey(GlobalKeys.CHANNEL_ID);
  const content_model_id = getGlobalKey(GlobalKeys.CONTENT_MODEL_ID);
  try {
    const res = await fetch(`${blogApiUrl}/entries/data/detail/${slug}`, {
      headers: {
        user_id: user_id || "58",
        channel_id: channel_id || "73",
        content_model_id: content_model_id || "100",
        "ngrok-skip-browser-warning": "true",
      },
      // cache: "no-store",
      next: { revalidate: 5 },
    });

    if (!res.ok) {
      notFound();
    }

    const data = await res.json();

    if (data.statusCode === 500) {
      notFound();
    }

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
