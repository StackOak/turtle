import { defu } from "defu";
// @__NO_SIDE_EFFECTS__
export function defineLocale(options) {
  return defu(options, { dir: "ltr" });
}
