import React from "react";
import {useRef, useState, useEffect} from "react";

const ensureColors = (colors: string[], minColors = 3): string[] => {
  if (minColors < 3) {
    console.error("The lowest number of colors is 3");
    return [];
  }
  const baseColors = [
    "rgb(255, 182, 193)", // Light Pink (Warm)
    "rgb(135, 206, 250)", // Light Sky Blue (Cool)
    "rgb(144, 238, 144)", // Light Green (Cool)
    "rgb(206, 134, 121)", // Tomato (Warm)
    "rgb(88, 146, 194)", // Steel Blue (Cool)
  ];

  // Prioritize cool colors but add warm ones to maintain balance
  const coolColors = baseColors.filter((color) => {
    const rgb = color.match(/\d+/g)?.map(Number);
    return rgb && rgb[2] > rgb[0]; // Simple heuristic: blue > red (cooler)
  });

  // If not enough cool colors, add warm ones
  while (colors.length < minColors) {
    const randomColor =
      coolColors[Math.floor(Math.random() * coolColors.length)];
    colors.push(randomColor);
  }

  return colors;
};

const MeshGradientBackground: React.FC<{
  imageUrl?: string;
  colors?: string[];
  mode: "random" | "fixed";
  numberRadial?: number;
  autoAdjustBrightness?: boolean;
}> = ({
  imageUrl,
  colors,
  mode = "fixed",
  numberRadial = 8,
  autoAdjustBrightness = true,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [gradient, setGradient] = useState<string>("");

  useEffect(() => {
    if (!imageRef.current) return;

    const img = imageRef.current;
    img.onload = () => {
      try {
        if (imageUrl || colors) {
          const lsColors =
            colors && colors?.length > 0 ? colors : getColorsFromImage(img, 5); // Lấy tối đa 5 màu từ ảnh
          const finalColors = ensureColors(filterBrightColors(lsColors), 5); // Đảm bảo ít nhất 5 màu

          let gradientStyle = "";

          if (mode === "fixed") {
            // Cố định vị trí x và y cho radial gradients
            const fixedPositions = [
              {x: 10, y: 10},
              {x: 30, y: 30},
              {x: 50, y: 50},
              {x: 70, y: 70},
              {x: 90, y: 90},
            ]; // Các vị trí cố định

            const radialLayers = fixedPositions
              .map(({x, y}) => {
                const color = autoAdjustBrightness
                  ? adjustBrightness(
                      finalColors[
                        Math.floor(Math.random() * finalColors.length)
                      ],
                      30
                    )
                  : finalColors[Math.floor(Math.random() * finalColors.length)]; // Làm sáng màu để nhẹ hơn
                const size = Math.random() * 80 + 40; // Thêm kích thước gradient thay đổi
                if (localStorage.getItem("rcbg")) {
                  return localStorage.getItem("rcbg");
                } else {
                  localStorage.setItem(
                    "rcbg",
                    `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, transparent ${size}%)`
                  );
                  return localStorage.getItem("rcbg");
                  //   return `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, transparent ${size}%)`;
                }
              })
              .join(", ");

            gradientStyle = radialLayers;
          } else {
            // Tạo mesh gradient cho chế độ random
            const radialLayers = Array.from({length: numberRadial}) // 8 Radial Gradient
              .map(() => {
                const color = autoAdjustBrightness
                  ? adjustBrightness(
                      finalColors[
                        Math.floor(Math.random() * finalColors.length)
                      ],
                      30
                    )
                  : finalColors[Math.floor(Math.random() * finalColors.length)];
                const x = mode === "random" ? Math.random() * 100 : 50;
                const y = mode === "random" ? Math.random() * 100 : 50;
                const size = mode === "random" ? Math.random() * 50 + 50 : 60;
                return `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, transparent ${size}%)`;
              })
              .join(", ");
            gradientStyle = radialLayers;
          }

          setGradient(gradientStyle);
        }
      } catch (error) {
        console.error("Error processing image:", error);
      }
    };
  }, [mode]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: gradient || "white",
        backgroundBlendMode: "soft-light",
      }}
    >
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Source"
        style={{display: "none"}}
        crossOrigin="anonymous"
      />
    </div>
  );
};

// Hàm điều chỉnh độ sáng màu để tạo hiệu ứng mượt mà hơn
const adjustBrightness = (color: string, delta: number): string => {
  const rgb = color.match(/\d+/g)?.map(Number);
  if (!rgb || rgb.length < 3) return color;

  const [r, g, b] = rgb;
  // Điều chỉnh độ sáng với delta để làm sáng màu lên
  return `rgb(${Math.min(Math.max(r + delta, 0), 255)}, ${Math.min(
    Math.max(g + delta, 0),
    255
  )}, ${Math.min(Math.max(b + delta, 0), 255)})`;
};
const filterBrightColors = (colors: string[]): string[] => {
  return colors.filter((color) => {
    const rgb = color.match(/\d+/g)?.map(Number);
    if (!rgb || rgb.length < 3) return false;

    const luminance = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / 255;
    return luminance > 0.3 && luminance < 0.85; // Không quá tối hoặc sáng
  });
};

export const getColorsFromImage = (
  img: HTMLImageElement,
  colorCount = 5
): string[] => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas not supported.");

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  const {data} = imageData;

  const pixels: [number, number, number][] = [];
  for (let i = 0; i < data.length; i += 4) {
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }

  const colorClusters = new Map<string, number>();
  for (const [r, g, b] of pixels) {
    const key = `${r}-${g}-${b}`;
    colorClusters.set(key, (colorClusters.get(key) || 0) + 1);
  }

  const sortedColors = Array.from(colorClusters.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, colorCount)
    .map(([key]) => `rgb(${key.split("-").join(",")})`);

  return sortedColors;
};

export default MeshGradientBackground;
