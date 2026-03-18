import React, {useEffect, useLayoutEffect, useState, useRef} from "react";
/**
 * The `useWindowSize` function in TypeScript returns the current width and height of the window as an
 * array.
 * @returns The `useWindowSize` custom hook returns an array containing the current width and height of
 * the window `[width, height]`.
 */
export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

/**
 * The function `useScrollCenterOnScreen` uses the IntersectionObserver API in React to determine if a
 * specified element is visible on the screen.
 * @param {any} ref - The `ref` parameter in the `useScrollCenterOnScreen` function is a reference to
 * the DOM element that you want to observe for intersection with the viewport. This reference is
 * typically created using the `useRef` hook in React and then passed to this custom hook to track its
 * visibility on the
 * @param [threshold=0.5] - The `threshold` parameter in the `useScrollCenterOnScreen` function is used
 * to specify at what point of intersection between the target element and the viewport the
 * `IntersectionObserver` should trigger the visibility change. It is a value between 0 and 1, where 0
 * means that even a
 * @returns The `useScrollCenterOnScreen` custom hook is returning a boolean value `isVisible`, which
 * indicates whether the element referenced by the `ref` is currently intersecting with the viewport
 * based on the specified threshold.
 */
export const useScrollCenterOnScreen = (ref: any, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {threshold}
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible, threshold, ref]);

  return isVisible;
};

/**
 * The `useScrollPosition` function in TypeScript returns the current scroll position of the window.
 * @returns The `useScrollPosition` custom hook returns an object containing the current scroll
 * position with properties `{x, y}`.
 */
export const useScrollPosition = (): {x: any; y: any} => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};

type ScrollDirection = "up" | "down" | "left" | "right" | "none";

type ScrollPosition = {
  scrollTop: number;
  scrollLeft: number;
};

export const useScrollDirection = (ref: React.RefObject<HTMLElement>) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollTop: 0,
    scrollLeft: 0,
  });
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("none");

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const newScrollTop = ref.current.scrollTop;
        const newScrollLeft = ref.current.scrollLeft;

        if (newScrollTop > scrollPosition.scrollTop) {
          setScrollDirection("down");
        } else if (newScrollTop < scrollPosition.scrollTop) {
          setScrollDirection("up");
        } else if (newScrollLeft > scrollPosition.scrollLeft) {
          setScrollDirection("right");
        } else if (newScrollLeft < scrollPosition.scrollLeft) {
          setScrollDirection("left");
        } else {
          setScrollDirection("none");
        }

        setScrollPosition({
          scrollTop: newScrollTop,
          scrollLeft: newScrollLeft,
        });
      }
    };

    const element = ref.current;
    element?.addEventListener("scroll", handleScroll);

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
  }, [ref, scrollPosition]);

  return {scrollDirection, scrollPosition};
};
