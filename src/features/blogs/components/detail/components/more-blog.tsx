import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGhostPosts } from "@/hooks/queries/ghost";
import { Post } from "@/hooks/queries/ghost/type";
import { BlogDetail } from "@/services/blog/type";
import { formatDate } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

export const MoreBlog = ({ blogDetail }: { blogDetail: Post }) => {
  const { data, isLoading } = useGhostPosts();
  const posts = useMemo(() => {
    return data?.filter((post: Post) => post.slug !== blogDetail?.slug);
  }, [data, blogDetail]);

  const items = posts?.map((post: Post) => {
    return (
      <CarouselItem
        key={post.slug}
        className="basis-full md:basis-1/2 desktop:basis-1/3 select-none"
      >
        <Link
          href={`/blogs/${post.slug}`}
          className="flex flex-col gap-2 group"
        >
          <div className="relative w-full h-full min-h-40 rounded-lg overflow-hidden">
            <Image
              src={post.feature_image || ""}
              alt={post.title}
              fill
              loading="lazy"
              className="object-contain"
            />
          </div>
          <h3 className="text-base font-bold group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">{post.plaintext}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Bởi <span className="font-bold">{post.authors.name}</span>
            </span>
            <span>-</span>
            <span className="text-sm text-gray-500">
              {formatDate(post.published_at, "dd/MM/yyyy")}
            </span>
          </div>
        </Link>
      </CarouselItem>
    );
  });
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-bold uppercase">Bài viết liên quan</h2>
      <Carousel
        opts={{
          dragFree: true,
          align: "start",
        }}
      >
        <CarouselContent>{items}</CarouselContent>
      </Carousel>
    </div>
  );
};
