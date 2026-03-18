import translationJSON from "@/locales/vi/translation.json";

import i18next from "../../../i18n"; // Import i18next instance
export type KeyJSON = keyof typeof translationJSON;
/**
 * Utility function to fetch translations using i18next
 * @tutorial tips (if errors from keys are thrown, you can ignore them by '<key> as KeyJSON' syntax)
 *
 * @param key - The translation key to look up
 * @param options - Optional parameters for interpolation
 * @returns The translated string
 */
export function translate(
  key: keyof typeof translationJSON,
  options?: Record<string, any>
): string {
  return i18next.t(key, options);
}
