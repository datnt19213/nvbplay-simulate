import {AdjustColorBrightness} from "@/utilities/text-to-color";
import React, {FC, ReactNode} from "react";

/**
 * The type `AvatarProps` defines props for an Avatar component in TypeScript React, including options
 * for className, rounded corners, children, background color, size, text size, and brightness.
 * @property {string} className - The `className` property in the `AvatarProps` type is used to specify
 * additional CSS classes for styling the avatar component. It is optional and can be a string value.
 * @property {boolean} rounded - The `rounded` property in the `AvatarProps` type specifies whether the
 * avatar should have rounded corners or not. If `rounded` is set to `true`, the avatar will have
 * rounded corners, and if it's set to `false` or not provided, the avatar will have regular (non
 * @property {ReactNode} children - The `children` property in the `AvatarProps` type is of type
 * `ReactNode`. This means that the `children` prop can accept any valid React node as its value, such
 * as a string, number, element, or an array of elements. It is commonly used to pass components or
 * @property {any} backgroundColor - The `backgroundColor` property in the `AvatarProps` type specifies
 * the background color of the avatar component. It is of type `any`, which means it can accept any
 * valid CSS color value such as hex, rgb, or color names.
 * @property {"xs" | "sm" | "md" | "lg" | "xl" | "2xl"} size - The `size` property in the `AvatarProps`
 * type defines the size options available for the Avatar component. The possible values for `size`
 * are:
 * @property {"xs" | "sm" | "md" | "lg" | "xl" | "2xl"} sizeText - The `sizeText` property in the
 * `AvatarProps` type specifies the size of the text within the avatar component. It can have the
 * following values: "xs", "sm", "md", "lg", "xl", or "2xl" to determine the text size within the
 * avatar.
 * @property {| "-1"
 *     | "-0.9"
 *     | "-0.8"
 *     | "-0.7"
 *     | "-0.6"
 *     | "-0.5"
 *     | "-0.4"
 *     | "-0.3"
 *     | "-0.2"
 *     | "-0.1"
 *     | "0"
 *     | "0.1"
 *     | "0.2"
 *     | "0.3"
 *     | "0.4"
 *     | "0.5"
 *     | "0.6"
 *     | "0.7"
 *     | "0.8"
 *     | "0.9"
 *     | "1"} brightness - The `brightness` property in the `AvatarProps` type specifies the brightness
 * level for the avatar. It accepts values ranging from "-1" (very dark) to "1" (very bright) in
 * increments of 0.1. This property can be used to adjust the brightness of the avatar
 */
type AvatarProps = {
  className?: string;
  rounded?: boolean;
  children: ReactNode;
  backgroundColor?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  sizeText?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  brightness?:
    | "-1"
    | "-0.9"
    | "-0.8"
    | "-0.7"
    | "-0.6"
    | "-0.5"
    | "-0.4"
    | "-0.3"
    | "-0.2"
    | "-0.1"
    | "0"
    | "0.1"
    | "0.2"
    | "0.3"
    | "0.4"
    | "0.5"
    | "0.6"
    | "0.7"
    | "0.8"
    | "0.9"
    | "1";
};

/**
 * The function `BrightnessValid` validates a given string value as a brightness number within the
 * range of -1 to 1 in TypeScript.
 * @param {string} value - The `value` parameter in the `BrightnessValid` function is expected to be a
 * string representing a brightness value.
 * @returns The function `BrightnessValid` returns a number value if the input string can be parsed to
 * a number between -1 and 1.
 */
const BrightnessValid = (value: string): number => {
  const numValue = parseFloat(value);
  if (numValue >= -1 && numValue <= 1) {
    return numValue;
  } else {
    throw new Error("Invalid brightness value. It must be between -1 and 1.");
  }
};

const Gavatar: FC<AvatarProps> = ({
  backgroundColor,
  children,
  className,
  rounded = true,
  size = "md",
  sizeText = "md",
  brightness = "-0.2",
}) => {
  const isText = typeof children === "string" || typeof children === "number";
  const isSize =
    size === "xs"
      ? "min-w-4 min-h-4"
      : size === "sm"
        ? "min-w-8 min-h-8"
        : size === "md"
          ? "min-w-12 min-h-12"
          : size === "lg"
            ? "min-w-16 min-h-16"
            : size === "xl"
              ? "min-w-24 min-h-24"
              : size === "2xl"
                ? "min-w-32 min-h-32"
                : "min-w-4 min-h-4";
  const isSizeText =
    sizeText === "xs"
      ? "text-xs"
      : sizeText === "sm"
        ? "text-sm"
        : sizeText === "md"
          ? "text-base"
          : sizeText === "lg"
            ? "text-2xl"
            : sizeText === "xl"
              ? "text-4xl"
              : sizeText === "2xl"
                ? "text-5xl"
                : "text-xs";
  const isBrightness = BrightnessValid(brightness);
  return (
    <div
      className={` aspect-square ${isSize} overflow-hidden w-fit ${
        rounded && "rounded-full"
      } flex items-center justify-center font-bold p-1.5 ${className}`}
      style={{
        backgroundColor: `${backgroundColor}`,
      }}
    >
      {isText ? (
        <p
          className={`text-nowrap font-bold pointer-events-none cursor-default select-none ${isSizeText}`}
          style={{
            color: `${AdjustColorBrightness(backgroundColor, isBrightness)}`,
          }}
        >
          {children}
        </p>
      ) : (
        children
      )}
    </div>
  );
};

export default Gavatar;
