"use client";
import { Livestream, News } from "@/assets/icons";
import { Batminton, CoupleBatminton } from "@/assets/images";
import { Icon } from "@/components/common-components";
import { useBrands } from "@/hooks/queries/brands";
import useGetCategoriesQuery from "@/hooks/queries/categories/useGetCategoriesQuery";
import { useMediaQuery } from "@/hooks/use-media-query";
import useSearchFilter from "@/hooks/useSearchFilter";
import { RootState } from "@/stores";
import { setActiveMenu } from "@/stores/category-menu-slice";
import { FilterOption } from "@/stores/search-slice";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrandsItem,
  CollectionItemRectangle,
  CollectionItemSquare,
  MenuCategoryItem,
  TypeProduct,
  TypeProductItem,
} from "./elements";

const MegaMenu = ({ isShow }: { isShow: boolean }) => {
  const { isActive } = useSelector((state: RootState) => state.categoryMenu);
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const { data, isLoading } = useGetCategoriesQuery();
  const { data: brands, isLoading: isLoadingBrands } = useBrands();
  const dispactch = useDispatch();
  const router = useRouter();
  const { dispatchItem, handleSelect, selectedItems } =
    useSearchFilter("selectedCategories");
  const { dispatchItem: dispatchProvider, handleSelect: handleSelectProvider } =
    useSearchFilter("selectedProviders");

  const onChange = (item: FilterOption) => {
    handleSelect(item);
    dispatchItem(item);
    router.push(`/products`);
  };

  const onChangeProvider = (item: FilterOption) => {
    handleSelectProvider(item);
    dispatchProvider(item);
    router.push(`/products`);
  };

  function buildTree(categories: any) {
    const idToNodeMap = new Map();
    const tree: any[] = [];

    // Đầu tiên, ánh xạ từng danh mục bằng ID
    categories.forEach((category: any) => {
      idToNodeMap.set(category.id, { ...category, children: [] });
    });

    // Xây dựng cây bằng cách gắn danh mục con vào danh mục cha
    categories.forEach((category: any) => {
      const parentId = category.parent_category_id;
      const currentNode = idToNodeMap.get(category.id);

      if (parentId) {
        const parentNode = idToNodeMap.get(parentId);
        if (parentNode) {
          parentNode.children.push(currentNode);
        }
      } else {
        // Nếu không có cha, thêm vào gốc của cây
        tree.push(currentNode);
      }
    });

    return tree;
  }

  const categories = useMemo(() => {
    return buildTree(data);
  }, [data]);

  useEffect(() => {
    if (!isMobile) {
      if (categories && categories.length > 0) {
        dispactch(setActiveMenu(categories[0]));
      }
    } else {
      dispactch(setActiveMenu(null));
    }
  }, [categories, isMobile]);

  useEffect(() => {
    // Prevent body scroll when MegaMenu is active
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow style
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShow]);

  return (
    <div className="flex h-full w-full max-w-[75rem] bg-white overflow-hidden desktop:max-h-[38.75rem] scrollbar-none animate-fade-up animate-duration-500">
      <div
        className={clsx(
          "flex h-full w-full min-w-[20rem] transform flex-col gap-3 overflow-hidden opacity-100 transition-all duration-500 bg-white desktop:w-fit",
          isActive && isMobile && "!w-0 !min-w-0 -translate-x-full opacity-0"
        )}
      >
        <div className="h-[26.125rem] w-full overflow-hidden desktop:overflow-y-scroll scrollbar-none">
          <div className="flex h-fit w-full flex-col items-start gap-2 desktop:pr-3">
            {categories.map((item, index) => (
              <MenuCategoryItem
                key={index + "menu-key-item"}
                title={item.name}
                icon={"tabler:chevron-right"}
                image={item.metadata?.icon}
                description={item.description}
                isActive={isActive?.id === item.id}
                onClick={() => {
                  dispactch(setActiveMenu(item));
                }}
              />
            ))}
          </div>
        </div>
        <hr className="w-0.0625rem text-[#EBEBF0]" />
        <div className="flex flex-col items-center gap-2 desktop:pr-3">
          <MenuCategoryItem
            image={Livestream.src}
            icon="ph:caret-right"
            title="Phiên live giá sốc"
            isActive={isActive?.id === "tin-tuc-gia-soc"}
            onClick={() => dispactch(setActiveMenu("tin-tuc-gia-soc"))}
          />
          <MenuCategoryItem
            image={News.src}
            icon="ph:caret-right"
            title="Tin tức thể thao"
            isActive={isActive?.id === "tin-tuc-the-thao"}
            onClick={() => dispactch(setActiveMenu("tin-tuc-the-thao"))}
          />
        </div>
      </div>
      <div
        className={clsx(
          "flex h-full w-0 transform flex-col gap-4 overflow-hidden pb-6 desktop:pb-0 opacity-0 transition-all duration-500 bg-white desktop:w-full desktop:min-w-[20rem] desktop:flex-row desktop:overflow-hidden scrollbar-none desktop:opacity-100",
          isActive && isMobile && "w-full -translate-x-0 opacity-100"
        )}
      >
        <div className="flex desktop:hidden h-12 w-full items-center px-2 gap-2">
          <Icon
            fontSize={24}
            icon="ph:caret-left"
            className="cursor-pointer"
            onClick={() => dispactch(setActiveMenu(null))}
          />
          <span
            className="font-medium cursor-pointer"
            onClick={() => dispactch(setActiveMenu(null))}
          >
            Tất cả danh mục
          </span>
        </div>
        <div className="flex h-full w-full flex-col gap-4 py-5 border-gray-border desktop:border-l desktop:border-r overflow-y-scroll">
          <div className="flex h-fit flex-col gap-5 px-4 desktop:h-[11.75rem]">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-primary">
                Thương hiệu nổi bật
              </span>
              <span className="text-sm font-semibold text-txtthird cursor-pointer">
                Xem tất cả
              </span>
            </div>
            <div className="flex w-full flex-col gap-3">
              <div className="grid h-fit w-full grid-cols-2 gap-3 desktop:h-[6.75rem] desktop:grid-cols-4">
                {brands &&
                  brands.length > 0 &&
                  brands.map((brand, index) => (
                    <BrandsItem
                      key={index + "brandi"}
                      image={brand.thumbnail}
                      title={brand.name}
                      onClick={() =>
                        onChangeProvider({
                          label: brand.name,
                          value: brand.slug,
                        })
                      }
                    />
                  ))}
              </div>
              <span className="text-sm font-medium text-txtfourth">
                Xem thêm
              </span>
            </div>
          </div>
          <hr className="w-0.0625rem text-[#EBEBF0]" />
          <div className="flex h-fit flex-col gap-8 overflow-hidden desktop:h-[22.625rem]">
            <span className="text-lg font-semibold px-4">Theo sản phẩm</span>
            <div className="h-full overflow-y-scroll desktop:overflow-y-scroll scrollbar-thin scrollbar-track-transparent px-4">
              <div className="flex h-fit w-full flex-col gap-8">
                <div className="grid grid-cols-1 gap-2 desktop:grid-cols-3">
                  {isActive?.children?.map((type, index) => (
                    <TypeProduct
                      key={index}
                      title={type.name}
                      onClick={() =>
                        onChange({
                          label: type.name,
                          value: type.handle,
                        })
                      }
                    >
                      {type.children.map((item: any, index: any) => (
                        <TypeProductItem
                          key={index}
                          title={item.name}
                          onClick={() =>
                            onChange({
                              label: item.name,
                              value: item.handle,
                            })
                          }
                        />
                      ))}
                    </TypeProduct>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid h-full min-w-[17.75rem] grid-cols-2 gap-2 p-4 desktop:grid-cols-1">
          <CollectionItemSquare
            image={Batminton.src}
            title="Bộ sưu tập thu đông 2024"
          />
          <CollectionItemRectangle
            image={CoupleBatminton.src}
            title="Adidas Vacation Dream 2024"
          />
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
