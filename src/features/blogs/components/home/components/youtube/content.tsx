"use client";

import Image from "@/components/base-components/images/image";
import { useScrollCenterOnScreen } from "@/hooks";
import { cn } from "@/lib/utils";
import { isFadeUpOnActive } from "@/utilities/checker-functions";
import { ChartNoAxesColumn } from "lucide-react";
import { useRef } from "react";

export const NVBYoutubeContent = () => {
  const ref = useRef<any>(null);
  const isActive = useScrollCenterOnScreen(ref);

  return (
    <div className="flex flex-col gap-0 mt-6">
      <Image
        src="https://s3-alpha-sig.figma.com/img/0a44/26db/ad762b9a41b0cf9064c8b3a9b2aaf9bd?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VtC-43te2zAw4R2HBs37VUM-ihfzGUo5pyaoxMnhMql0UA5XngflvSHAiWE9JHgbNHjxiXDpzMeT8DucyNvQ77l-ZX2ogLqvGex~yfpow-LQefOS6eW~pYwz7VmU~ZIKsyBM5ZjyHt71Dxbhl5nqZlpCcaK8t0WhhONrZXO06s4nD3TIR457b2KcAbHe-aWChqXsQAFKUwpeMBJVffaQJlNShWBspYlELWdhDxQ5eJT716t7mi0Zj~vsZtAZm-zt8bXLUUzMKJ0KTfdFRKPPZtXa1RQ3a~ib3pXYaIcG6yAPdhVPazakIsKJSH9EGbA8emHTX3LLgoNDT4-piWj1eQ__"
        alt=""
        className="w-full h-full object-cover rounded-t-lg"
        loading="lazy"
      />
      <div ref={ref} className={cn("bg-[#2F0901]", isFadeUpOnActive(isActive))}>
        <div className="grid grid-cols-1 gap-0">
          <div className="flex justify-start items-center gap-3 bg-[#5E1203] px-2 py-3">
            <div className="relative">
              <Image
                src="https://s3-alpha-sig.figma.com/img/0a44/26db/ad762b9a41b0cf9064c8b3a9b2aaf9bd?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VtC-43te2zAw4R2HBs37VUM-ihfzGUo5pyaoxMnhMql0UA5XngflvSHAiWE9JHgbNHjxiXDpzMeT8DucyNvQ77l-ZX2ogLqvGex~yfpow-LQefOS6eW~pYwz7VmU~ZIKsyBM5ZjyHt71Dxbhl5nqZlpCcaK8t0WhhONrZXO06s4nD3TIR457b2KcAbHe-aWChqXsQAFKUwpeMBJVffaQJlNShWBspYlELWdhDxQ5eJT716t7mi0Zj~vsZtAZm-zt8bXLUUzMKJ0KTfdFRKPPZtXa1RQ3a~ib3pXYaIcG6yAPdhVPazakIsKJSH9EGbA8emHTX3LLgoNDT4-piWj1eQ__"
                alt="thumbnail"
                className="w-[110px] h-[5.25rem] rounded-md"
                loading="lazy"
              />
              <div className="absolute bottom-0 right-0 w-full h-1/3 bg-black/50 rounded-b-lg flex justify-center items-center">
                <ChartNoAxesColumn className="size-4 text-white" />
                <span className="text-white text-xs">Đang phát</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-neutral-100 text-base line-clamp-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Cupiditate deserunt quam expedita sint quasi! Magni animi
                laboriosam porro non odio et saepe assumenda natus,
                reprehenderit, fugiat accusantium tempore eveniet quisquam.
              </p>
              <span className="text-neutral-200 text-sm">01:10:50</span>
            </div>
          </div>
          {Array(3)
            .fill(1)
            .map((_, index) => (
              <div
                key={index}
                className="flex justify-start items-center gap-3 px-2 py-2"
              >
                <div className="relative">
                  <Image
                    src="https://s3-alpha-sig.figma.com/img/0a44/26db/ad762b9a41b0cf9064c8b3a9b2aaf9bd?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VtC-43te2zAw4R2HBs37VUM-ihfzGUo5pyaoxMnhMql0UA5XngflvSHAiWE9JHgbNHjxiXDpzMeT8DucyNvQ77l-ZX2ogLqvGex~yfpow-LQefOS6eW~pYwz7VmU~ZIKsyBM5ZjyHt71Dxbhl5nqZlpCcaK8t0WhhONrZXO06s4nD3TIR457b2KcAbHe-aWChqXsQAFKUwpeMBJVffaQJlNShWBspYlELWdhDxQ5eJT716t7mi0Zj~vsZtAZm-zt8bXLUUzMKJ0KTfdFRKPPZtXa1RQ3a~ib3pXYaIcG6yAPdhVPazakIsKJSH9EGbA8emHTX3LLgoNDT4-piWj1eQ__"
                    alt="thumbnail"
                    className="w-[110px] h-[5.25rem] rounded-md"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-neutral-100 text-base line-clamp-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Cupiditate deserunt quam expedita sint quasi! Magni animi
                    laboriosam porro non odio et saepe assumenda natus,
                    reprehenderit, fugiat accusantium tempore eveniet quisquam.
                  </p>
                  <span className="text-neutral-200 text-sm">01:10:50</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
