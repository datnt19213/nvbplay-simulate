export interface CollectionRes {
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
