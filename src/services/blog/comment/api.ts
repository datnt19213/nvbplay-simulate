// "use server";

import { getGlobalKey } from "@/services/globals";
import { GlobalKeys } from "@/services/globals";
import { CommentRequest } from "./type";
import { SettingsService } from "@/services/settings";

export const createComment = async (payload: CommentRequest): Promise<any> => {
  await SettingsService.getInstance().initializeServer();
  const blogApiUrl = getGlobalKey(GlobalKeys.BLOG_API_URL);
  try {
    const res = await fetch(`${blogApiUrl}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res) {
      return null;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create comment");
  }
};

export const updateComment = async (
  id: string,
  payload: { content: string }
) => {
  try {
    await SettingsService.getInstance().initializeServer();
    const blogApiUrl = getGlobalKey(GlobalKeys.BLOG_API_URL);
    const res = await fetch(`${blogApiUrl}/comments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update comment with id: " + id);
    }

    return await res.json();
  } catch (error) {
    console.log(`Update comment fail with error: ${error}`);
  }
};

export const deleteComment = async (id: string) => {
  try {
    await SettingsService.getInstance().initializeServer();
    const blogApiUrl = getGlobalKey(GlobalKeys.BLOG_API_URL);
    const res = await fetch(`${blogApiUrl}/comments/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete comment with id: " + id);
    }
  } catch (error) {
    console.log(`Delete comment fail with error: ${error}`);
  }
};
