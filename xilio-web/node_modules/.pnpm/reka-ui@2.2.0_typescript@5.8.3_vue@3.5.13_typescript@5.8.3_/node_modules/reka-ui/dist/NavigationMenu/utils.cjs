'use strict';

const shared_getActiveElement = require('../shared/getActiveElement.cjs');

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
  const previouslyFocusedElement = shared_getActiveElement.getActiveElement();
  return candidates.some((candidate) => {
    if (candidate === previouslyFocusedElement)
      return true;
    candidate.focus();
    return shared_getActiveElement.getActiveElement() !== previouslyFocusedElement;
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

exports.EVENT_ROOT_CONTENT_DISMISS = EVENT_ROOT_CONTENT_DISMISS;
exports.LINK_SELECT = LINK_SELECT;
exports.focusFirst = focusFirst;
exports.getOpenState = getOpenState;
exports.getTabbableCandidates = getTabbableCandidates;
exports.makeContentId = makeContentId;
exports.makeTriggerId = makeTriggerId;
exports.removeFromTabOrder = removeFromTabOrder;
exports.whenMouse = whenMouse;
//# sourceMappingURL=utils.cjs.map
