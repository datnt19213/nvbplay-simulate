import arrowRightIcon from "@/assets/icons/arrow-right-icon.svg";
import houseIcon from "@/assets/icons/building-store-icon.svg";
import { RootState } from "@/stores";
import {
  setSelectedColor,
  setSelectedSize,
  setSelectedWeight,
  setVariant,
} from "@/stores/detail-product-slice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorContainer2 from "./color-container-2";
import SizeContainer from "./size-container";
import WeightContainer from "./weight-container";
import { cn } from "@/lib/utils";
import { ButtonCheck } from "@/components/base-components/buttons";
import { useSearchParams } from "next/navigation";

const isColorOption = (title: string) => {
  const colorKeywords = ["màu", "color", "màu sắc", "colour"];
  return colorKeywords.some((keyword) =>
    title.toLowerCase().includes(keyword.toLowerCase())
  );
};
const isSizeOption = (title: string) => {
  const sizeKeywords = ["size", "kích thước", "kích cỡ"];
  return sizeKeywords.some((keyword) =>
    title.toLowerCase().includes(keyword.toLowerCase())
  );
};

const isWeightOption = (title: string) => {
  const boundedKeywords = ["Trọng lượng", "trọng lượng", "weight"];
  return boundedKeywords.some((keyword) =>
    title.toLowerCase().includes(keyword.toLowerCase())
  );
};

const VariantContainer2: React.FC = () => {
  // Reudx
  const data = useSelector((state: RootState) => state.detail_product.data)!;
  const dispatch = useDispatch();
  const variantId = useSearchParams().get("variantId");

  // State
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  // Logic
  const selectedVariant = useMemo(() => {
    if (
      !data?.variants ||
      !data.options ||
      Object.keys(selectedOptions).length !== data.options?.length
    ) {
      return;
    }

    return data.variants.find((variant) =>
      variant.options?.every(
        (optionValue) =>
          optionValue.value === selectedOptions[optionValue.option_id!]
      )
    );
  }, [selectedOptions, data]);

  const handleSetColor = (color: string) => {
    dispatch(setSelectedColor(color));
  };

  const handleSetSize = (size: string) => {
    dispatch(setSelectedSize(size));
  };

  const handleSetWeight = (weight: string) => {
    dispatch(setSelectedWeight(weight));
  };

  //   const renderOptionComponent = (option: any) => {
  //     if (isColorOption(option.title)) {
  //       return (
  //         <ColorContainer2
  //           handleSetColor={(color) => {
  //             handleSetColor(color);
  //             setSelectedOptions((prev) => ({
  //               ...prev,
  //               [option.id!]: color,
  //             }));
  //           }}
  //           colors={option.values?.map((value: any) => value.value) || []}
  //         />
  //       );
  //     }

  //     if (isSizeOption(option.title)) {
  //       return (
  //         <SizeContainer
  //           handleSetSize={(size) => {
  //             handleSetSize(size);
  //             setSelectedOptions((prev) => ({
  //               ...prev,
  //               [option.id!]: size,
  //             }));
  //           }}
  //           sizeItems={option.values?.map((value: any) => value.value) || []}
  //         />
  //       );
  //     }

  //     if (isWeightOption(option.title)) {
  //       return (
  //         <WeightContainer
  //           weightItems={option.values?.map((value: any) => value.value) || []}
  //           handleSetWeight={(weight) => {
  //             handleSetWeight(weight);
  //             setSelectedOptions((prev) => ({
  //               ...prev,
  //               [option.id!]: weight,
  //             }));
  //           }}
  //         />
  //       );
  //     }
  //     return null;
  //   };

  //  Effect
  useEffect(() => {
    // selectedVariant && dispatch(setVariant(selectedVariant));
    dispatch(setVariant(selectedVariant || undefined));
  }, [selectedVariant]);

  //   useEffect(() => {
  //     if (data?.variants?.length > 0) {
  //       dispatch(setVariant(data.variants[0]));
  //       // Set selected first option
  //       setSelectedOptions(
  //         data.variants[0].options.reduce(
  //           (acc, option) => {
  //             acc[option.option_id!] = option.value;
  //             return acc;
  //           },
  //           {} as Record<string, string>
  //         )
  //       );
  //     }
  //   }, [data]);

  useEffect(() => {
    if (variantId && data?.variants?.length > 0) {
      dispatch(setVariant(data.variants.find((v) => v.id === variantId)));
      const variant = data.variants.find((v) => v.id === variantId);
      if (variant) {
        setSelectedOptions(
          variant?.options.reduce(
            (acc, option) => {
              acc[option.option_id!] = option.value;
              return acc;
            },
            {} as Record<string, string>
          )
        );
      }
    }
  }, [variantId, data]);

  return (
    <div className="space-y-[28px]">
      <div className="space-y-[28px]">
        {data?.options?.map((option) => {
          return (
            <div key={option.id} className="flex flex-col gap-2">
              <h3 className="text-sm font-[500]">
                {option.title}: {selectedOptions[option.id!]}
              </h3>
              <div className="flex flex-wrap gap-[8px]">
                {option.values?.map((value, index) => (
                  <ButtonCheck
                    title={value.value}
                    name={option.title}
                    id={value.id}
                    // disabled={
                    //   Number(selectedVariant?.stocked_quantity) -
                    //     Number(selectedVariant?.reserved_quantity) <=
                    //   0
                    // }
                    key={index}
                    onChange={() => {}}
                    isChecked={selectedOptions[option.id!] === value.value}
                    onClick={() => {
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [option.id!]: value.value,
                      }));
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-[8px] text-[14px] leading-[21px] items-center">
        <Image src={houseIcon} alt="icon" width={20} height={20} />
        <div className=" text-[#515158]">
          Có sẵn
          <span className="text-[#27272A] font-[700] px-1">
            {" "}
            {selectedVariant?.stocked_quantity
              ? Number(selectedVariant?.stocked_quantity) -
                Number(selectedVariant?.reserved_quantity)
              : 0}
          </span>
          tại cửa hàng
        </div>
        <Link href={"#"} className="text-[#0b74e5] flex font-[600] gap-[6px]">
          Xem chi tiết
          <Image src={arrowRightIcon} alt="icon" width={20} height={20} />
        </Link>
      </div>
    </div>
  );
};

export default VariantContainer2;
