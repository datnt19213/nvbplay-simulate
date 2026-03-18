import Image from "@/components/base-components/images/image";
import React from "react";

export const StoryContentMainView = ({ image }: { image?: string }) => {
  return (
    <div className="w-full md:max-w-[28rem] lg:max-w-[32rem] xl:max-w-[37.5rem] 2xl:max-w-[50rem] h-[100vh] -mt-4">
      <Image
        alt=""
        src={
          "https://s3-alpha-sig.figma.com/img/42be/10fe/b164113ad3acffe9d77856f0bb84cb78?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LAPxz1XhY7pP5-xjQBGGvdpOx1e5Ab-YU1TfcslkHkr2HszjqD5oulrczUxqUI8nWFRRBr9kj-IWhI-9jjrMeKuRoUinL2y4W3plcEuDq3k8KOnYhXSEr1iOSQrW9kKEAWea3EQMfysIWK~IpklhezFK8bjgJ3Mj7eo78BYhRVag9PoJ7JNTq7lMX69~ZOlJbxhLb139~KyktJveDLBIFCr2f0E7-fMyDhK0VgCOeA4KTTNDMdEVQma9cD2gnoJppRvMg-nm-2ZVEaCQQGQ4hlLPD7z1bHD2zwwZLULtWyHWPbcenVpIgwPauOMY~kSVMjMzY04FuxSF9d89KGYW5g__"
        }
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};
