/**
 * @description Generate a union type of nested keys for autocomplete support
 */
type DeepKeys<T, P extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${P}${K}` | DeepKeys<T[K], `${P}${K}.`>
        : `${P}${K}`;
    }[keyof T & string]
  : never;

/**
 * @description Search objects in a list based on a keyword and a key
 * @param list - The list of objects to search
 * @param keyword - The keyword to search for
 * @param keyPath - The key of the object to search (supports nested keys with autocomplete)
 * @returns The list of objects that match the keyword
 */
export function searchObjects<T>(
  list: T[],
  keyword: string,
  keyPath: DeepKeys<T> // 🔥 Hỗ trợ gợi ý key bằng Ctrl + Space
): T[] {
  const removeDiacritics = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const regex = new RegExp(removeDiacritics(keyword).split("").join(".*"), "i");

  // Hàm lấy giá trị từ keyPath (vd: "participant.name")
  const getValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), obj);
  };

  return list.filter((item) => regex.test(removeDiacritics(String(getValue(item, keyPath) || ""))));
}
