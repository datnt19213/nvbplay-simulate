"use client";
import { useEffect, useRef, useState } from "react";

const useScroll = (threshold: number = 50, offset?: number) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const lastUserScrollY = useRef(0);
  const isAutoScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      // Skip if this is our auto-scroll
      if (isAutoScrolling.current) {
        isAutoScrolling.current = false;
        return;
      }

      // Only handle scroll events from user interaction
      if (e.isTrusted) {
        const currentScrollY = window.scrollY;

        if (!isScrolled && currentScrollY > threshold) {
          setIsScrolled(true);
          lastUserScrollY.current = currentScrollY;

          // Auto scroll additional 50px
          if (offset) {
            isAutoScrolling.current = true;
            window.scrollTo({
              top: currentScrollY + 57,
              behavior: "instant",
            });
          }
        }
        // Only set to false if user has scrolled back significantly above threshold
        else if (isScrolled && currentScrollY < threshold * 0.5) {
          setIsScrolled(false);
          lastUserScrollY.current = currentScrollY;
          if (offset) {
            isAutoScrolling.current = true;
            window.scrollTo({
              top: currentScrollY - 57,
              behavior: "instant",
            });
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, isScrolled]);

  return isScrolled;
};

export default useScroll;
