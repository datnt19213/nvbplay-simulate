import { Product } from "../products/type";

export interface CollectionProduct {
  collection_id: string;
  collection_name: string;
  collection_handle: string;
  products: Product[];
}
