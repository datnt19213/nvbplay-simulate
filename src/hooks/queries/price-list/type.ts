import { Variant } from "@/services/products/type";

export interface PriceList {
  id: string;
  type: string;
  description: string;
  title: string;
  status: string;
  starts_at: string;
  ends_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  prices: Price[];
  rules: Rules;
}

export interface Price {
  id: string;
  currency_code: string;
  amount: number;
  min_quantity: null;
  max_quantity: null;
  created_at: string;
  deleted_at: null;
  updated_at: string;
  price_set_id: string;
  variant_id: string;
  rules: Rules;
  variant: Variant;
  reserved_quantity: number;
  stocked_quantity: number;
  is_out_of_stock?: boolean;
  availability: number;
}

export interface Rules {}

export interface Product {
  id: string;
  title: string;
  handle: string;
  subtitle: string;
  description: string;
  is_giftcard: boolean;
  status: string;
  thumbnail: string;
  weight: null;
  length: null;
  height: null;
  width: null;
  origin_country: null;
  hs_code: null;
  mid_code: null;
  material: null;
  discountable: boolean;
  external_id: null;
  metadata: null;
  type_id: null | string;
  type: Collection | null;
  collection_id: string;
  collection: Collection;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface Collection {
  id: string;
}
