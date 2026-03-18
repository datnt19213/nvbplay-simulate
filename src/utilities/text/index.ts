/**
 * Capitalize the first letter of a string
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export function CapitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * The function `CleanStringRoute` removes "/content/" from the input string and then removes all
 * hyphens from the resulting string.
 * @param {string} input - The `CleanStringRoute` function takes a string input and removes any
 * occurrences of "/content/" and all hyphens ("-") from the input string before returning the cleaned
 * string.
 * @returns The function CleanStringRoute is removing "/content/" from the input string and then
 * removing any dashes ("-") by splitting the string at each dash and joining the parts back together.
 * The cleaned string is then returned.
 */
export function CleanStringRoute(
  input: string,
  isCapitalizeFirstLetter?: boolean
): string {
  const withoutContent = input.replace("/content/", "");
  const cleanedString = withoutContent.split("-").join(" ");

  return isCapitalizeFirstLetter
    ? CapitalizeFirstLetter(cleanedString)
    : cleanedString;
}

/**
 * The function `FormatWithComma` takes a number as input and returns a string representation of the
 * number with commas added for every three digits.
 * @param {number} num - The `num` parameter in the `FormatWithComma` function is a number that you
 * want to format with commas for better readability.
 * @returns The function `FormatWithComma` takes a number as input, converts it to a string, and then
 * uses a regular expression to insert commas for every three digits in the number. The function
 * returns the formatted number as a string with commas inserted.
 */
