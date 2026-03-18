import { SaleChannel } from "@/types/sale-channels";

// Root interface for a Product
export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  handle: string;
  is_giftcard: boolean;
  discountable: boolean;
  thumbnail?: string;
  collection_id?: string | null;
  type_id?: string | null;
  weight?: string;
  length?: string;
  height?: string;
  width?: string;
  hs_code?: string;
  origin_country?: string;
  mid_code?: string;
  material?: string;
  created_at: string;
  updated_at: string;
  type?: string | null;
  collection?: string | null;
  options: Option[];
  tags?: string[];
  images: ProductImage[];
  variants: Variant[];
  sales_channels: SaleChannel[];
}

// Represents an option available for the product (e.g., Size, Color)
export interface Option {
  id: string;
  title: string;
  product_id: string;
  metadata?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  values: OptionValue[];
}

// Represents individual values of an option (e.g., Small, Large for Size)
export interface OptionValue {
  id: string;
  value: string;
  option_id: string;
  metadata?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Represents images associated with the product
export interface ProductImage {
  id: string;
  url: string;
  metadata?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Represents individual variants of a product (e.g., specific size and color combinations)
export interface Variant {
  id: string;
  title: string;
  sku?: string | null;
  barcode?: string | null;
  ean?: string | null;
  upc?: string | null;
  allow_backorder: boolean;
  manage_inventory: boolean;
  hs_code?: string | null;
  origin_country?: string | null;
  mid_code?: string | null;
  material?: string | null;
  product: Product;
  weight?: string | null;
  length?: string | null;
  height?: string | null;
  width?: string | null;
  metadata?: any;
  variant_rank: number;
  product_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  options: VariantOption[];
  calculated_price: CalculatedPrice;
  inventory_quantity: number;
  reserved_quantity: number;
  stocked_quantity: number;
}

// Represents the options assigned to a specific variant (e.g., Color: Black, Size: Large)
export interface VariantOption {
  id: string;
  value: string;
  option_id: string;
  option: OptionDetail;
  metadata?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Detailed description of the option for a VariantOption
export interface OptionDetail {
  id: string;
  title: string;
  product_id: string;
  metadata?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CalculatedPrice {
  id: string;
  is_calculated_price_price_list: boolean;
  is_calculated_price_tax_inclusive: boolean;
  calculated_amount: number;
  raw_calculated_amount: {
    value: string;
    precision: number;
  };
  is_original_price_price_list: boolean;
  is_original_price_tax_inclusive: boolean;
  original_amount: number;
  raw_original_amount: {
    value: string;
    precision: number;
  };
  currency_code: string;
  calculated_price: {
    id: string;
    price_list_id: string | null;
    price_list_type: string | null;
    min_quantity: string | null;
    max_quantity: string | null;
  };
  original_price: {
    id: string;
    price_list_id: string | null;
    price_list_type: string | null;
    min_quantity: string | null;
    max_quantity: string | null;
  };
}
