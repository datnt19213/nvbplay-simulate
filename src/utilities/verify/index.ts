import {ENUM} from "@/configs";
import {GetACookie} from "../cookies";
import {DecryptBasic} from "../hash-aes";
import {isTokenValid} from "../token";

export const verifyUser = (): boolean => {
  const token = GetACookie("token");
  if (token) {
    const tokenDecrypt = JSON.parse(
      DecryptBasic(token, ENUM.SECRET_AES_TOKEN_HASH)
    );
    if (isTokenValid(tokenDecrypt)) {
      return true;
    }
  }
  return false;
};
