import { useEffect, useRef, useState } from "react";

export function useDebouncedValue<T>(value: T, delay: number): [T] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue];
}

export function useDebounceCallback(
  callback: () => void,
  delay: number,
  dependencies: any[] = []
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Xóa timeout mỗi khi dependencies thay đổi
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Thiết lập timeout mới
    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);

    // Dọn dẹp khi component unmount hoặc dependencies thay đổi
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [...dependencies, delay]); // Phụ thuộc vào delay và các giá trị khác

  return timeoutRef.current;
}
