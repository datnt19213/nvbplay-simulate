export interface IReturnReason {
  id: string;
  value: string;
  label: string;
  parent_return_reason_id: null;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  parent_return_reason: null;
  return_reason_children: IReturnReason[];
}
