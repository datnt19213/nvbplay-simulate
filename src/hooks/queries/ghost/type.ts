import { IResponse } from "@/types/response/response.type";

export interface Post {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  comment_id: string;
  feature_image: string | null;
  featured: boolean;
  status: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  custom_template: string | null;
  canonical_url: string | null;
  tags: string[];
  authors: Authors;
  plaintext: string;
  html: string;
  reading_time: number;
  total_comments: number;
  total_reactions: number;
  is_reactions: boolean;
  comments: Comment[];
}

export interface Authors {
  id: string;
  name: string;
  slug: string;
  email: string;
  profile_image: string | null;
  cover_image: string | null;
  url: string;
}

export interface Comment {
  id: string;
  parent_id: null | string;
  user_id: string;
  user_name: string;
  user_image: string;
  user_reply: string;
  content: string;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  children: Comment[];
}

export interface Reaction {
  id: string;
  post_id: string;
  user_id: string;
  user_name: string;
  user_image: string;
  created_at: string;
  updated_at: string;
}

export interface IPostsResponse
  extends IResponse<{
    result: Post[];
    limit: number;
    total_pages: number;
    next_page: number;
    previous_page: number;
    current_page: number;
  }> {}

export interface IBlogDetailResponse extends IResponse<Post> {}
