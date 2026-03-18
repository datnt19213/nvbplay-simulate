"use client";

import { Content } from "@/services/blog/type";
import { notFound } from "next/navigation";
import { AdvertisingSecion } from "../../home/components/advertising";
// import { Deal } from "../../home/components/deal";
import Heading from "@/components/base-components/typography/heading";
import { fetchAllBlogData } from "@/services/blog/api";
import { RootState } from "@/stores";
import { getAnonymousId } from "@/utilities/cookies";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BlogCardSkeleton } from "../../home/components/blog-card-skeleton";
import { HotBlog } from "../../home/components/hot-blog";
import { ListBlog } from "../../home/components/list-blog";
import { PopularTag } from "../../home/components/promotion/popular-tag";
import { Promotion } from "../../home/components/promotion/promotion";
import { PromotionSide } from "../../home/components/promotion/promotion-side";
import { SingleImage } from "../../home/components/single-image";
import { YoutubeSection } from "../../home/components/youtube";

export const getAllBlogsByCategory = (data: Content[], slug: string) => {
  try {
    const filteredData = data?.filter((item) => {
      return item.taxonomies?.some(
        (taxonomy) =>
          taxonomy.name === "categories" &&
          taxonomy.terms?.some((term) => term.slug === slug)
      );
    });

    return filteredData;
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    return [];
  }
};

const anonymousId = getAnonymousId();

export const MainContent = ({ slug }: { slug: string }) => {
  const { user } = useSelector((state: RootState) => state.users_data);
  const [filteredData, setFilteredData] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchAllBlogData(
        user?.id || anonymousId || String(Date.now())
      );

      const filteredData = getAllBlogsByCategory(data?.contents || [], slug);
      setFilteredData(filteredData);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (!filteredData) {
    notFound();
  }

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
              {filteredData?.length === 0 ? (
                <div className="my-10">
                  <div className="flex justify-center items-center">
                    <Heading className="text-center mx-auto">
                      Không tìm thấy bài viết nào
                    </Heading>
                  </div>
                </div>
              ) : (
                <>
                  {/* {filteredData && (
                    <ListBlog contents={filteredData.slice(0, 3)} />
                  )} */}

                  <div className="block md:hidden">
                    <PopularTag />
                  </div>

                  <div className="my-10">
                    <HotBlog />
                  </div>

                  {/* {filteredData && (
                    <ListBlog contents={filteredData.slice(3, 6)} />
                  )} */}
                  {/* <div
  className={"relative flex flex-col rounded-lg bg-[#020203] my-10"}
>
  <Deal />
</div> */}
                  {/* {filteredData && (
                    <ListBlog contents={filteredData.slice(6, 9)} />
                  )} */}

                  <div className="block md:hidden">
                    <Promotion />
                  </div>

                  <div className="my-10">
                    <AdvertisingSecion />
                  </div>
                  <div className="my-10">
                    <YoutubeSection />
                  </div>
                  {/* {filteredData && (
                    <ListBlog
                      contents={filteredData.slice(9, filteredData.length)}
                    />
                  )} */}
                  <div className="my-10">
                    <SingleImage />
                  </div>
                </>
              )}
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
