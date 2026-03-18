export interface IBlog {
  total_data: number;
  current_page: number;
  total_pages: number;
  channel_id: number;
  content_model_id: number;
  content_type: ContentType;
  contents: Content[];
}

export interface ContentType {
  id: number;
  name: string;
  slug: string;
}

export interface Content {
  id: number;
  status: string;
  name: string;
  slug: string;
  content_data: ContentDaum[];
  created_at: string;
  meta_data: MetaDaum[];
  taxonomies: Taxonomy[];
  comments_count?: number;
  reactions_count?: number;
  is_reacted?: boolean;
}

export interface ContentDaum {
  schema_name: string;
  schema_slug: string;
  name: string;
  value: string;
}

export interface MetaDaum {
  meta_key: string;
  meta_value: string;
}

export interface Taxonomy {
  name: string;
  slug: string;
  terms: Term[];
}

export interface Term {
  name: string;
  slug: string;
}

// BLOG DETAIL
export interface BlogDetail {
  entry: Entry;
  references_entries: any[];
}

export interface Entry {
  id: number;
  status: string;
  channel_id: number;
  name: string;
  slug: string;
  content_data: ContentDaum[];
  content_type: ContentType;
  created_at: string;
  meta_data: MetaDaum[];
  taxonomies: Taxonomy[];
  comments: Comment[];
  total_comments: number;
  reactions: Reaction[];
  total_reactions: number;
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  media: string;
  meta_data: string;
  replies: Reply[];
  parent_comment_id?: string;
}

export interface Reply {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  media: string;
  meta_data: string;
  parent_comment_id: string;
  replies: any[];
}

export interface Reaction {
  id: string;
  created_at: string;
  updated_at: string;
  emoji: string;
  entry_id: string;
  meta_data: string;
  type: string;
}
