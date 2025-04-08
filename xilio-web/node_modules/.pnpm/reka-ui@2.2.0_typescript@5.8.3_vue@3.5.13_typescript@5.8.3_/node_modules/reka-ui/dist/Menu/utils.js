import { g as getActiveElement } from '../shared/getActiveElement.js';

const ITEM_SELECT = "menu.itemSelect";
const SELECTION_KEYS = ["Enter", " "];
const FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
const LAST_KEYS = ["ArrowUp", "PageDown", "End"];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, "ArrowRight"],
  rtl: [...SELECTION_KEYS, "ArrowLeft"]
};
const SUB_CLOSE_KEYS = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
};
function getOpenState(open) {
  return open ? "open" : "closed";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getCheckedState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst(candidates) {
  const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus();
    if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isPointerInGraceArea(event, area) {
  if (!area)
    return false;
  const cursorPos = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursorPos, area);
}
function isMouseEvent(event) {
  return event.pointerType === "mouse";
}

export { FIRST_LAST_KEYS as F, ITEM_SELECT as I, LAST_KEYS as L, SELECTION_KEYS as S, getCheckedState as a, isPointerInGraceArea as b, isMouseEvent as c, SUB_CLOSE_KEYS as d, SUB_OPEN_KEYS as e, focusFirst as f, getOpenState as g, isIndeterminate as i };
//# sourceMappingURL=utils.js.map
