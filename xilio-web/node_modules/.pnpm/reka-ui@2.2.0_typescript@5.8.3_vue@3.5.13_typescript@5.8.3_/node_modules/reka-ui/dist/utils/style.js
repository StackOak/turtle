import { E as EXCEEDED_HORIZONTAL_MIN, b as EXCEEDED_VERTICAL_MIN, c as EXCEEDED_VERTICAL_MAX, a as EXCEEDED_HORIZONTAL_MAX } from './registry.js';

let currentCursorStyle = null;
let styleElement = null;
function getCursorStyle(state, constraintFlags) {
  if (constraintFlags) {
    const horizontalMin = (constraintFlags & EXCEEDED_HORIZONTAL_MIN) !== 0;
    const horizontalMax = (constraintFlags & EXCEEDED_HORIZONTAL_MAX) !== 0;
    const verticalMin = (constraintFlags & EXCEEDED_VERTICAL_MIN) !== 0;
    const verticalMax = (constraintFlags & EXCEEDED_VERTICAL_MAX) !== 0;
    if (horizontalMin) {
      if (verticalMin)
        return "se-resize";
      else if (verticalMax)
        return "ne-resize";
      else
        return "e-resize";
    } else if (horizontalMax) {
      if (verticalMin)
        return "sw-resize";
      else if (verticalMax)
        return "nw-resize";
      else
        return "w-resize";
    } else if (verticalMin) {
      return "s-resize";
    } else if (verticalMax) {
      return "n-resize";
    }
  }
  switch (state) {
    case "horizontal":
      return "ew-resize";
    case "intersection":
      return "move";
    case "vertical":
      return "ns-resize";
  }
}
function resetGlobalCursorStyle() {
  if (styleElement !== null) {
    document.head.removeChild(styleElement);
    currentCursorStyle = null;
    styleElement = null;
  }
}
function setGlobalCursorStyle(state, constraintFlags) {
  const style = getCursorStyle(state, constraintFlags);
  if (currentCursorStyle === style)
    return;
  currentCursorStyle = style;
  if (styleElement === null) {
    styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `*{cursor: ${style}!important;}`;
}
function computePanelFlexBoxStyle({
  defaultSize,
  dragState,
  layout,
  panelData,
  panelIndex,
  precision = 3
}) {
  const size = layout[panelIndex];
  let flexGrow;
  if (size == null) {
    flexGrow = defaultSize !== void 0 ? defaultSize.toPrecision(precision) : "1";
  } else if (panelData.length === 1) {
    flexGrow = "1";
  } else {
    flexGrow = size.toPrecision(precision);
  }
  return {
    flexBasis: 0,
    flexGrow,
    flexShrink: 1,
    // Without this, Panel sizes may be unintentionally overridden by their content
    overflow: "hidden",
    // Disable pointer events inside of a panel during resize
    // This avoid edge cases like nested iframes
    pointerEvents: dragState !== null ? "none" : void 0
  };
}

export { computePanelFlexBoxStyle as c, resetGlobalCursorStyle as r, setGlobalCursorStyle as s };
//# sourceMappingURL=style.js.map
