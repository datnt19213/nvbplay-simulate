import {JwtPayload, jwtDecode} from "jwt-decode";
import {RemoveACookie} from "../cookies";

/**
 * Decodes a JWT token and checks if it is still valid.
 *
 * @param token - The JWT token to decode and verify.
 * @returns `true` if the token is valid (not expired), otherwise `false`.
 */
export function isTokenValid(token: string): boolean {
  if (!token) {
    RemoveACookie("token");
    return false;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const exp = decoded.exp;

    if (!exp) {
      RemoveACookie("token");
      return false;
    }
    const now = Math.floor(Date.now() / 1000);
    return exp > now;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
}
