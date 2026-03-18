// List of supported currency codes (ISO 4217)
type CurrencyCode =
  | "USD" // US Dollar
  | "VND" // Vietnamese Dong
  | "EUR" // Euro
  | "GBP" // British Pound
  | "JPY" // Japanese Yen
  | "AUD" // Australian Dollar
  | "CAD" // Canadian Dollar
  | "CNY" // Chinese Yuan
  | "KRW" // South Korean Won
  | "INR" // Indian Rupee
  | "BRL"; // Brazilian Real

// List of common locales
type Locale =
  | "en-US" // English (United States)
  | "vi-VN" // Vietnamese (Vietnam)
  | "fr-FR" // French (France)
  | "de-DE" // German (Germany)
  | "ja-JP" // Japanese (Japan)
  | "zh-CN" // Chinese (China)
  | "ko-KR" // Korean (South Korea)
  | "es-ES"; // Spanish (Spain)

// Options for formatting numbers
interface FormatNumberOptions {
  mode?: "short" | "currency" | "percentage" | "custom"; // Formatting mode
  customSuffixes?: string[]; // Custom suffixes for 'short' or 'custom' mode
  customFormat?: (n: number) => string; // Custom formatter function for 'custom' mode
  currency?: CurrencyCode; // ISO currency code (used in 'currency' mode)
  locale?: Locale; // Locale for formatting (used in 'currency' or 'percentage' mode)
  delimiter?: "," | "."; // Decimal delimiter (used in 'short' mode)
  precision?: number; // Number of decimal places
  unit?: string; // Additional unit to append (e.g., 'kg', 'm')
  showUnit?: boolean; // Whether to display the unit
}

/**
 * The function `formatNumber` in TypeScript provides flexible number formatting options including
 * short, currency, percentage, and custom modes with support for different locales and units.
 * @param {number} num - The `num` parameter in the `formatNumber` function represents the number that
 * you want to format. It is the numerical value that you want to convert into a formatted string
 * according to the specified options.
 * @param {FormatNumberOptions} options - The `options` parameter in the `formatNumber` function allows
 * you to customize the formatting of a number based on various settings. Here are the available
 * options:
 * @returns The `formatNumber` function returns a formatted string representation of a number based on
 * the specified formatting options. The returned value could be a compact number with suffixes (e.g.,
 * 1.2K, 3.4M), a currency formatted string, a percentage string, or a custom formatted string based on
 * the mode specified in the options. If the number is invalid (NaN), it
 */
export function formatNumber(
  num: number,
  options: FormatNumberOptions = {}
): string {
  const {
    mode = "short", // Default mode is 'short'
    customSuffixes = ["", "K", "M", "B", "T"], // Default suffixes for short formatting
    customFormat, // Custom formatting function for 'custom' mode
    currency = "VND", // Default currency (USD)
    locale = "en-US", // Default locale (English - United States)
    delimiter = ",", // Default decimal delimiter
    precision = 1, // Default number of decimal places
    unit = "", // Default unit (none)
    showUnit = false, // By default, do not show the unit
  } = options;

  // Return 0 for invalid numbers
  if (isNaN(num)) return "0";

  let formatted = "";

  switch (mode) {
    case "short": {
      // Compact number formatting with suffixes (e.g., 1.2K, 3.4M)
      let i = 0;
      while (num >= 1000 && i < customSuffixes.length - 1) {
        num /= 1000;
        i++;
      }
      // Replace '.' with the specified delimiter
      formatted =
        num.toFixed(precision).replace(".", delimiter) + customSuffixes[i];
      break;
    }

    case "currency": {
      // Format as a currency using Intl.NumberFormat
      formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(num);
      break;
    }

    case "percentage": {
      // Format as a percentage
      formatted = `${(num * 100).toFixed(precision)}%`;
      break;
    }

    case "custom": {
      // Custom formatting logic
      if (customFormat) {
        formatted = customFormat(num);
      } else {
        formatted = num.toString();
      }
      break;
    }

    default:
      formatted = num.toString();
  }

  // Append unit if specified and showUnit is true
  if (showUnit && unit) {
    formatted += ` ${unit}`;
  }

  return formatted;
}

// // Examples:

// // 1. Compact number formatting with unit
// console.log(formatNumber(1234567, { mode: 'short', unit: 'kg', showUnit: true }));
// // Output: "1.23M kg"

// // 2. Currency formatting with locale
// console.log(formatNumber(12345, { mode: 'currency', currency: 'VND', locale: 'vi-VN' }));
// // Output: "12.345 ₫"

// // 3. Percentage formatting
// console.log(formatNumber(0.56789, { mode: 'percentage', precision: 1 }));
// // Output: "56.8%"

// // 4. Custom formatting
// console.log(formatNumber(12345, {
//   mode: 'custom',
//   customFormat: (n) => `${n.toLocaleString()} 🚀`
// }));
// // Output: "12,345 🚀"

// // 5. Custom suffixes for compact number formatting
// console.log(formatNumber(1234567, {
//   mode: 'short',
//   customSuffixes: ['', 'ngàn', 'triệu', 'tỷ']
// }));
// // Output: "1.23 triệu"
