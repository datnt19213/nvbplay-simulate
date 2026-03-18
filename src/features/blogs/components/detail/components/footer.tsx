"use client";

import {
  FacebookIcon,
  MessengerIcon,
  ZaloIcon,
  TelegramIcon,
  TwitterIcon,
} from "@/assets/icons";
import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import Image from "@/components/base-components/images/image";
import InputLabel from "@/components/base-components/input/input-label";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { useReaction } from "@/hooks/queries/ghost/reaction";
import { Post } from "@/hooks/queries/ghost/type";
import useDebouncedAction from "@/hooks/use-debounce-action";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { getAblyChannel } from "@/utilities/ably";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useCopyToClipboard } from "usehooks-ts";

export const BlogDetailFooter = ({ blogDetail }: { blogDetail: Post }) => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.users_data);
  const [isReaction, setIsReaction] = useState(blogDetail?.is_reactions);
  const [totalReaction, setTotalReaction] = useState(
    blogDetail?.total_reactions
  );

  const [totalComment, setTotalComment] = useState(blogDetail?.total_comments);

  const { createReaction, deleteReaction } = useReaction();

  useEffect(() => {
    const channel = getAblyChannel("post_reaction_event");

    const handleNewMessage = (message: any) => {
      const newSetting: { post_id: string; total_reaction: number } =
        message.data;
      if (newSetting?.post_id === blogDetail?.id) {
        setTotalReaction(newSetting.total_reaction);
      }
    };

    channel.subscribe("post_reaction_event", handleNewMessage);
    return () => {
      channel.unsubscribe("post_reaction_event", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    const channel = getAblyChannel("post_comment_event");
    const handleNewMessage = (message: any) => {
      const newSetting = message.data;
      if (newSetting) {
        const type = newSetting.action;
        if (type === "create") {
          setTotalComment((prev) => prev + 1);
        }
        if (type === "delete") {
          const total = newSetting.total;
          setTotalComment(total);
        }
      }
    };

    channel.subscribe("post_comment_event", handleNewMessage);
    return () => {
      channel.unsubscribe("post_comment_event", handleNewMessage);
    };
  }, []);

  const handleReaction = async (newValue: boolean) => {
    if (newValue) {
      await createReaction.mutateAsync({
        post_id: blogDetail?.id,
        user_id: user?.id,
      });
    } else {
      await deleteReaction.mutateAsync({
        post_id: blogDetail?.id,
        user_id: user?.id,
      });
    }
  };

  const { triggerAction } = useDebouncedAction({
    action: handleReaction,
    delay: 500, // Chờ 500ms trước khi gửi request
    onError: () => {
      // Nếu có lỗi, khôi phục trạng thái trước đó
      setTotalReaction((prev) => (isReaction ? prev - 1 : prev + 1));
      setIsReaction(!isReaction);
    },
  });

  const handleChangeReaction = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để tương tác bài viết");
      router.push(`/auth?redirect=blogs/${blogDetail?.slug}`);
      return;
    }

    const newValue = !isReaction;

    // Cập nhật trạng thái cục bộ ngay lập tức
    setTotalReaction((prev) => (newValue ? prev + 1 : prev - 1));
    setIsReaction(newValue);

    // Kích hoạt action với debounce
    triggerAction(newValue);
  };

  return (
    <div>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#db2f41] p-1 rounded-full overflow-hidden">
            <Image
              src="/images/blog/detail/heart.png"
              alt=""
              className="size-4"
            />
          </div>
          <span className="text-sm font-medium text-neutral-500">
            {totalReaction || 0}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-sm font-medium text-neutral-500 -mt-[.125rem]">
              {totalComment || 0} bình luận
            </span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-sm font-medium text-neutral-500">
              0 lượt Chia sẻ
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[.0625rem] bg-neutral-100 my-2" />

      <div className="w-full px-4 bg-white">
        <div className="w-full flex justify-center items-center gap-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center gap-2 select-none",
              isReaction && "text-red-700 hover:text-red-700"
            )}
            onClick={handleChangeReaction}
            disabled={createReaction.isPending || deleteReaction.isPending}
          >
            <Heart
              className={cn(
                "size-4 transition-all duration-300",
                isReaction
                  ? "fill-red-700 text-red-700 animate-jump"
                  : "fill-none text-neutral-500"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium transition-all duration-300",
                isReaction ? "text-red-700" : "text-neutral-500"
              )}
            >
              Thích
            </span>
          </Button>
          <ShareAction blogDetail={blogDetail} />
        </div>
      </div>

      <div className="w-full h-[.0625rem] bg-neutral-100 my-2" />
    </div>
  );
};

