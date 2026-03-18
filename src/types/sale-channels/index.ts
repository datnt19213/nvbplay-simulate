import { IResponse } from "../response/response.type";

export interface SaleChannel {
  id: string;
  name: string;
  description: string;
  is_disabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  metadata: {
    is_branch_store: boolean;
  };
}

export interface ISaleChannelResponse {
  data: {
    sales_channels: SaleChannel[];
  };
  status: number;
  headers: Headers;
}
