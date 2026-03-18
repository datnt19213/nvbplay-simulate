import {ButtonCheck} from "@/components/base-components/buttons";
import {RootState} from "@/stores";
import {setFilterBuilder} from "@/stores/builder-slice";
import {translate} from "@/utilities/translator";
import {ChevronDown} from "lucide-react";
import React, {FC} from "react";
import {useSelector, useDispatch} from "react-redux";
import {FilterDropDown} from "../../elements/dropdown";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

type MaterialsFilterProps = {
  init_price_filter_min: number;
  init_price_filter_max: number;
  materialList: any[];
};
const MaterialsFilter: FC<MaterialsFilterProps> = ({
  init_price_filter_min,
  init_price_filter_max,
  materialList = [],
}) => {
  const {filters} = useSelector((state: RootState) => state.builder);
  const dispatch = useDispatch();
  const handleMaterialsCheck = (str: string) => {
    filters?.materials && filters.materials.includes(str)
      ? dispatch(
          setFilterBuilder({
            ...filters,
            materials: filters.materials.filter((item) => item !== str),
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
            materials: [...(filters?.materials || []), str],
            weights: filters?.weights || [],
            brands: filters?.brands || [],
          })
        );
  };
  const handleMaterialsAll = (checked: boolean) => {
    const tempList =
      materialList?.length > 0
        ? materialList
        : ["cotton-fiber", "wood", "aluminum"];
    if (tempList.length > 0 && checked) {
      dispatch(
        setFilterBuilder({
          ...filters,
          prices: filters?.prices || {
            from: init_price_filter_min,
            to: init_price_filter_max,
          },
          colors: filters?.colors || [],
          materials: tempList,
          weights: filters?.weights || [],
          brands: filters?.brands || [],
        })
      );
      return;
    }
    dispatch(
      setFilterBuilder({
        ...filters,
        prices: filters?.prices || {
          from: init_price_filter_min,
          to: init_price_filter_max,
        },
        colors: filters?.colors || [],
        materials: [],
        weights: filters?.weights || [],
        brands: filters?.brands || [],
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
            materials: [],
            weights: filters?.weights || [],
            brands: filters?.brands || [],
          })
        )
      }
      trigger={
        <div className="flex items-center justify-between select-none cursor-pointer px-2.5 h-10 rounded-full border border-gray-border">
          <span className="font-medium text-sm truncate">
            {translate("materials")}
          </span>
          <ChevronDown size={20} />
        </div>
      }
      title={translate("materials")}
    >
      <div className="flex flex-col overflow-y-scroll scrollbar-none h-full max-h-[240px]">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor={`cbx-${"all"}`}
            className="text-sm font-medium flex items-center gap-2 cursor-pointer w-fit"
          >
            <Checkbox
              id={`cbx-${"all"}`}
              className="rounded-full data-[state=checked]:bg-txtprimary border-gray-border"
              // checked={filters?.materials.length === materialList?.length} //will used when material list has api data
              checked={
                filters?.materials.length ===
                ["cotton-fiber", "wood", "aluminum"].length
              }
              onCheckedChange={(checked: boolean) =>
                handleMaterialsAll(checked)
              }
            />{" "}
            All
          </Label>
          <Label
            htmlFor={`cbx-${"cotton-fiber"}`}
            className="text-sm font-medium flex items-center gap-2 cursor-pointer w-fit"
          >
            <Checkbox
              className=" data-[state=checked]:bg-txtprimary border-gray-border"
              id={`cbx-${"cotton-fiber"}`}
              checked={filters?.materials.some(
                (material) => material === "cotton-fiber"
              )}
              onCheckedChange={(checked) =>
                handleMaterialsCheck("cotton-fiber")
              }
            />{" "}
            Cotton Fiber
          </Label>
          <Label
            htmlFor={`cbx-${"wood"}`}
            className="text-sm font-medium flex items-center gap-2 cursor-pointer w-fit"
          >
            <Checkbox
              className=" data-[state=checked]:bg-txtprimary border-gray-border"
              id={`cbx-${"wood"}`}
              checked={filters?.materials.some(
                (material) => material === "wood"
              )}
              onCheckedChange={(checked) => handleMaterialsCheck("wood")}
            />{" "}
            Wood
          </Label>
          <Label
            htmlFor={`cbx-${"aluminum"}`}
            className="text-sm font-medium flex items-center gap-2 cursor-pointer w-fit"
          >
            <Checkbox
              className=" data-[state=checked]:bg-txtprimary border-gray-border"
              id={`cbx-${"aluminum"}`}
              checked={filters?.materials.some(
                (material) => material === "aluminum"
              )}
              onCheckedChange={(checked) => handleMaterialsCheck("aluminum")}
            />{" "}
            Aluminum
          </Label>
        </div>
      </div>
    </FilterDropDown>
  );
};

export default MaterialsFilter;
