import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export const HelpCenterSearchGroup = () => {
  return (
    <>
      <div className="w-[95%] md:w-[43.75rem] h-[4rem] rounded-full bg-white p-1 overflow-hidden flex justify-center items-center gap-1">
        <Input
          className="w-full h-full border-none outline-none font-medium text-lg placeholder:text-lg placeholder:border-none placeholder:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none focus-visible:outline-none"
          placeholder="Nhập từ khóa hoặc nội dung"
        />
        <div className="!size-14">
          <Button className="rounded-full aspect-square h-full w-full" size={"icon"}>
            <Image
              src="/images/help-center/search.svg"
              alt=""
              width={25}
              height={25}
              className=""
            />
          </Button>
        </div>
      </div>
    </>
  );
};
