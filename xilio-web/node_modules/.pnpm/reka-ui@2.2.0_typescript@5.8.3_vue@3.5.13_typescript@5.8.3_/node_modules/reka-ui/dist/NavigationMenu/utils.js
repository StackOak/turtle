import { g as getActiveElement } from '../shared/getActiveElement.js';

function getOpenState(open) {
  return open ? "open" : "closed";
}
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
const LINK_SELECT = "navigationMenu.linkSelect";
const EVENT_ROOT_CONTENT_DISMISS = "navigationMenu.rootContentDismiss";
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function focusFirst(candidates) {
  const previouslyFocusedElement = getActiveElement();
  return candidates.some((candidate) => {
    if (candidate === previouslyFocusedElement)
      return true;
    candidate.focus();
    return getActiveElement() !== previouslyFocusedElement;
  });
}
function removeFromTabOrder(candidates) {
  candidates.forEach((candidate) => {
    candidate.dataset.tabindex = candidate.getAttribute("tabindex") || "";
    candidate.setAttribute("tabindex", "-1");
  });
  return () => {
    candidates.forEach((candidate) => {
      const prevTabIndex = candidate.dataset.tabindex;
      candidate.setAttribute("tabindex", prevTabIndex);
    });
  };
}
function whenMouse(handler) {
  return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}

export { EVENT_ROOT_CONTENT_DISMISS as E, LINK_SELECT as L, makeContentId as a, getTabbableCandidates as b, focusFirst as f, getOpenState as g, makeTriggerId as m, removeFromTabOrder as r, whenMouse as w };
//# sourceMappingURL=utils.js.map
