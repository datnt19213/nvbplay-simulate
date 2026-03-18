export interface Order {
  id: string;
  status: string;
  summary: Summary;
  currency_code: string;
  display_id: number;
  region_id: string;
  email: null;
  total: number;
  subtotal: number;
  tax_total: number;
  discount_total: number;
  discount_subtotal: number;
  discount_tax_total: number;
  original_total: number;
  original_tax_total: number;
  item_total: number;
  item_subtotal: number;
  item_tax_total: number;
  original_item_total: number;
  original_item_subtotal: number;
  original_item_tax_total: number;
  shipping_total: number;
  shipping_subtotal: number;
  shipping_tax_total: number;
  original_shipping_tax_total: number;
  original_shipping_subtotal: number;
  original_shipping_total: number;
  created_at: Date;
  updated_at: Date;
  items: Item[];
  shipping_address: ShippingAddress;
  billing_address: null;
  shipping_methods: any[];
  payment_collections: PaymentCollection[];
  metadata: {
    note: string;
  };
}

export interface Item {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  variant_id: string;
  product_id: string;
  product_title: string;
  product_description: string;
  product_subtitle: string;
  product_type: null;
  product_collection: null;
  product_handle: string;
  variant_sku: string;
  variant_barcode: null;
  variant_title: string;
  variant_option_values: null;
  requires_shipping: boolean;
  is_discountable: boolean;
  is_tax_inclusive: boolean;
  raw_compare_at_unit_price: null;
  raw_unit_price: Raw;
  is_custom_price: boolean;
  metadata: Metadata;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  tax_lines: any[];
  adjustments: any[];
  compare_at_unit_price: null;
  unit_price: number;
  quantity: number;
  raw_quantity: Raw;
  detail: Detail;
  subtotal: number;
  total: number;
  original_total: number;
  discount_total: number;
  discount_subtotal: number;
  discount_tax_total: number;
  tax_total: number;
  original_tax_total: number;
  refundable_total_per_unit: number;
  refundable_total: number;
  fulfilled_total: number;
  shipped_total: number;
  return_requested_total: number;
  return_received_total: number;
  return_dismissed_total: number;
  write_off_total: number;
  raw_subtotal: Raw;
  raw_total: Raw;
  raw_original_total: Raw;
  raw_discount_total: Raw;
  raw_discount_subtotal: Raw;
  raw_discount_tax_total: Raw;
  raw_tax_total: Raw;
  raw_original_tax_total: Raw;
  raw_refundable_total_per_unit: Raw;
  raw_refundable_total: Raw;
  raw_fulfilled_total: Raw;
  raw_shipped_total: Raw;
  raw_return_requested_total: Raw;
  raw_return_received_total: Raw;
  raw_return_dismissed_total: Raw;
  raw_write_off_total: Raw;
  variant: Variant;
}

export interface Detail {
  id: string;
  order_id: string;
  version: number;
  item_id: string;
  raw_unit_price: null;
  raw_compare_at_unit_price: null;
  raw_quantity: Raw;
  raw_fulfilled_quantity: Raw;
  raw_delivered_quantity: Raw;
  raw_shipped_quantity: Raw;
  raw_return_requested_quantity: Raw;
  raw_return_received_quantity: Raw;
  raw_return_dismissed_quantity: Raw;
  raw_written_off_quantity: Raw;
  metadata: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  unit_price: null;
  compare_at_unit_price: null;
  quantity: number;
  fulfilled_quantity: number;
  delivered_quantity: number;
  shipped_quantity: number;
  return_requested_quantity: number;
  return_received_quantity: number;
  return_dismissed_quantity: number;
  written_off_quantity: number;
}

export interface Raw {
  value: string;
  precision: number;
}

export interface Metadata {}

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
  origin_country: null;
  mid_code: null;
  material: null;
  weight: null;
  length: null;
  height: null;
  width: null;
  metadata: null;
  variant_rank: number;
  product_id: string;
  product: Product;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

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
  collection_id: null;
  collection: null;
  type_id: null;
  discountable: boolean;
  external_id: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  metadata: null;
  type: null;
}

export interface PaymentCollection {
  id: string;
  currency_code: string;
  raw_amount: Raw;
  raw_authorized_amount: Raw;
  raw_captured_amount: Raw;
  raw_refunded_amount: Raw;
  region_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  completed_at: null;
  status: string;
  metadata: null;
  amount: number;
  authorized_amount: number;
  captured_amount: number;
  refunded_amount: number;
}

export interface ShippingAddress {
  id: string;
  customer_id: null;
  company: null;
  first_name: null;
  last_name: null;
  address_1: null;
  address_2: null;
  city: null;
  country_code: string;
  province: null;
  postal_code: null;
  phone: null;
  metadata: null;
  created_at: Date;
  updated_at: Date;
}

export interface Summary {
  paid_total: number;
  difference_sum: number;
  raw_paid_total: Raw;
  refunded_total: number;
  transaction_total: number;
  pending_difference: number;
  raw_difference_sum: Raw;
  raw_refunded_total: Raw;
  current_order_total: number;
  original_order_total: number;
  raw_transaction_total: Raw;
  raw_pending_difference: Raw;
  raw_current_order_total: Raw;
  raw_original_order_total: Raw;
}
