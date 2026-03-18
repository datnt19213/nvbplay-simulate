import {banner_battle} from "@/assets/images";
import Bounded from "@/components/base-components/containers/bounded";
import Image from "@/components/base-components/images/image";
import {Content} from "@prismicio/client";
import {SliceComponentProps} from "@prismicio/react";

/**
 * Props for `Banners`.
 */
export type BannersProps = SliceComponentProps<Content.BannersSlice>;

/**
 * Component for "Banners" Slices.
 */
const Banners = ({slice}: BannersProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!px-0"
    >
      <Image src={banner_battle.src} className="w-full h-full rounded desktop:h-[180px] desktop:object-cover" />
    </Bounded>
  );
};

export default Banners;
