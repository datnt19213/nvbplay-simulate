import { useMediaQuery } from "./use-media-query";

const useMediaQueryScreen = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return {
    isMobile,
  };
};

export default useMediaQueryScreen;
