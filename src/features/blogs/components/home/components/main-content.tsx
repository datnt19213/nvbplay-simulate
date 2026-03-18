"use client";

import dynamic from "next/dynamic";
// import { Deal } from "./deal";
import { useEffect, useMemo, useState } from "react";
import { BlogCardSkeleton } from "./blog-card-skeleton";
import { ListBlog } from "./list-blog";
import { PromotionSide } from "./promotion/promotion-side";
import { useGhostPosts } from "@/hooks/queries/ghost";
import EmptyItem from "@/components/base-components/cta/empty-item";
import { PageNotFound } from "@/assets/images";
import { translate } from "@/utilities/translator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const PopularTag = dynamic(() =>
  import("./promotion/popular-tag").then((mob) => mob.PopularTag)
);

const Promotion = dynamic(() =>
  import("./promotion/promotion").then((mob) => mob.Promotion)
);

export const MainContent = () => {
  const {
    data,
    isLoading,
    handleNext,
    handlePrevious,
    totalPages,
    handlePage,
    isLastPage,
    currentPage,
  } = useGhostPosts();

  const visiblePages = useMemo(() => {
    const delta = 2;
    const range: number[] = [];

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages || 0, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 1) {
      if (range[0] > 2) {
        range.unshift(-1);
      }
      range.unshift(1);
    }

    if (range[range.length - 1] < (totalPages || 0)) {
      if (range[range.length - 1] < (totalPages || 0) - 1) {
        range.push(-1);
      }
      range.push(totalPages || 0);
    }

    return range;
  }, [currentPage, totalPages]);
  


  return (
    <div className="container mt-10">
      <div className="grid grid-cols-12 gap-8">
        {/* Left side */}
        <div className="col-span-12 md:col-span-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-8">
              {Array(6)
                ?.fill(1)
                ?.map((_, index) => <BlogCardSkeleton key={index} />)}
            </div>
          ) : (
            <>
              {!data || data.length === 0 ? (
                <div className="h-[500px] flex justify-center items-center">
                  <EmptyItem
                    image={PageNotFound.src}
                    isNavigable
                    navigateUrl="/blogs"
                    onClick={() => {
                      handlePage(1);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    titleClass="font-[800] text-[20px] text-txtfifth desktop:text-[32px] w-full max-w-[491px] text-center"
                    subTitle={translate(
                      "the_page_you_are_looking_for_does_not_exist_or_has_been_moved_please_try_again_or_return_to_the_homepage"
                    )}
                    subTitleClass="font-medium text-sm text-gray-icon w-full max-w-[491px] text-center"
                    buttonTitle={"Quay lại"}
                    title={translate("oops_page_not_found")}
                  />
                </div>
              ) : (
                <>
                  {data && <ListBlog contents={data} />}
                  {data && data.length > 0 && (
                    <div className="flex justify-center items-center gap-2 my-10">
                      <Pagination>
                        <PaginationContent>
                          {currentPage > 1 && (
                            <PaginationItem>
                              <PaginationPrevious
                                text="Trước"
                                href={`/blogs?page=${currentPage - 1}`}
                                className={cn(
                                  currentPage === 1
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                )}
                                onClick={() => {
                                  if (currentPage > 1) {
                                    handlePrevious();
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }
                                }}
                              />
                            </PaginationItem>
                          )}
                          {visiblePages.map((page, index) => (
                            <PaginationItem key={index}>
                              {page === -1 ? (
                                <PaginationEllipsis />
                              ) : (
                                <PaginationLink
                                  className={cn(
                                    page === currentPage
                                      ? "font-bold rounded-full bg-primary text-white hover:bg-primary/90 hover:text-white"
                                      : "cursor-pointer"
                                  )}
                                  onClick={() => {
                                    if (page !== currentPage) {
                                      handlePage(page);
                                      window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                      });
                                    }
                                  }}
                                  href={`/blogs?page=${page}`}
                                  isActive={page === currentPage}
                                >
                                  {page}
                                </PaginationLink>
                              )}
                            </PaginationItem>
                          ))}
                          {currentPage < (totalPages || 0) && (
                            <PaginationItem>
                              <PaginationNext
                                text="Tiếp"
                                href={`/blogs?page=${currentPage + 1}`}
                                className={cn(
                                  isLastPage
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                )}
                                onClick={() => {
                                  if (!isLastPage) {
                                    handleNext();
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }
                                }}
                              />
                            </PaginationItem>
                          )}
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
              <div className="block md:hidden">
                <PopularTag />
              </div>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="hidden md:block col-span-12 md:col-span-4">
          <PromotionSide />
        </div>
      </div>
    </div>
  );
};
