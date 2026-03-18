import { Logo } from "@/assets/images";
import Image from "@/components/base-components/images/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReaction } from "@/hooks/queries/ghost/reaction";
import { Post } from "@/hooks/queries/ghost/type";
import useDebouncedAction from "@/hooks/use-debounce-action";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { convertStringToDate } from "@/utilities/date";
import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale";
import { Heart, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export const BlogCard = ({ blog }: { blog: Post }) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.users_data.user);
  const { createReaction, deleteReaction } = useReaction();
  const [isReaction, setIsReaction] = useState(blog?.is_reactions);
  const [totalReaction, setTotalReaction] = useState(blog?.total_reactions);

  useEffect(() => {
    setTotalReaction(blog?.total_reactions);
  }, [blog]);

  const handleReaction = async (newValue: boolean) => {
    if (newValue) {
      await createReaction.mutateAsync({
        post_id: blog?.id,
        user_id: user?.id,
      });
    } else {
      await deleteReaction.mutateAsync({
        post_id: blog?.id,
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
      router.push(`/auth?redirect=blogs`);
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
    <div className="border border-neutral-200 overflow-hidden rounded-lg !p-0">
      {/* Header */}
      <div className="flex items-center justify-start p-2 gap-3 bg-white">
        <div className="rounded-full overflow-hidden border border-neutral-100">
          <Avatar>
            <AvatarImage src={blog?.authors?.profile_image || Logo.src} />
            <AvatarFallback className="uppercase font-bold bg-primary/20 text-primary">
              {blog?.authors?.name?.charAt(0) || "N"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-0">
          <p className="text-sm font-semibold text-neutral-900 capitalize">
            {blog?.authors.name || ""}
          </p>
          <p className="text-[0.75rem] text-[#A6A6B0] font-medium">
            {/* You can add a date formatter here */}
            {formatDistanceToNowStrict(
              convertStringToDate(blog.created_at) || new Date(),
              {
                addSuffix: true,
                locale: vi,
              }
            )}
          </p>
        </div>
      </div>

      {/* Images */}
      <Link href={`/blogs/${blog?.slug || ""}`}>
        <Image
          src={blog?.feature_image || ""}
          alt={blog?.title || ""}
          width={300}
          height={300}
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col justify-start items-start gap-3 py-2 px-6 bg-white">
        <Link href={`/blogs/${blog?.slug || ""}`}>
          <p className="text-sm font-semibold text-neutral-900">
            {blog?.title || ""}
          </p>
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html: blog?.plaintext?.slice(0, 200) || "",
          }}
          className="text-base md:text-sm font-medium hidden md:block text-neutral-500 overflow-hidden text-ellipsis line-clamp-2"
        />
        <div className="flex flex-wrap gap-2">
          {blog?.tags?.slice(0, 5).map((tag, index) => (
            <Badge
              key={index}
              variant={"secondary"}
              className="text-[10px] md:text-xs font-medium capitalize text-gray-600 rounded cursor-pointer hover:text-primary"
            >
              #{tag || ""}
            </Badge>
          ))}
        </div>
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#db2f41] p-1 aspect-square rounded-full overflow-hidden flex items-center justify-center">
              <Heart className="size-4 mt-0.5 text-white fill-white" />
            </div>
            <span className="text-sm font-medium text-neutral-500">
              {totalReaction}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 cursor-pointer">
              <MessageSquareText className="size-4 font-medium text-neutral-500" />
              <span className="text-sm font-medium text-neutral-500 -mt-[2px]">
                {blog?.total_comments}
              </span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
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
              <span className="text-sm font-medium text-neutral-500">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button control */}
      <div className="w-full px-4 py-2 bg-white">
        <div className="w-full flex justify-center items-center gap-2">
          <Button
            variant={"default"}
            onClick={handleChangeReaction}
            disabled={createReaction.isPending || deleteReaction.isPending}
            className={cn(
              "w-full flex items-center gap-2 bg-[#F5F5FA] hover:bg-[#e6e6f8] disabled:opacity-90",
              isReaction && "text-red-700 hover:text-red-700"
            )}
          >
            <Heart
              className={cn(
                "size-4 font-medium text-neutral-500",
                isReaction
                  ? "fill-red-700 text-red-700 animate-jump"
                  : "text-neutral-500"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium text-neutral-500",
                isReaction ? "text-red-700" : "text-neutral-500"
              )}
            >
              Thích
            </span>
          </Button>

          <Link
            className="w-full"
            href={`/blogs/${blog?.slug || ""}?showComment=true`}
          >
            <Button
              variant={"default"}
              className="w-full flex items-center gap-2 bg-[#F5F5FA] hover:bg-[#e6e6f8]"
            >
              <MessageSquareText className="size-4 font-medium text-neutral-500" />
              <span className="text-sm font-medium text-neutral-500">
                Bình luận
              </span>
            </Button>
          </Link>
          <Link className="w-fit md:w-full" href={`/blogs/${blog?.slug || ""}`}>
            <Button
              variant={"default"}
              className="w-fit md:w-full flex items-center gap-2 bg-[#F5F5FA] hover:bg-[#e6e6f8]"
            >
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
              <span className="text-sm font-medium text-neutral-500 hidden md:block">
                Chia sẻ
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
