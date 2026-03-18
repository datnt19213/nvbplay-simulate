import { CalculatedPrice } from "@/services/products/type";
import { SaleChannel } from "../sale-channels";

export interface ProductData {
  product: ProductType;
}

export interface ProductType {
  id: ProductIDEnum;
  title: string;
  subtitle: string;
  description: string;
  handle: string;
  is_giftcard: boolean;
  discountable: boolean;
  thumbnail: string;
  collection_id: null;
  type_id: null;
  weight: null;
  length: null;
  height: null;
  width: null;
  hs_code: null;
  origin_country: null;
  mid_code: null;
  material: null;
  created_at: Date;
  updated_at: Date;
  type: null;
  collection: null;
  options: Option[];
  tags: any[];
  images: Image[];
  variants: Variant[];
  colors?: string[];
  brand?: ProductBrand;
  sales_channels: SaleChannel[];
}

export interface ProductBrand {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
export enum ProductIDEnum {
  Prod01JFARD7P3M7PZTSK983DA9ZDA = "prod_01JFARD7P3M7PZTSK983DA9ZDA",
}

export interface Image {
  id: string;
  url: string;
  metadata: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface Value {
  id: string;
  value: string;
  option_id: OptionOptionID;
  metadata: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  option?: Option;
}

export interface Option {
  id: OptionOptionID;
  title: string;
  product_id: ProductIDEnum;
  metadata: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  values?: Value[];
}

export enum OptionOptionID {
  Opt01JFARD7QKFHEBBWWZCJPZQCQ1 = "opt_01JFARD7QKFHEBBWWZCJPZQCQ1",
  Opt01JFARD7QKVGSEYX36VQHHN4HM = "opt_01JFARD7QKVGSEYX36VQHHN4HM",
}

export interface Variant {
  id: string;
  title: string;
  sku: string;
  barcode: null;
  ean: null;
  upc: null;
  allow_backorder: boolean;
  manage_inventory: boolean;
  hs_code: null;
  origin_country: null | string;
  mid_code: null;
  material: null;
  weight: null;
  length: null;
  height: null;
  width: null;
  metadata: null;
  variant_rank: number;
  product_id: ProductIDEnum;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  options: Value[];
  calculated_price: CalculatedPrice;
  inventory_quantity: number;
  stocked_quantity: number;
  reserved_quantity: number;
}

export interface Headers {
  "Content-Type": string;
}
