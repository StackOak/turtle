import { isEqual } from "ohash/utils";
export function pick(data, keys) {
  const result = {};
  for (const key of keys) {
    result[key] = data[key];
  }
  return result;
}
export function omit(data, keys) {
  const result = { ...data };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
export function get(object, path, defaultValue) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }
  let result = object;
  for (const key of path) {
    if (result === void 0 || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
export function set(object, path, value) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }
  path.reduce((acc, key, i) => {
    if (acc[key] === void 0) acc[key] = {};
    if (i === path.length - 1) acc[key] = value;
    return acc[key];
  }, object);
}
export function looseToNumber(val) {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
}
export function compare(value, currentValue, comparator) {
  if (value === void 0 || currentValue === void 0) {
    return false;
  }
  if (typeof value === "string") {
    return value === currentValue;
  }
  if (typeof comparator === "function") {
    return comparator(value, currentValue);
  }
  if (typeof comparator === "string") {
    return get(value, comparator) === get(currentValue, comparator);
  }
  return isEqual(value, currentValue);
}
export function isArrayOfArray(item) {
  return Array.isArray(item[0]);
}
