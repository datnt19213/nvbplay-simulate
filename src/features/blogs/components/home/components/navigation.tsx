import { fetchAllCategory } from "@/services/blog/category/api";
import { NavigationItem } from "./navigation-item";
import { useEffect } from "react";
import { Category } from "@/services/blog/category/type";
import { useState } from "react";

export const HomeNavigation = async () => {
  const listCategory = await fetchAllCategory();

  return (
    <div className="mt-6 mb-10 w-full flex justify-start items-center gap-3 overflow-x-scroll scrollbar-none">
      <NavigationItem nav={null} showAll={true} />
      {listCategory &&
        listCategory?.map((nav) => (
          <NavigationItem nav={nav} showAll={false} key={nav.slug} />
        ))}
    </div>
  );
};
