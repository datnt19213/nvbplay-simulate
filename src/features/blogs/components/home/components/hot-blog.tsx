"use client";

import Image from "@/components/base-components/images/image";
import { IBlog } from "@/services/blog/type";
import { getGlobalKey } from "@/services/globals";
import { GlobalKeys } from "@/services/globals";
import { RootState } from "@/stores";
import { parseBlogData } from "@/utilities/blog/parse-data";
import { getAnonymousId } from "@/utilities/cookies";
import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale";
import { DotIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const anonymousId = getAnonymousId();

export const HotBlog = () => {
  const { user } = useSelector((state: RootState) => state.users_data);
  const [data, setData] = useState<IBlog | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const blogApiUrl = getGlobalKey(GlobalKeys.BLOG_API_URL);
      const user_id = getGlobalKey(GlobalKeys.USER_ID);
      const channel_id = getGlobalKey(GlobalKeys.CHANNEL_ID);
      const content_model_id = getGlobalKey(GlobalKeys.CONTENT_MODEL_ID);
      const res = await fetch(`${blogApiUrl}/entries/data/list/content`, {
        headers: {
          user_id: user_id || "58",
          channel_id: channel_id || "73",
          content_model_id: content_model_id || "100",
          guest_id: user?.id || anonymousId || String(Date.now()),
          "ngrok-skip-browser-warning": "false",
        },
        cache: "no-store",
      });

      setData(await res.json());
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="flex items-center gap-2">
        <Image
          src="/images/blog/home/fire.png"
          alt="hot-blog-1"
          className="size-6"
        />
        <div className="flex flex-col gap-2 text-[#FF3F1A] text-xl font-semibold ">
          Bài viết nổi bật
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {data?.contents.slice(0, 6).map((blog, index) => {
          const parsedBlog = parseBlogData(blog);

          return (
            <div
              key={index}
              className="flex justify-start items-start gap-5 cursor-pointer"
            >
              <Link href={`/blog/${parsedBlog.slug}`}>
                <div className="text-[#A6A6B0] text-5xl font-bold">
                  #{index + 1}
                </div>
              </Link>
              <div className="flex flex-col gap-2">
                <Link href={`/blog/${parsedBlog.slug}`}>
                  <div className="text-lg leading-[1.5rem] font-semibold line-clamp-2">
                    {parsedBlog.title}
                  </div>
                </Link>
                <span className="text-sm text-[#A6A6B0] flex items-center gap-1">
                  <strong className="text-black">
                    {parsedBlog.author.firstName}
                  </strong>
                  <DotIcon className="size-6" />
                  <span>
                    {formatDistanceToNowStrict(new Date(parsedBlog.createdAt), {
                      addSuffix: true,
                      locale: vi,
                    })}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
