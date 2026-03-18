import { getProductByHandle } from "@/services/products";
import { Metadata, ResolvingMetadata } from "next";
import { ProductContainer } from "../../../../features/detail-product/product-container";
import { COMMON_DATA } from "@/configs";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  // fetch data
  const res = await getProductByHandle(slug);
  const productData = res?.data?.data.data;

  const { title, description, openGraph } = await parent;

  return {
    title:
      `${productData?.title || COMMON_DATA.meta.title} - ${productData?.subtitle || ""} sản phẩm tại NVBPlay store` ||
      title,
    description:
      `${productData?.subtitle || ""} sản phẩm tại NVBPlay store` ||
      description,
    openGraph: {
      images:
        productData?.thumbnail || "/nvb-play.svg"
          ? [
              {
                url: productData?.thumbnail || "/nvb-play.svg",
                width: 1024,
                height: 576,
                alt: productData?.title || COMMON_DATA.meta.title,
              },
            ]
          : [...(openGraph?.images || [])],
      title: `${productData?.title || COMMON_DATA.meta.title} - ${productData?.subtitle || ""} sản phẩm tại NVBPlay store`,
      description: `${productData?.description || COMMON_DATA.meta.description} sản phẩm tại NVBPlay store`,
      url: `/product/${slug}`,
      locale: "en-US",
      siteName: `${productData?.title || COMMON_DATA.meta.title} - ${productData?.subtitle || ""} sản phẩm tại NVBPlay store`,
      type: "website",
    },
    alternates: {
      canonical: `/product/${slug}`,
    },
    twitter: {
      title: `${productData?.title || COMMON_DATA.meta.title} - ${productData?.subtitle || ""} sản phẩm tại NVBPlay store`,
      description: `${productData?.subtitle} sản phẩm tại NVBPlay store`,
      images:
        productData?.thumbnail || "/nvb-play.svg"
          ? [
              {
                url: productData?.thumbnail || "/nvb-play.svg",
                width: 1024,
                height: 576,
                alt: `${productData?.title || COMMON_DATA.meta.title} - ${productData?.subtitle || ""} sản phẩm tại NVBPlay store`,
              },
            ]
          : [...(openGraph?.images || [])],
      card: "summary_large_image",
    },
  };
}

const DetailProductPage = () => {
  return <ProductContainer />;
};

export default DetailProductPage;
