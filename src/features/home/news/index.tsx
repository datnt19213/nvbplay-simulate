import Image from "@/components/base-components/images/image";
import Heading from "@/components/base-components/typography/heading";
// import { FadeUpMotionLayout } from "@/layouts/component-layouts";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NewFeatures = () => {
  return (
    // <FadeUpMotionLayout>
    <div className={cn("flex flex-col gap-4")}>
      <div className="flex items-center justify-between">
        <Heading>Tin thể thao</Heading>
        <Link
          href="/blog"
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="flex w-full flex-col desktop:flex-row items-center gap-3">
        <div className="flex-grow w-full max-w-[50rem]">
          <Image
            src="/images/new1.png"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-shrink h-full">
          <div className="grid grid-cols-2 desktop:grid-cols-1 gap-3">
            <Image
              src="/images/new2.png"
              className="w-full h-full object-cover"
            />
            <Image
              src="/images/new3.png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
    // </FadeUpMotionLayout>
  );
};

export default NewFeatures;
