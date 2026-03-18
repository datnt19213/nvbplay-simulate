export interface CommentRequest {
  parent_comment_id?: string | number;
  entry_id: number;
  content: string;
  metadata: Metadata;
  media?: any;
}

export interface Metadata {
  user_id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}
