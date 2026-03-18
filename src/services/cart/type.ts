export interface Cart {
  id: string; // Unique identifier for the cart
  currency_code: string; // Currency code (e.g., "vnd")
  email: string | null; // Email associated with the cart, if any
  region_id: string; // ID of the region
  created_at: string; // ISO timestamp for when the cart was created
  updated_at: string; // ISO timestamp for the last update
  completed_at: string | null; // ISO timestamp for when the cart was completed (null if not completed)
  total: number; // Total price including all items, taxes, and shipping
  subtotal: number; // Subtotal price excluding taxes and shipping
  tax_total: number; // Total tax amount
  discount_total: number; // Total discount applied to the cart
  discount_subtotal: number; // Discount applied to items only
  discount_tax_total: number; // Discount applied to taxes
  original_total: number; // Original total before discounts
  original_tax_total: number; // Original tax total before discounts
  item_total: number; // Total cost of all items in the cart
  item_subtotal: number; // Subtotal of items excluding tax
  item_tax_total: number; // Tax applied to items
  original_item_total: number; // Original total of items before discounts
  original_item_subtotal: number; // Original subtotal of items before discounts
  original_item_tax_total: number; // Original tax total for items
  shipping_total: number; // Total cost of shipping
  shipping_subtotal: number; // Subtotal of shipping excluding tax
  shipping_tax_total: number; // Tax applied to shipping
  original_shipping_tax_total: number; // Original tax total for shipping
  original_shipping_subtotal: number; // Original shipping subtotal
  original_shipping_total: number; // Original total shipping cost
  metadata: Record<string, any> | null; // Metadata object for custom data (optional)
  items: CartItem[]; // Array of items in the cart
  sales_channel_id: string; // ID of the sales channel
  customer_id: string | null; // ID of the customer, if logged in
  shipping_methods: any[]; // Shipping methods (left flexible here)
  shipping_address: Address | null; // Shipping address for the order
  billing_address: Address | null; // Billing address for the order
  region: Region; // Region information
  promotions: any[]; // Array of applied promotions (left flexible here)
}

// Interface for individual Cart Items
export interface CartItem {
  id: string; // Unique identifier for the cart item
  variant_id: string; // Variant ID of the product
  product_id: string | null; // Product ID (optional)
  product_title: string | null; // Title of the product
  product_description: string | null; // Description of the product
  product_subtitle: string | null; // Subtitle of the product
  product_type: string | null; // Type of the product
  product_collection: string | null; // Collection the product belongs to
  product_handle: string | null; // Handle for the product
  variant_sku: string | null; // SKU for the variant
  variant_barcode: string | null; // Barcode for the variant
  variant_title: string | null; // Title of the variant
  requires_shipping: boolean; // Whether the item requires shipping
  metadata: Record<string, any> | null; // Metadata object for custom data (optional)
  created_at: string; // ISO timestamp for when the item was created
  updated_at: string; // ISO timestamp for when the item was last updated
  title: string; // Title of the cart item
  quantity: number; // Quantity of the item in the cart
  unit_price: number; // Price per unit of the item
  compare_at_unit_price: number | null; // Compare-at price per unit, if applicable
  is_tax_inclusive: boolean; // Whether the unit price includes tax
  tax_lines: any[]; // Tax lines applied to the item (flexible structure)
  adjustments: any[]; // Adjustments applied to the item (e.g., discounts)
  thumbnail: string | null; // Thumbnail image URL for the item
  disable: boolean;
  availability: number;
}

// Interface for Address
export interface Address {
  id: string; // Unique identifier for the address
  first_name: string | null; // First name of the recipient
  last_name: string | null; // Last name of the recipient
  company: string | null; // Company name (optional)
  address_1: string | null; // First line of the address
  address_2: string | null; // Second line of the address
  city: string | null; // City
  postal_code: string | null; // Postal code
  country_code: string; // Country code (e.g., "vn")
  province: string | null; // Province or state
  phone: string | null; // Phone number
}

// Interface for Region
export interface Region {
  id: string; // Unique identifier for the region
  name: string; // Name of the region
  currency_code: string; // Currency code for the region
  automatic_taxes: boolean; // Whether taxes are automatically calculated
  countries: Country[]; // Array of countries in the region
}

// Interface for Country
export interface Country {
  iso_2: string; // ISO 2-letter country code
  iso_3: string; // ISO 3-letter country code
  num_code: string; // Numeric country code
  name: string; // Full name of the country
  display_name: string; // Display name of the country
  region_id: string; // Region ID the country belongs to
  metadata: Record<string, any> | null; // Metadata object for custom data (optional)
  created_at: string; // ISO timestamp for when the country was created
  updated_at: string; // ISO timestamp for when the country was last updated
  deleted_at: string | null; // ISO timestamp for when the country was deleted (null if not deleted)
}
