import { parse } from "date-fns";

export const analyzeDateString = (dateString: string) => {
  if (!dateString || isNaN(Date.parse(dateString))) {
    throw new Error("Invalid date string provided");
  }

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return { day, month, year };
};

export const formatDateToDDMMYYYY = (dateString: string, prefix?: string) => {
  if (!dateString || isNaN(Date.parse(dateString))) {
    throw new Error("Invalid date string provided");
  }

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}${prefix || "/"}${month}${prefix || "/"}${year}`;
};

export function addDaysToDate(dateString: string, days: number): string {
  const date = new Date(dateString);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

export const convertStringToDate = (dateString: string) => {
  const date = new Date(dateString || new Date().toLocaleDateString());
  return date;
};

/**
 * The function `dateFormat` in TypeScript formats a Date object based on a provided format string
 * containing specific date tokens.
 * @param {Date} date - The `date` parameter is the date object that you want to format. It should be
 * an instance of the `Date` object in JavaScript.
 * @param {string} format - The `format` parameter in the `dateFormat` function is a string that
 * specifies how the date should be formatted. It can contain various tokens that will be replaced with
 * corresponding date values when formatting the date. Some common tokens include:
 * @returns The `dateFormat` function returns a formatted date string based on the provided `date`
 * object and `format` string. The function first validates the input parameters to ensure they are
 * valid. It then replaces specific tokens in the format string with corresponding date values from the
 * `date` object. Finally, it returns the formatted date string.
 */
export const dateFormator = (date: Date, format: string): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date object provided.");
  }

  if (typeof format !== "string" || format.trim().length === 0) {
    throw new Error("Invalid format string provided.");
  }

  const tokens: Record<string, string> = {
    yyyy: date.getFullYear().toString(),
    yy: date.getFullYear().toString().slice(-2),
    mm: String(date.getMonth() + 1).padStart(2, "0"),
    m: (date.getMonth() + 1).toString(),
    dd: String(date.getDate()).padStart(2, "0"),
    d: date.getDate().toString(),
    HH: String(date.getHours()).padStart(2, "0"),
    H: date.getHours().toString(),
    hh: String(date.getHours() % 12 || 12).padStart(2, "0"),
    h: (date.getHours() % 12 || 12).toString(),
    MM: String(date.getMinutes()).padStart(2, "0"),
    M: date.getMinutes().toString(),
    ss: String(date.getSeconds()).padStart(2, "0"),
    s: date.getSeconds().toString(),
    A: date.getHours() >= 12 ? "PM" : "AM",
    a: date.getHours() >= 12 ? "pm" : "am",
  };

  if (!/[yMdHmsA]/.test(format)) {
    throw new Error(
      "Invalid format string provided. Please use valid date tokens."
    );
  }

  return format.replace(
    /\b(yyyy|yy|mm|m|dd|d|HH|H|hh|h|MM|M|ss|s|A|a)\b/g,
    (match) => tokens[match] || match
  );
};

// Example Usage
// const now = new Date();

// console.log(dateFormat(now, "yyyy/mm/dd")); // "2025/01/06"
// console.log(dateFormat(now, "năm yyyy")); // "năm 2025"
// console.log(dateFormat(now, "ngày dd, tháng mm, năm yyyy")); // "ngày 06, tháng 01, năm 2025"
// console.log(dateFormat(now, "HH:MM:ss")); // "14:45:30" (example time)
// console.log(dateFormat(now, "hh:MM A")); // "02:45 PM"
// console.log(dateFormat(now, "hh:mm:ss A")); // "02:45:30 PM"
// console.log(dateFormat(now, "hh:mm:ss a")); // "02:45:30 pm"
// console.log(dateFormat(now, "hh:mm:ss a")); // "02:45:30 pm"
// console.log(dateFormat(now, "d/m/yyyy")); // "6/1/2025"
// console.log(dateFormat(now, "dd/mm/yy")); // "06/01/25"

export function parseDateWithOrdinal(dateString: string): Date | undefined {
  try {
    // Remove ordinal suffixes (e.g., "st", "nd", "rd", "th").
    const cleanedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
    // Parse the cleaned date string.
    const parsedDate = parse(cleanedDateString, "MMMM d, yyyy", new Date());

    // Validate if the parsing result is a valid Date object.
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format");
    }

    return parsedDate;
  } catch (err) {
    return undefined;
  }
}
