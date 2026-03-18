export interface CategoriesRes {
  data: Data;
  status: number;
  headers: Headers;
}

export interface Data {
  product_categories: ProductCategory[];
  count: number;
  offset: number;
  limit: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  handle: string;
  rank: number;
  parent_category_id: null;
  created_at: Date;
  updated_at: Date;
  metadata: any;
  parent_category: null;
  category_children: any[];
  children: any[];
}

export interface Headers {
  "Content-Type": string;
}
