import {COMMON_DATA} from "@/configs";
import SearchProductPage from "@/features/search-products";
import {Metadata} from "next";
import {cookies} from "next/headers";

type Params = {};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const searchProductValue =
    cookieStore.get("searchProduct")?.value || "Áo Cầu Lông";

  const title = `Tìm kiếm sản phẩm ${searchProductValue} tại NVBPlay store`;
  const seoDescription = `Tìm kiếm sản phẩm ${searchProductValue} tại NVBPlay store. Những sản phẩm chất lượng cao nhất với giá cả phải chăng`;
  const image = "/assets/favicon/lalala.svg";

  return {
    title: title || COMMON_DATA.meta.title,
    description: COMMON_DATA.meta.description,
    openGraph: {
      title: title,
      description: seoDescription,
      url: "/",
      locale: "en-US",
      siteName: title,
      type: "website",
      images: [
        {
          url: image,
          width: 1024,
          height: 576,
          alt: title,
        },
      ],
    },

    alternates: {
      canonical: `/product`,
    },
  };
}

const ProductsPage = () => {
  return <SearchProductPage />;
};

export default ProductsPage;
