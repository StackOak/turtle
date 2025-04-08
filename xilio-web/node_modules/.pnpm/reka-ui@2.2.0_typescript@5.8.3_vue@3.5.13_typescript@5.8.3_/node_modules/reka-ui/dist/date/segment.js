import { u as useKbd } from '../shared/useKbd.js';

function isSegmentNavigationKey(key) {
  const kbd = useKbd();
  if (key === kbd.ARROW_RIGHT || key === kbd.ARROW_LEFT)
    return true;
  return false;
}
function isNumberString(value) {
  if (Number.isNaN(Number.parseInt(value)))
    return false;
  return true;
}
function isAcceptableSegmentKey(key) {
  const kbd = useKbd();
  const acceptableSegmentKeys = [
    kbd.ENTER,
    kbd.ARROW_UP,
    kbd.ARROW_DOWN,
    kbd.ARROW_LEFT,
    kbd.ARROW_RIGHT,
    kbd.BACKSPACE,
    kbd.SPACE,
    "a",
    "A",
    "p",
    "P"
  ];
  if (acceptableSegmentKeys.includes(key))
    return true;
  if (isNumberString(key))
    return true;
  return false;
}
function getSegmentElements(parentElement) {
  return Array.from(parentElement.querySelectorAll("[data-reka-date-field-segment]")).filter((item) => item.getAttribute("data-reka-date-field-segment") !== "literal");
}
function getTimeFieldSegmentElements(parentElement) {
  return Array.from(parentElement.querySelectorAll("[data-reka-time-field-segment]")).filter((item) => item.getAttribute("data-reka-time-field-segment") !== "literal");
}

export { getTimeFieldSegmentElements as a, isAcceptableSegmentKey as b, isNumberString as c, getSegmentElements as g, isSegmentNavigationKey as i };
//# sourceMappingURL=segment.js.map
