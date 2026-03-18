"use server";

import { ISetting } from "@/types/settings";

export const getSettings = async (): Promise<ISetting> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const isLocalMock = apiUrl.includes("localhost:3000/api/mock");
  const isServer = typeof window === "undefined";

  if (isLocalMock && isServer) {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const dbPath = path.join(process.cwd(), "src/mocks/db.json");
      const dbData = fs.readFileSync(dbPath, "utf-8");
      const db = JSON.parse(dbData);
      return {
        data: {
          data: db.settings,
          result: "success",
          message: "Mock settings returned from file",
        },
        status: 200,
        headers: {} as any,
      };
    } catch (error) {
      console.error("Failed to read mock settings from file:", error);
    }
  }

  const settings = await fetch(`${apiUrl}/store/settings/group?type=cms`, {
    next: {
      revalidate: 60 * 60 * 5,
    },
  });
  const data = await settings.json();
  return data;
};
