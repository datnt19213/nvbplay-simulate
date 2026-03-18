export interface CollectionRes {
  data: Data;
  status: number;
  headers: Headers;
}

export interface Data {
  collections: Collection[];
  count: number;
  offset: number;
  limit: number;
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  created_at: Date;
  updated_at: Date;
}

export interface Headers {
  "Content-Type": string;
}
