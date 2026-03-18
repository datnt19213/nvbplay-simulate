import { IBlogDetailResponse } from "./type";

import { getGhostPostBySlug } from "@/services/ghost";
import { RootState } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGhostPostDetail = (slug: string) => {
  const { user } = useSelector((state: RootState) => state.users_data);
  const params = {
    user_id: user?.id,
  };
  const { data, isLoading, error, ...rest } = useQuery<IBlogDetailResponse>({
    queryKey: ["ghost-post-detail", slug, user?.id],
    queryFn: () => getGhostPostBySlug(slug, params),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: !!slug,
  });
  return {
    data: data?.data.data,
    isLoading,
    error,
    ...rest,
  };
};
