export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const colorMap: {[key: string]: string} = {
  đỏ: "red",
  "xanh dương": "blue",
  "xanh lá cây": "green",
  vàng: "yellow",
  cam: "orange",
  tím: "purple",
  trắng: "white",
  đen: "black",
  hồng: "pink",
  xám: "gray",
  nâu: "brown",
  be: "beige",
  "vàng chanh": "lemon yellow",
  "xanh lam": "navy blue",
  "xanh nõn chuối": "lime green",
  "màu ngọc bích": "turquoise",
  "màu vàng nhạt": "light yellow",
  "màu hồng nhạt": "light pink",
  "màu xanh nhạt": "light blue",
};

export function convertColor(vietnameseColor: string): string {
  const color = colorMap[vietnameseColor.toLowerCase()];
  return color || "Unknown color";
}

type StringToColorProps = {
  input: string;
  minBrightness?: number;
  maxBrightness?: number;
  adjustStep?: number;
};
/**
 * Generate a color based on the input string. The color will be adjusted to be within
 * the given brightness range.
 *
 * @param {string} input - The string to generate the color from.
 * @param {number} [minBrightness=50] - The minimum brightness of the color.
 * @param {number} [maxBrightness=200] - The maximum brightness of the color.
 * @param {number} [adjustStep=20] - The amount to adjust the brightness of the color by.
 * @returns {string} - The generated color as a hex string.
 */
export const stringToColor = ({
  input,
  minBrightness = 50,
  maxBrightness = 100,
  adjustStep = 20,
}: StringToColorProps): string => {
  const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max);

  const stringToHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const hashToHexColor = (hash: number): string => {
    const r = (hash & 0xff0000) >> 16;
    const g = (hash & 0x00ff00) >> 8;
    const b = hash & 0x0000ff;

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  };

  const adjustBrightness = (hex: string, percent: number): string => {
    const num = parseInt(hex.slice(1), 16);
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00ff) + percent;
    let b = (num & 0x0000ff) + percent;

    r = clamp(r, 0, 255);
    g = clamp(g, 0, 255);
    b = clamp(b, 0, 255);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  };

  const hash = stringToHash(input);
  let color = hashToHexColor(hash);

  // const minBrightness = 50;
  // const maxBrightness = 200;
  // const adjustStep = 20;

  while (true) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    if (brightness < minBrightness) {
      color = adjustBrightness(color, adjustStep);
    } else if (brightness > maxBrightness) {
      color = adjustBrightness(color, -adjustStep);
    } else {
      break;
    }
  }

  return color;
};