export function FormatWithComma(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * The function FormatWithDot takes a number as input and returns a string representation of the number
 * with dots as thousand separators.
 * @param {number} num - The `FormatWithDot` function takes a number as input and formats it by adding
 * a dot as a thousands separator.
 * @returns The function `FormatWithDot` takes a number as input, converts it to a string, and then
 * uses a regular expression to insert a dot (".") as a thousands separator. The function returns the
 * formatted number with dots as separators.
 */
export function FormatWithDot(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * The `FormatCurrency` function in TypeScript formats a number as currency in Vietnamese dong with an
 * option to use commas for decimal points.
 * @param {number} num - The `num` parameter in the `FormatCurrency` function represents the number
 * that you want to format as a currency value.
 * @param [useComma=true] - The `useComma` parameter in the `FormatCurrency` function is a boolean
 * parameter that determines whether the formatted currency should use a comma as the decimal
 * separator. If `useComma` is set to `true`, the formatted currency will use a comma as the decimal
 * separator. If `use
 * @returns The `FormatCurrency` function returns a formatted currency string based on the input number
 * `num`. The currency format is in Vietnamese Dong (VND) with no decimal places. If the `useComma`
 * parameter is set to `true`, the function replaces the decimal point with a comma in the formatted
 * string before returning it.
 */
export function FormatCurrency(num: number, useComma = true) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(num).replace(".", useComma ? "," : ".");
}

/**
 * The function `ReplaceString` takes a string, replaces specified substrings or patterns with optional
 * spaces, and returns the modified string.
 * @param {string} str - The `str` parameter in the `ReplaceString` function is the original string
 * that you want to perform replacements on.
 * @param {string | string[] | RegExp} [replaceStr] - The `replaceStr` parameter in the `ReplaceString`
 * function is the string, array of strings, or regular expression that you want to replace in the
 * input string `str`. If `replaceStr` is not provided or is `undefined`, the function will return the
 * original input string `str`
 * @param {boolean} [replaceWithSpace=false] - The `replaceWithSpace` parameter in the `ReplaceString`
 * function determines whether the matched substrings should be replaced with a space character or
 * completely removed. If `replaceWithSpace` is set to `true`, the matched substrings will be replaced
 * with a space character. If it is set to
 * @returns The function `ReplaceString` returns a cleaned string with specified replacements applied,
 * and leading and trailing whitespaces removed.
 */
export function ReplaceString(
  str: string,
  replaceStr?: string | string[] | RegExp,
  replaceWithSpace: boolean = false
): string {
  if (!replaceStr) return str;

  let cleanedString = str;

  if (replaceStr instanceof RegExp) {
    const replacement = replaceWithSpace ? " " : "";
    cleanedString = cleanedString.replace(replaceStr, replacement);
  } else {
    const replaceArray = Array.isArray(replaceStr) ? replaceStr : [replaceStr];

    for (const replaceItem of replaceArray) {
      const replacement = replaceWithSpace ? " " : "";
      cleanedString = cleanedString.replace(
        new RegExp(replaceItem, "g"),
        replacement
      );
    }
  }

  return cleanedString.trim();
}

export function FormatToThousands(value: number) {
  if (value >= 1_000_000) {
    // Million
    return `${Math.floor(value / 1_000_000)}tr`;
  } else if (value >= 10_000) {
    // Thousands (>= 10,000)
    return `${Math.floor(value / 1_000)}K`;
  } else {
    // Less than 10,000
    return value.toLocaleString(); // Format with thousand separator
  }
}

/**
 * The type `GetStringProps` in TypeScript defines an object with a required `str` property of type
 * string, and optional `start` and `length` properties of type number.
 * @property {string} str - The `str` property in the `GetStringProps` type represents a string value.
 * @property {number} start - The `start` property in the `GetStringProps` type specifies the starting
 * index from which to extract a substring from the `str` property. If `start` is not provided, the
 * substring extraction will start from the beginning of the string.
 * @property {number} length - The `length` property in the `GetStringProps` type specifies the number
 * of characters to extract from the string starting from the `start` index. If the `length` property
 * is not provided, it will extract characters from the `start` index to the end of the string.
 */
type GetStrProps = {
  str: string;
  start?: number;
  length?: number;
};

export function GetStr({str, start = 0, length = 0}: GetStrProps) {
  return length > 0 ? str.substring(start, start + length) : str;
}

/**
 * The `MaskStringProps` type defines properties for masking characters in a string with optional
 * configurations.
 * @property {string} input - The `input` property in the `MaskStringProps` type represents the string
 * that you want to apply masking to.
 * @property {string} charsToMask - The `charsToMask` property in the `MaskStringProps` type specifies
 * the characters that should be masked in the `input` string. These characters will be replaced with
 * the `maskChar` character when the string is processed according to the specified masking rules.
 * @property {string} maskChar - The `maskChar` property in the `MaskStringProps` type represents the
 * character that will be used to mask the characters in the input string based on the `charsToMask`
 * property. If the `maskChar` is not provided, a default masking character can be used instead.
 * @property {number} maskLength - The `maskLength` property in the `MaskStringProps` type specifies
 * the number of characters to mask in the input string. This property allows you to define how many
 * characters should be replaced with the mask character when masking certain parts of the input
 * string.
 * @property {"single" | "multi"} mode - The `mode` property in the `MaskStringProps` type specifies
 * whether the masking operation should be applied in "single" or "multi" mode.
 * @property {boolean} isSummary - The `isSummary` property in the `MaskStringProps` type is a boolean
 * flag that indicates whether the masked string should be displayed as a summary or not. If
 * `isSummary` is set to `true`, it typically means that only a summarized version of the masked string
 * should be displayed,
 */
type MaskStringProps = {
  input: string;
  charsToMask: string;
  maskChar?: string;
  maskLength?: number;
  mode?: "single" | "multi";
  isSummary?: boolean;
};

export function MaskString({
  input = "",
  charsToMask = "",
  maskChar = "*",
  maskLength = 0,
  mode = "single",
  isSummary = false,
}: MaskStringProps) {
  if (!input || !charsToMask || (mode === "multi" && maskLength <= 0)) {
    return input;
  }

  const maskSet = new Set(charsToMask);
  let result = "";
  let maskBuffer = "";
  let seenSegments = new Set();

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (maskSet.has(char)) {
      maskBuffer += char;
    } else {
      if (maskBuffer.length > 0) {
        let maskSegment = "";
        if (mode === "multi") {
          maskSegment = maskChar.repeat(
            Math.min(maskBuffer.length, maskLength)
          );
        } else {
          maskSegment = maskBuffer
            .split("")
            .map(() => maskChar)
            .join("");
        }

        if (isSummary && !seenSegments.has(maskSegment)) {
          result += maskSegment;
          seenSegments.add(maskSegment);
        } else if (!isSummary) {
          result += maskSegment;
        }

        maskBuffer = "";
      }
      result += char;
    }
  }

  // Xử lý phần còn lại nếu có
  if (maskBuffer.length > 0) {
    let maskSegment = "";
    if (mode === "multi") {
      maskSegment = maskChar.repeat(Math.min(maskBuffer.length, maskLength));
    } else {
      maskSegment = maskBuffer
        .split("")
        .map(() => maskChar)
        .join("");
    }

    if (isSummary && !seenSegments.has(maskSegment)) {
      result += maskSegment;
      seenSegments.add(maskSegment);
    } else if (!isSummary) {
      result += maskSegment;
    }
  }

  return result.replace(/\s+/g, " ").trim();
}

/**
 * The `convertToSlug` function takes a string input and converts it into a slug by replacing spaces
 * with dashes, removing non-word characters, and trimming any extra dashes at the beginning or end.
 * @param {string} text - The `convertToSlug` function takes a `text` parameter as input, which is
 * expected to be a string. This function converts the input text into a slug format suitable for URLs
 * by performing the following operations:
 * @returns The `convertToSlug` function returns a slug version of the input text by converting it to
 * lowercase, replacing spaces with dashes, removing all non-word characters, replacing multiple dashes
 * with a single dash, and trimming any leading or trailing dashes.
 */
export const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
