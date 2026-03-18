import { IResponse } from "@/types/response/response.type";

// Cấu trúc Setting linh hoạt hỗ trợ cả dynamic keys
export interface Setting {
  [configCategory: string]: {
    [configGroup: string]: {
      [configKey: string]: {
        value: string; // Giá trị tương ứng
      };
    };
  };
}

// Định nghĩa interface ISetting kết hợp TypedSetting và kiểu dynamic
export interface ISetting extends IResponse<Setting[]> {}