const ShareAction = ({ blogDetail }: { blogDetail: Post }) => {
    const postLink = window.location.href;
//   const postLink =
//     "https://staging-nvbplay-storefront.vercel.app" +
//     "/blogs/" +
//     blogDetail?.slug;

  const [open, setOpen] = useState(false);
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => {
    copy(postLink)
      .then(() => {
        console.log("Copied!", { text });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  const hashtag = "#NVBPlay";
  const appId = "87741124305";
  const sourceSurface = "external_reshare";
  const display = "popup";
  const link = encodeURIComponent(postLink);

  const socialShare = [
    {
      icon: FacebookIcon,
      name: "Facebook",
      url: `https://www.facebook.com/share_channel/?type=reshare&link=${link}&app_id=${appId}&source_surface=${sourceSurface}&display=${display}&hashtag=${hashtag}`,
    },
    {
      icon: MessengerIcon,
      name: "Messenger",
      url: `https://www.facebook.com/dialog/send?link=${link}&app_id=${appId}&redirect_uri=${encodeURIComponent(postLink)}`,
    },
    // {
    //   icon: ZaloIcon,
    //   name: "Zalo",
    //   url: `${/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? "https://zalo.me/" : "https://zalo.me/"}`,
    // },
    {
      icon: TelegramIcon,
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(postLink)}`,
    },
    {
      icon: TwitterIcon,
      name: "X (Twitter)",
      url: `https://x.com/intent/post?url=${encodeURIComponent(postLink)}&text=${encodeURIComponent(blogDetail?.title || "")}`,
    },
  ];

  return (
    <DialogResponsive
      open={open}
      setOpen={setOpen}
      trigger={
        <Button variant="ghost" className="w-full flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="size-4 font-medium text-neutral-500"
          >
            <path
              fill="currentColor"
              d="m236.24 107.76l-80-80A6 6 0 0 0 146 32v42.2c-54.48 3.59-120.39 55-127.93 120.66a10 10 0 0 0 17.23 8C46.56 190.85 87 152.6 146 150.13V192a6 6 0 0 0 10.24 4.24l80-80a6 6 0 0 0 0-8.48M158 177.52V144a6 6 0 0 0-6-6c-27.73 0-54.76 7.25-80.32 21.55a193.4 193.4 0 0 0-40.81 30.65c4.7-26.56 20.16-52 44-72.27C98.47 97.94 127.29 86 152 86a6 6 0 0 0 6-6V46.49L223.51 112Z"
            />
          </svg>
          <span className="text-sm font-medium text-neutral-500">Chia sẻ</span>
        </Button>
      }
    >
      <div className="flex flex-col h-full w-full">
        <DialogHeader className="px-4 py-3 border-b">
          <DialogTitle className="text-center">Chia sẻ bài viết</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 p-4 w-full h-full overflow-y-auto">
          <Image
            src={blogDetail?.feature_image ?? undefined}
            alt=""
            loading="lazy"
            className="w-full rounded overflow-hidden h-96"
          />
          <div className="flex items-end justify-center w-full gap-1.5">
            <InputLabel
              label="Link bài viết"
              sizes="small"
              readOnly
              className="w-full"
              placeholder={postLink}
            />
            <Button
              className="rounded h-11"
              onClick={() => handleCopy(postLink)}
            >
              {copiedText ? "Đã sao chép!" : "Sao chép"}
            </Button>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <h3 className="text-base font-medium text-neutral-800">Chia sẻ</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {socialShare.map((item, index) => (
                <div
                  onClick={() => window.open(item.url, "_blank")}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-3xl overflow-hidden hover:bg-neutral-100 cursor-pointer"
                  key={index}
                >
                  <div className="aspect-square size-10">
                    <img
                      src={item.icon.src}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm font-medium text-neutral-500">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-center">
          <Button
            variant="ghost"
            className="w-full border border-neutral-100 hover:bg-primary hover:text-white"
            onClick={() => setOpen(false)}
          >
            Đóng
          </Button>
        </div>
      </div>
    </DialogResponsive>
  );
};
