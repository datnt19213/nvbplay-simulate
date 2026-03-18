type AnyObject = Record<string, any>;

export function removeEmptyKeys(obj: AnyObject): AnyObject {
  const result: AnyObject = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== "") {
      result[key] = value;
    }
  }

  return result;
}
