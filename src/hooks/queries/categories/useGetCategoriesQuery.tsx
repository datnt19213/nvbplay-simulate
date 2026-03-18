import { getCategoriesList } from "@/services/categories";
import { ProductCategory } from "@/types/categories/categories.type";
import { useQuery } from "@tanstack/react-query";

const useGetCategoriesQuery = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesList(),
  });

  return {
    ...query,
    data:
      (query?.data?.data.data.product_categories as ProductCategory[]) || [],
  };
};

export default useGetCategoriesQuery;
