import { axios_instance } from "@/apis";
import { Comment, Post, Reaction } from "@/hooks/queries/ghost/type";
import { IResponse } from "@/types/response/response.type";
import { removeEmptyKeys } from "@/utilities/helper";

// ______________COMMENT______________
export const getGhostPosts = async (
  params?: Record<string, any>
): Promise<
  IResponse<{
    result: Post[];
    limit: number;
    total_pages: number;
    next_page: number;
    previous_page: number;
    current_page: number;
  }>
> => {
  return (await axios_instance.get(`/ghost`, { params })).data;
};

export const getGhostPostBySlug = async (
  slug: string,
  params?: Record<string, string>
): Promise<IResponse<Post>> => {
  return (
    await axios_instance.get(`/ghost/${slug}`, {
      params,
    })
  ).data;
};

export const createGhostComment = async (data: {
  post_id: string;
  content: string;
  parent_id?: string;
  user_reply?: string;
  user_data: {
    id: string;
    name: string;
    image: string;
  };
}): Promise<IResponse<Comment>> => {
  const params = removeEmptyKeys({
    post_id: data.post_id,
    content: data.content,
    parent_id: data.parent_id,
    user_reply: data.user_reply,
    user_id: data.user_data.id,
    user_name: data.user_data.name,
    user_image: data.user_data.image,
  });
  return (await axios_instance.post(`/comments`, params)).data;
};

export const updateGhostComment = async (data: {
  id: string;
  content: string;
  user_id: string;
}): Promise<IResponse<Comment>> => {
  return (
    await axios_instance.patch(`/comments/${data.id}`, {
      content: data.content,
      user_id: data.user_id,
    })
  ).data;
};

export const deleteGhostComment = async (
  id: string,
  user_id: string
): Promise<IResponse<Comment>> => {
  return (
    await axios_instance.post(`/comments/${id}`, {
      user_id: user_id,
    })
  ).data;
};

// ______________REACTION______________
export const createGhostReaction = async (data: {
  post_id: string;
  user_id: string;
}): Promise<IResponse<Reaction>> => {
  return (
    await axios_instance.post(`/reactions`, {
      post_id: data.post_id,
      user_id: data.user_id,
    })
  ).data;
};

export const deleteGhostReaction = async (data: {
  post_id: string;
  user_id: string;
}): Promise<IResponse<Reaction>> => {
  return (
    await axios_instance.post(`/reactions/delete`, {
      post_id: data.post_id,
      user_id: data.user_id,
    })
  ).data;
};
