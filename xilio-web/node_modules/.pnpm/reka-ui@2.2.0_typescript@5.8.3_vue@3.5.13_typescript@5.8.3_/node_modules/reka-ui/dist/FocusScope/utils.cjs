'use strict';

const shared_getActiveElement = require('../shared/getActiveElement.cjs');

const AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
const AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = shared_getActiveElement.getActiveElement();
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (shared_getActiveElement.getActiveElement() !== previouslyFocusedElement)
      return true;
  }
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
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
function findVisible(elements, container) {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container }))
      return element;
  }
}
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden")
    return true;
  while (node) {
    if (upTo !== void 0 && node === upTo)
      return false;
    if (getComputedStyle(node).display === "none")
      return true;
    node = node.parentElement;
  }
  return false;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = shared_getActiveElement.getActiveElement();
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select) {
      element.select();
    }
  }
}

exports.AUTOFOCUS_ON_MOUNT = AUTOFOCUS_ON_MOUNT;
exports.AUTOFOCUS_ON_UNMOUNT = AUTOFOCUS_ON_UNMOUNT;
exports.EVENT_OPTIONS = EVENT_OPTIONS;
exports.focus = focus;
exports.focusFirst = focusFirst;
exports.getTabbableCandidates = getTabbableCandidates;
exports.getTabbableEdges = getTabbableEdges;
//# sourceMappingURL=utils.cjs.map
