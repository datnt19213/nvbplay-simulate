import {
  AdjustColorBrightness,
  GetBgColorFromFirstVowel,
} from "../text-to-color";

/**
 * This function generates a URL for an avatar image based on the provided first and last names.
 * It uses the Iranian Liara Avatar service to create the image.
 *
 * @param firstName - The first name of the person whose avatar is to be generated.
 * @param lastName - The last name of the person whose avatar is to be generated.
 *
 * @returns A string representing the URL of the avatar image.
 * The URL is constructed by concatenating the first and last names with a '+' character,
 * and passing this as the 'username' query parameter to the Iranian Liara Avatar service.
 *
 * @example
 */
export const ImageWithString = (str_1: string, str_2: string) => {
  // return `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
  return `https://ui-avatars.com/api/?name=${str_1}+${str_2}&rounded=true&background=${GetBgColorFromFirstVowel(str_1 || str_2).replace("#", "")}&color=${AdjustColorBrightness(GetBgColorFromFirstVowel(str_1 || str_2), -0.3).replace("#", "")}&bold=true`;
};

/**
 * The function `getImageDimensions` takes a File object representing an image file and returns a
 * Promise that resolves with the width and height of the image.
 * @param {File} file - The `file` parameter in the `getImageDimensions` function is expected to be a
 * `File` object, which represents a file from the user's system that can be accessed by the browser.
 * In this context, the function is specifically designed to handle image files for retrieving their
 * dimensions (width and height
 * @returns The `getImageDimensions` function returns a Promise that resolves to an object containing
 * the width and height of the image file provided as input.
 */
export const getImageDimensions = (
  file: File
): Promise<{width: number; height: number}> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      return reject(new Error("Selected file is not an image."));
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => resolve({width: img.width, height: img.height});
      img.onerror = () => reject(new Error("Failed to load image."));
    };

    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
};

/**
 * The function `validateImageDimensions` takes a file and checks if its dimensions are within
 * specified limits, returning a Promise with validation results.
 * @param {File} file - The `file` parameter is the image file that you want to validate the dimensions
 * of. It should be of type `File`, which is typically obtained from an input element of type file in
 * HTML.
 * @param {number} maxWidth - The `maxWidth` parameter in the `validateImageDimensions` function
 * represents the maximum width that an image is allowed to have in pixels. This function is used to
 * validate the dimensions of an image file to ensure it does not exceed certain width and height
 * limits.
 * @param {number} maxHeight - The `maxHeight` parameter in the `validateImageDimensions` function
 * represents the maximum height that an image file is allowed to have in order to be considered valid.
 * This function takes an image file (`File`), along with `maxWidth` and `maxHeight` values, and
 * returns a Promise
 * @returns The `validateImageDimensions` function returns a Promise that resolves to an object with
 * the following structure:
 * ```typescript
 * {
 *   isValid: boolean;
 *   width?: number;
 *   height?: number;
 * }
 * ```
 * The `isValid` property indicates whether the image dimensions are within the specified `maxWidth`
 * and `maxHeight`. If the image is valid, the `width` and `height` properties
 */
export const validateImageDimensions = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<{isValid: boolean; width?: number; height?: number}> => {
  return new Promise((resolve, reject) => {
    if (
      !file ||
      typeof file.type !== "string" ||
      !file.type.startsWith("image/")
    ) {
      return reject(new Error("Selected file is not a valid image."));
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      if (!e.target?.result) {
        return reject(new Error("Failed to read file."));
      }

      img.src = e.target.result as string;

      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const isValid = width <= maxWidth && height <= maxHeight;
        resolve({isValid, width, height});
      };

      img.onerror = () => reject(new Error("Failed to load image."));
    };

    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
};
