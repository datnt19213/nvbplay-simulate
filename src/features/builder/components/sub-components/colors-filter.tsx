import {ButtonCheck} from "@/components/base-components/buttons";
import {RootState} from "@/stores";
import {setFilterBuilder} from "@/stores/builder-slice";
import {translate} from "@/utilities/translator";
import {ChevronDown} from "lucide-react";
import React, {FC} from "react";
import {useSelector, useDispatch} from "react-redux";
import {FilterDropDown} from "../../elements/dropdown";
import ColorPalette from "@/components/base-components/color";
import {filter} from "@prismicio/client";

type ColorsFilterProps = {
  init_price_filter_min: number;
  init_price_filter_max: number;
  colorList: any[];
};
const ColorsFilter: FC<ColorsFilterProps> = ({
  init_price_filter_min,
  init_price_filter_max,
  colorList = [],
}) => {
  const {filters} = useSelector((state: RootState) => state.builder);
  const dispatch = useDispatch();

  const arraysEqual = (arr1: string[], arr2: string[]) =>
    arr1.length === arr2.length &&
    arr1.every((val, index) => val === arr2[index]);

  const handleColorsCheck = (value: string[]) => {
    filters?.colors &&
    filters.colors.some((colorArray) => arraysEqual(colorArray, value))
      ? dispatch(
          setFilterBuilder({
            ...filters,
            colors: filters.colors.filter(
              (colorArray) => !arraysEqual(colorArray, value)
            ),
          })
        )
      : dispatch(
          setFilterBuilder({
            ...filters,
            prices: filters?.prices || {
              from: init_price_filter_min,
              to: init_price_filter_max,
            },
            colors: [...(filters?.colors || []), value],
            materials: filters?.materials || [],
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
            colors: [],
            materials: filters?.materials || [],
            weights: filters?.weights || [],
            brands: filters?.brands || [],
          })
        )
      }
      trigger={
        <div className="flex items-center justify-between select-none cursor-pointer  px-2.5 h-10 rounded-full border border-gray-border">
          <span className="font-medium text-sm truncate">
            {translate("colors")}
          </span>
          <ChevronDown size={20} />
        </div>
      }
      title={translate("colors")}
    >
      <div className="flex flex-col overflow-y-scroll scrollbar-none h-full max-h-[240px]">
        <div className="flex flex-wrap gap-2">
          <ColorPalette
            active={filters?.colors.some((colorArray) =>
              arraysEqual(colorArray, ["#ffffff"])
            )}
            colors={["#ffffff"]}
            onClick={() => handleColorsCheck(["#ffffff"])}
          />
          <ColorPalette
            active={filters?.colors.some((colorArray) =>
              arraysEqual(colorArray, ["#0fffff", "#ffffaf"])
            )}
            colors={["#0fffff", "#ffffaf"]}
            onClick={() => handleColorsCheck(["#0fffff", "#ffffaf"])}
          />
          <ColorPalette
            active={filters?.colors.some((colorArray) =>
              arraysEqual(colorArray, ["#fbbfff", "#ab12aa"])
            )}
            colors={["#fbbfff", "#ab12aa"]}
            onClick={() => handleColorsCheck(["#fbbfff", "#ab12aa"])}
          />
          <ColorPalette
            active={filters?.colors.some((colorArray) =>
              arraysEqual(colorArray, ["#f9ff9f"])
            )}
            colors={["#f9ff9f"]}
            onClick={() => handleColorsCheck(["#f9ff9f"])}
          />
          <ColorPalette
            active={filters?.colors.some((colorArray) =>
              arraysEqual(colorArray, ["#cc3270"])
            )}
            colors={["#cc3270"]}
            onClick={() => handleColorsCheck(["#cc3270"])}
          />
          <ColorPalette
            active={filters?.colors.some((colorArray) =>
              arraysEqual(colorArray, ["#000000", "#ffaaa2"])
            )}
            colors={["#000000", "#ffaaa2"]}
            onClick={() => handleColorsCheck(["#000000", "#ffaaa2"])}
          />
          <ColorPalette
            active={filters?.colors.some((colorArray) =>
              arraysEqual(colorArray, ["#9acb06"])
            )}
            colors={["#9acb06"]}
            onClick={() => handleColorsCheck(["#9acb06"])}
          />
        </div>
      </div>
    </FilterDropDown>
  );
};

export default ColorsFilter;
