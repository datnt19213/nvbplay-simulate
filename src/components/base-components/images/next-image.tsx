import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface NextImageProps {
  containerClassName?: string;
  url: string;
}
const NextImage = (props: NextImageProps) => {
  return (
    <div
      className={cn(
        "relative w-full h-full",
        props.containerClassName
      )}
    >
      <motion.div className={`w-full h-full`}>
        <Image
          fill
          src={props.url}
          loading="eager"
          alt="image"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};

export default NextImage;
