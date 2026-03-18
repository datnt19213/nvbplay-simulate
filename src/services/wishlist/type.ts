import { Variant } from "../products/type";

export type Wishlist = {
  id: string;
  customer_id: string;
  sales_channel_id: string;
  items?: VariantWishlist[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type VariantWishlist = {
  id?: string;
  product_variant_id?: string;
  wishlist_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  product_variant?: Variant;
};
