"use client";
import React, {useRef, useState} from "react";
import AddMore from "../elements/add-more";
import {translate} from "@/utilities/translator";
import {useScrollDirection} from "@/hooks/window-size";
import {cn} from "@/lib/utils";
import {useMediaQuery} from "@/hooks/use-media-query";

const BuilderEditor = () => {
  const ref = useRef<HTMLElement | any>(null);
  const {scrollDirection} = useScrollDirection(ref);
  const [selected, setSelected] = useState(true);
  const isMobile = useMediaQuery("(max-width: 1200px)");
  return (
    <div
      className={cn(
        "w-full relative transition-all",
        "after:content[''] after:absolute after:w-full after:h-[1rem] after:bg-gradient-to-b after:from-transparent after:to-gray-primary after:z-[2] after:bottom-0 after:left-0",
        "before:content[''] before:absolute before:w-full before:h-[1rem] before:bg-gradient-to-b before:from-gray-primary before:to-transparent before:z-[2] before:top-0 before:left-0",
        scrollDirection === "down" && "after:hidden",
        scrollDirection === "up" && "before:hidden",
        isMobile && "after:hidden"
      )}
    >
      <div
        ref={ref}
        className={cn(
          "w-full flex flex-col scrollbar-none relative",
          isMobile
            ? "h-fit overflow-hidden"
            : "h-[calc(100dvh-169px)] overflow-y-scroll"
        )}
      >
        <AddMore
          style={{
            animationDelay: `${1 * 0.1}s`,
          }}
          data={{}}
          name={translate("racket")}
          isSelected={selected}
          onSelected={() => setSelected(!selected)}
          onClickToSelect={() => console.log("click to select")}
        />
        <AddMore
          style={{
            animationDelay: `${2 * 0.1}s`,
          }}
          data={null}
          name={translate("shirt")}
          onClickToSelect={() => console.log("click to select")}
        />
        <AddMore
          style={{
            animationDelay: `${3 * 0.1}s`,
          }}
          data={null}
          name={translate("trousers")}
          onClickToSelect={() => console.log("click to select")}
        />
        <AddMore
          style={{
            animationDelay: `${4 * 0.1}s`,
          }}
          data={null}
          name={translate("shoe")}
          onClickToSelect={() => console.log("click to select")}
        />
        <AddMore
          style={{
            animationDelay: `${5 * 0.1}s`,
          }}
          data={null}
          name={translate("accessory")}
          onClickToSelect={() => console.log("click to select")}
        />
      </div>
    </div>
  );
};

export default BuilderEditor;
