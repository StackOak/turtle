import { c as createContext } from '../shared/createContext.js';
import { c as clamp } from '../shared/clamp.js';

function getNextSortedValues(prevValues = [], nextValue, atIndex) {
  const nextValues = [...prevValues];
  nextValues[atIndex] = nextValue;
  return nextValues.sort((a, b) => a - b);
}
function convertValueToPercentage(value, min, max) {
  const maxSteps = max - min;
  const percentPerStep = 100 / maxSteps;
  const percentage = percentPerStep * (value - min);
  return clamp(percentage, 0, 100);
}
function getLabel(index, totalValues) {
  if (totalValues > 2)
    return `Value ${index + 1} of ${totalValues}`;
  else if (totalValues === 2)
    return ["Minimum", "Maximum"][index];
  else
    return void 0;
}
function getClosestValueIndex(values, nextValue) {
  if (values.length === 1)
    return 0;
  const distances = values.map((value) => Math.abs(value - nextValue));
  const closestDistance = Math.min(...distances);
  return distances.indexOf(closestDistance);
}
function getThumbInBoundsOffset(width, left, direction) {
  const halfWidth = width / 2;
  const halfPercent = 50;
  const offset = linearScale([0, halfPercent], [0, halfWidth]);
  return (halfWidth - offset(left) * direction) * direction;
}
function getStepsBetweenValues(values) {
  return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
  if (minStepsBetweenValues > 0) {
    const stepsBetweenValues = getStepsBetweenValues(values);
    const actualMinStepsBetweenValues = Math.min(...stepsBetweenValues);
    return actualMinStepsBetweenValues >= minStepsBetweenValues;
  }
  return true;
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function getDecimalCount(value) {
  return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
  const rounder = 10 ** decimalCount;
  return Math.round(value * rounder) / rounder;
}
const PAGE_KEYS = ["PageUp", "PageDown"];
const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
const BACK_KEYS = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
};
const [injectSliderOrientationContext, provideSliderOrientationContext] = createContext(["SliderVertical", "SliderHorizontal"]);

export { ARROW_KEYS as A, BACK_KEYS as B, PAGE_KEYS as P, getDecimalCount as a, getNextSortedValues as b, convertValueToPercentage as c, getLabel as d, getThumbInBoundsOffset as e, getClosestValueIndex as g, hasMinStepsBetweenValues as h, injectSliderOrientationContext as i, linearScale as l, provideSliderOrientationContext as p, roundValue as r };
//# sourceMappingURL=utils.js.map
