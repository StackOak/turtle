'use strict';

const shared_getActiveElement = require('../shared/getActiveElement.cjs');

const ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };
const MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl")
    return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key))
    return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key))
    return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = shared_getActiveElement.getActiveElement();
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus({ preventScroll });
    if (shared_getActiveElement.getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}

exports.ENTRY_FOCUS = ENTRY_FOCUS;
exports.EVENT_OPTIONS = EVENT_OPTIONS;
exports.MAP_KEY_TO_FOCUS_INTENT = MAP_KEY_TO_FOCUS_INTENT;
exports.focusFirst = focusFirst;
exports.getFocusIntent = getFocusIntent;
exports.wrapArray = wrapArray;
//# sourceMappingURL=utils.cjs.map
