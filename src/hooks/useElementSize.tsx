import { RefObject, useEffect, useRef, useState } from "react";

export const useElementSize = <T extends HTMLElement>(): [
  RefObject<T>,
  { width: number; height: number },
] => {
  const elementRef = useRef<T>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      if (elementRef.current) {
        const { width, height } = elementRef.current.getBoundingClientRect();
        setSize({ width, height });
      }
    };

    updateSize(); // Cập nhật kích thước lần đầu

    // Sử dụng ResizeObserver để theo dõi thay đổi kích thước
    const observer = new ResizeObserver(updateSize);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect(); // Dọn dẹp khi component bị unmount
  }, []);

  return [elementRef, size];
};
