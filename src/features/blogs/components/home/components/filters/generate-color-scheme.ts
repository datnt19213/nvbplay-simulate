export const generateColorScheme = <T>(data: T[]) => {
  return data.map((_, index) => {
    const bgColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    const fgColor = getContrastingColor(bgColor); // Lấy màu chữ tương phản
    return { bgColor, fgColor };
  });
};

// Hàm phụ để tính màu chữ tương phản dựa trên màu nền
const getContrastingColor = (hexColor: string): string => {
  // Chuyển hex sang RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Công thức tính độ sáng
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Nếu sáng thì dùng màu chữ đen, nếu tối thì dùng màu chữ trắng
  return brightness > 125 ? "#000000" : "#FFFFFF";
};
