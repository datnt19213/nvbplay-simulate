import { useRef } from "react";

interface UseDebouncedActionOptions {
  action: (...args: any[]) => Promise<void> | void; // Hàm thực hiện hành động (bắt buộc)
  delay?: number; // Thời gian debounce, mặc định 500ms (tuỳ chọn)
  onError?: (error: any) => void; // Hàm xử lý lỗi khi action thất bại (tuỳ chọn)
}

const useDebouncedAction = ({
  action,
  delay = 500,
  onError,
}: UseDebouncedActionOptions) => {
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Hàm kích hoạt action với debounce
   * @param args - Các tham số truyền vào action
   */
  const triggerAction = (...args: any[]) => {
    // Hủy bỏ timeout cũ nếu tồn tại
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Thiết lập timeout mới
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        await action(...args); // Thực thi hành động chính
      } catch (error) {
        if (onError) {
          onError(error); // Gọi hàm xử lý lỗi nếu có
        }
      }
    }, delay);
  };

  /**
   * Hủy timeout hiện tại nếu cần
   */
  const cancelAction = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }
  };

  return { triggerAction, cancelAction };
};

export default useDebouncedAction;
