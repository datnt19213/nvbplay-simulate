import { CouponTag } from "@/assets/icons";

interface TagProps {
  text: string;
  bgColor?: string;
}
const Tag = ({ text }: TagProps) => {
  return (
    <div
      className={`relative inline-flex justify-center items-center px-2 py-1 text-xs font-medium text-blue-600`}
    >
      <img
        src={CouponTag.src}
        alt="coupon"
        className="absolute w-full h-full inset-0 z-0"
        loading="lazy"
      />
      <span className="w-full h-full z-10 flex items-center justify-center">{text}</span>
    </div>
  );
};
export default Tag;
