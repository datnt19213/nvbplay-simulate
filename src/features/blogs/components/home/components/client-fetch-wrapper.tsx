"use client";

import { fetchAllBlogData } from "@/services/blog/api";
import { IBlog } from "@/services/blog/type";
import { RootState } from "@/stores";
import { getAnonymousId } from "@/utilities/cookies";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const anonymousId = getAnonymousId();
export const ClientFetchWrapper = ({
  children,
}: {
  children: (data: any, loading: boolean) => React.ReactNode;
}) => {
  const { user } = useSelector((state: RootState) => state.users_data);
  const [data, setData] = useState<IBlog | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchAllBlogData(
        user?.id || anonymousId || String(Date.now())
      );

      setData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [user, anonymousId]);

  return <div>{children(data, isLoading)}</div>;
};
