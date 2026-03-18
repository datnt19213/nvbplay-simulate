// "use server";

import { GlobalKeys } from "@/services/globals";
import { getGlobalKey } from "@/services/globals";
import { ICreateReaction, ReactionResponse } from "./type";
import { SettingsService } from "@/services/settings";

export const getListReaction = async (): Promise<any> => {
  await SettingsService.getInstance().initializeServer();
  const blogApiUrl = getGlobalKey(GlobalKeys.BLOG_API_URL);
  try {
    const res = await fetch(`${blogApiUrl}/reactions`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch reactions");
    }

    const listReaction: ReactionResponse = await res.json();

    if (!listReaction || !listReaction.data) {
      return [];
    }

    let result: any[] = [];

    for (const reaction of listReaction?.data || []) {
      const data = await fetch(reaction.emoji);
      const emoji = await data.json();

      result.push({
        id: reaction.id,
        type: reaction.type,
        reaction: emoji,
      });
    }

    return result;
  } catch (error) {
    console.error("Error fetching reactions:", error);
    return [];
  }
};

export const createReaction = async (payload: ICreateReaction) => {
  await SettingsService.getInstance().initializeServer();
  const blogApiUrl = getGlobalKey(GlobalKeys.BLOG_API_URL);
  try {
    const res = await fetch(`${blogApiUrl}/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error create reaction:", error);
    return null;
  }
};

export const deleteReaction = async (id: string) => {
  try {
    await SettingsService.getInstance().initializeServer();
    const blogApiUrl = getGlobalKey(GlobalKeys.BLOG_API_URL);
    const res = await fetch(`${blogApiUrl}/reactions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Error delete reaction");
      return null;
    }
  } catch (error) {
    console.error("Error delete reaction:", error);
    return null;
  }
};
