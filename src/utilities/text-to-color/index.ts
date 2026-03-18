/**
 * The function `GetBgColorFromFirstVowel` generates a background color based on the first vowel in a
 * given text string.
 * @param {string} text - The function `GetBgColorFromFirstVowel` takes a string input `text` and
 * generates a background color based on the characters in the text. The color is determined by the
 * characters in the text, with a focus on avoiding cyan colors.
 * @returns The function `GetBgColorFromFirstVowel` takes a string input `text`, calculates a color
 * based on the first vowel in the text, and returns a modified color code. The returned value is a
 * string representing the adjusted color in hexadecimal format, such as `#RRGGBB`.
 */
export const GetBgColorFromFirstVowel = (text: string): any => {
  if (text) {
    const hash = Array.from(text).reduce((acc, char) => {
      const code = char.charCodeAt(0);
      return (acc << 5) - acc + code;
    }, 0);

    const colorCode = (hash >>> 0).toString(16).padStart(6, "0").slice(0, 6);

    let r = parseInt(colorCode.slice(0, 2), 16);
    let g = parseInt(colorCode.slice(2, 4), 16);
    let b = parseInt(colorCode.slice(4, 6), 16);

    let pastelR = Math.min(255, Math.max(150, r + 55));
    let pastelG = Math.min(255, Math.max(150, g + 55));
    let pastelB = Math.min(255, Math.max(150, b + 55));

    const adjustToDesiredHue = (
      r: number,
      g: number,
      b: number
    ): [number, number, number] => {
      if (r > g && r > b) {
        return [0, Math.min(g, b), Math.max(g, b)]; // Green or purple
      } else if (g > r && g > b) {
        return [0, Math.max(0, g - 50), Math.min(b, g)]; // Green or blue
      } else if (b > r && b > g) {
        return [0, Math.min(r, g), Math.max(r, g)]; // Blue or purple
      } else {
        return [0, 0, Math.max(r, g, b)]; // Indigo
      }
    };

    // Function to avoid cyan
    const avoidCyan = (r: number, g: number, b: number): boolean => {
      return g > 150 && b > 150 && r < 100; // Check if it's cyan
    };

    let adjustedR = pastelR;
    let adjustedG = pastelG;
    let adjustedB = pastelB;

    while (avoidCyan(adjustedR, adjustedG, adjustedB)) {
      adjustedG = Math.max(0, adjustedG - 10);
      adjustedB = Math.max(0, adjustedB - 10);
    }

    const [finalR, finalG, finalB] = adjustToDesiredHue(
      adjustedR,
      adjustedG,
      adjustedB
    );

    const adjustedColor = `#${[finalR, finalG, finalB]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")}`;

    return adjustedColor;
  }
};

/**
 * The function AdjustColorBrightness adjusts the brightness of a given color by a specified factor.
 * @param {string} color - The `color` parameter is a string representing a color in hexadecimal
 * format, such as `#RRGGBB` where RR, GG, and BB are two-digit hexadecimal values for red, green, and
 * blue components respectively.
 * @param {number} factor - The `factor` parameter in the `AdjustColorBrightness` function represents
 * the amount by which you want to adjust the brightness of the color. Positive values will make the
 * color brighter, while negative values will make it darker. The range of the `factor` parameter is
 * from -1 to 1,
 * @returns The `AdjustColorBrightness` function takes a color in hexadecimal format and a brightness
 * adjustment factor as input. It calculates the new RGB values by adjusting the brightness based on
 * the factor provided. If the input color is valid, it returns the new color in hexadecimal format. If
 * the input color is empty or invalid, it does not return anything (undefined).
 */
export const AdjustColorBrightness = (
  color: string,
  factor: number
): string => {
  if (color) {
    const hexToRgb = (hex: string): [number, number, number] => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
      return `#${[r, g, b]
        .map((x) => Math.round(x).toString(16).padStart(2, "0"))
        .join("")}`;
    };

    const [r, g, b] = hexToRgb(color);

    const adjust = (value: number, factor: number): number => {
      return Math.min(255, Math.max(0, value + factor * 255));
    };

    const newR = adjust(r, factor);
    const newG = adjust(g, factor);
    const newB = adjust(b, factor);

    return rgbToHex(newR, newG, newB);
  }
  return "";
};
/**
 * The `GetGradientBackground` function generates a gradient background based on the given amount.
 * The gradient changes based on the range of the provided `amount`.
 *
 * @param {number} amount - The `amount` parameter represents the value used to determine the gradient.
 * The function uses this value to select the appropriate gradient based on the following ranges:
 * - 0 <= amount <= 1000: Gradient between #f4ffa3 and #b28fff
 * - 1000 < amount <= 10000: Gradient between #09d9e9 and #07c084
 * - 10000 < amount <= 100000: Gradient between #85dbc2 and #e8e087
 * - 100000 < amount <= 1000000: Gradient between #fff58a and #ffa970
 * - 1000000 < amount <= 10000000: Gradient between #ffe699 and #e594bb
 * - amount > 10000000: Gradient between #f0f0f0 and #bdbdbd
 *
 * @returns {string} The `GetGradientBackground` function returns a string representing the CSS
 * gradient background. The returned value is a string in the format:
 * "radial-gradient(circle at left top, <color1> , <color2>)".
 *
 * @example
 * const gradient = GetGradientBackground(5000);
 * console.log(gradient); // Output: "radial-gradient(circle at left top, #85dbc2 , #e8e087)"
 */
export const GetGradientBackgroundByNumber = (amount: number): string => {
  let gradient: string;

  if (amount <= 0) {
    gradient = "radial-gradient(circle at left top, #2a2a2a , #1a1a1a)";
  } else if (amount <= 1000) {
    gradient = "radial-gradient(circle at left top, #f4ffa3 , #b28fff)";
  } else if (amount <= 10000) {
    gradient = "radial-gradient(circle at left top, #09d9e9 , #07c084)";
  } else if (amount <= 50000) {
    gradient = "radial-gradient(circle at left top, #85dbc2 , #e8e087)";
  } else if (amount <= 100000) {
    gradient = "radial-gradient(circle at left top, #fff58a , #ffa970)";
  } else if (amount <= 500000) {
    gradient = "radial-gradient(circle at left top, #ffe699 , #e594bb)";
  } else {
    gradient = "radial-gradient(circle at left top, #f0f0f0 , #bdbdbd)";
  }

  return gradient;
};

/**
 * The GetLevelColor function calculates and returns an RGB color based on a danger level input.
 * @param {number} dangerLevel - The `dangerLevel` parameter represents the level of danger on a scale
 * from 0 to 100. The function `GetLevelColor` calculates and returns an RGB color based on this danger
 * level.
 * @returns The function `GetLevelColor` returns an RGB color string based on the input `dangerLevel`.
 * The red component is calculated based on the `dangerLevel`, while the green component is calculated
 * as the inverse of the `dangerLevel`. The blue component is always set to 0.
 */
export const GetLevelColor = (dangerLevel: number): string => {
  const level = Math.min(100, Math.max(0, dangerLevel));

  const red = Math.round((level / 100) * 255);
  const green = Math.round((1 - level / 100) * 255);

  return `rgb(${red}, ${green}, 0)`;
};
