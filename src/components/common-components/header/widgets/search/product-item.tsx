import Image from "@/components/base-components/images/image";
import { Product } from "@/services/products/type";
import Link from "next/link";

type ProductProps = Product & {
  onClick?: () => void;
};

const ProductItems = ({ ...rest }: ProductProps) => {
  return (
    <Link
      href={`/products/${rest.handle}`}
      className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
      onClick={rest.onClick}
    >
      <div className="aspect-square size-20">
        <Image src={rest.thumbnail ? rest.thumbnail : undefined} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{rest.title}</p>
        <p className="text-sm text-gray-500">{rest.subtitle}</p>
      </div>
    </Link>
  );
};

export default ProductItems;
