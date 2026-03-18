import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createGhostComment,
  deleteGhostComment,
  getGhostPosts,
  updateGhostComment,
} from "@/services/ghost";
import { useEffect, useState } from "react";
import { IPostsResponse } from "./type";
import { useDebouncedValue, useDebounceCallback } from "@/hooks/use-debounced";
import { removeEmptyKeys } from "@/utilities/helper";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
interface IPagination {
  page: number;
  limit: number;
}
export const useGhostPosts = () => {
  const LIMIT = 5;
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: LIMIT,
  });
  const user = useSelector((state: RootState) => state.users_data.user);
  const { q } = useSelector((state: RootState) => state.ghost);
  const [debouncedSearch] = useDebouncedValue(q, 500);
  const handlePrevious = () => {
    setPagination({ ...pagination, page: pagination.page - 1 });
  };
  const handleNext = () => {
    setPagination({ ...pagination, page: pagination.page + 1 });
  };
  const handlePage = (page: number) => {
    setPagination({ ...pagination, page });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams && searchParams.get("page")) {
      setPagination({ ...pagination, page: Number(searchParams.get("page")) });
    }
  }, []);

  const params = removeEmptyKeys({
    q: debouncedSearch,
    page: pagination.page,
    limit: pagination.limit,
    user_id: user?.id,
  });
  const { data, isLoading, error, isFetching } = useQuery<IPostsResponse>({
    queryKey: ["ghost-posts", pagination.page, debouncedSearch, user?.id],
    queryFn: () => getGhostPosts(params),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const createComment = useMutation({
    mutationFn: (data: {
      post_id: string;
      content: string;
      parent_id?: string;
      user_reply?: string;
      user_data: {
        id: string;
        name: string;
        image: string;
      };
    }) =>
      createGhostComment({
        post_id: data.post_id,
        content: data.content,
        parent_id: data.parent_id,
        user_reply: data.user_reply,
        user_data: {
          id: data.user_data.id,
          name: data.user_data.name,
          image: data.user_data.image,
        },
      }),
    onSuccess: (res) => {
      return res;
    },
    onError: (err: Error) => {
      return err;
    },
  });

  const updateComment = useMutation({
    mutationFn: (data: { id: string; content: string; user_id: string }) =>
      updateGhostComment(data),
    onSuccess: (res) => {
      return res;
    },
    onError: (err: Error) => {
      return err;
    },
  });

  const deleteComment = useMutation({
    mutationFn: (data: { id: string; user_id: string }) =>
      deleteGhostComment(data.id, data.user_id),
    onSuccess: (res) => {
      return res;
    },
    onError: (err: Error) => {
      return err;
    },
  });

  return {
    data: data?.data.data.result,
    isLoading: isLoading,
    error: error,
    isFetching: isFetching,
    createComment,
    updateComment,
    deleteComment,
    handleNext,
    handlePrevious,
    handlePage,
    currentPage: pagination.page,
    totalPages: data?.data.data.total_pages,
    isLastPage: data?.data.data.total_pages === pagination.page,
  };
};
