import {ButtonCheck} from "@/components/base-components/buttons";
import {RootState} from "@/stores";
import {setFilterBuilder} from "@/stores/builder-slice";
import {translate} from "@/utilities/translator";
import {ChevronDown} from "lucide-react";
import React, {FC} from "react";
import {useSelector, useDispatch} from "react-redux";
import {FilterDropDown} from "../../elements/dropdown";

type BrandsFilterProps = {
  init_price_filter_min: number;
  init_price_filter_max: number;
  brandList: any[];
};
const BrandsFilter: FC<BrandsFilterProps> = ({
  init_price_filter_min,
  init_price_filter_max,
  brandList = [],
}) => {
  const {filters} = useSelector((state: RootState) => state.builder);
  const dispatch = useDispatch();
  const handleBrandsCheck = (str: string) => {
    filters?.brands && filters.brands.includes(str)
      ? dispatch(
          setFilterBuilder({
            ...filters,
            brands: filters.brands.filter((item) => item !== str),
          })
        )
      : dispatch(
          setFilterBuilder({
            ...filters,
            prices: filters?.prices || {
              from: init_price_filter_min,
              to: init_price_filter_max,
            },
            colors: filters?.colors || [],
            materials: filters?.materials || [],
            weights: filters?.weights || [],
            brands: [...(filters?.brands || []), str],
          })
        );
  };
  return (
    <FilterDropDown
      onReset={() =>
        dispatch(
          setFilterBuilder({
            ...filters,
            prices: filters?.prices || {
              from: init_price_filter_min,
              to: init_price_filter_max,
            },
            colors: filters?.colors || [],
            materials: filters?.materials || [],
            weights: filters?.weights || [],
            brands: [],
          })
        )
      }
      trigger={
        <div className="flex items-center justify-between select-none cursor-pointer  px-2.5 h-10 rounded-full border border-gray-border">
          <span className="font-medium text-sm truncate">
            {translate("brands")}
          </span>
          <ChevronDown size={20} />
        </div>
      }
      title={translate("brands")}
    >
      <div className="flex flex-col overflow-y-scroll scrollbar-none h-full max-h-[240px]">
        <div className="grid grid-cols-2 gap-2">
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "Adidas")}
            onChange={() => handleBrandsCheck("Adidas")}
            title={"Adidas"}
            name={"Adidas"}
            id={"Adidas"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "Lining")}
            onChange={() => handleBrandsCheck("Lining")}
            title={"Lining"}
            name={"Lining"}
            id={"Lining"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "Yonex")}
            onChange={() => handleBrandsCheck("Yonex")}
            title={"Yonex"}
            name={"Yonex"}
            id={"Yonex"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "Redson")}
            onChange={() => handleBrandsCheck("Redson")}
            title={"Redson"}
            name={"Redson"}
            id={"Redson"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "Ds")}
            onChange={() => handleBrandsCheck("Ds")}
            title={"Ds"}
            name={"Ds"}
            id={"Ds"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "Toalson")}
            onChange={() => handleBrandsCheck("Toalson")}
            title={"Toalson"}
            name={"Toalson"}
            id={"Toalson"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "Yibaolu")}
            onChange={() => handleBrandsCheck("Yibaolu")}
            title={"Yibaolu"}
            name={"Yibaolu"}
            id={"Yibaolu"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "MNJ")}
            onChange={() => handleBrandsCheck("MNJ")}
            title={"MNJ"}
            name={"MNJ"}
            id={"MNJ"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "MMM")}
            onChange={() => handleBrandsCheck("MMM")}
            title={"MMM"}
            name={"MMM"}
            id={"MMM"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "AAA")}
            onChange={() => handleBrandsCheck("AAA")}
            title={"AAA"}
            name={"AAA"}
            id={"AAA"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "BBB")}
            onChange={() => handleBrandsCheck("BBB")}
            title={"BBB"}
            name={"BBB"}
            id={"BBB"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "CCC")}
            onChange={() => handleBrandsCheck("CCC")}
            title={"CCC"}
            name={"CCC"}
            id={"CCC"}
          />
          <ButtonCheck
            isChecked={filters?.brands.some((filter) => filter === "DDD")}
            onChange={() => handleBrandsCheck("DDD")}
            title={"DDD"}
            name={"DDD"}
            id={"DDD"}
          />
        </div>
      </div>
    </FilterDropDown>
  );
};

export default BrandsFilter;
