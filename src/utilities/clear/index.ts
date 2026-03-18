import {store} from "@/stores";
import Cookies from "js-cookie";

/**
 * The `clearAllData` function resets the store, clears local storage, session storage, and removes all
 * cookies.
 */
export const clearAllData = () => {
  store.dispatch({type: "RESET"});
  localStorage.clear();
  sessionStorage.clear();
  Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));
};

export class ClearAllData {
  private cookieAccept: string = "";

  store(): this {
    store.dispatch({type: "RESET"});
    return this;
  }

  localStorage(): this {
    localStorage.clear();
    return this;
  }

  sessionStorage(): this {
    sessionStorage.clear();
    return this;
  }

  cookieButAccept(key: string): this {
    Object.keys(Cookies.get()).forEach((cookie) => {
      if (cookie !== key) {
        Cookies.remove(cookie);
      }
    });
    return this;
  }

  cookiesAll(): this {
    Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));
    return this;
  }
}
