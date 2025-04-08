'use strict';

const ignoredElement = ["INPUT", "TEXTAREA"];
function useArrowNavigation(e, currentElement, parentElement, options = {}) {
  if (!currentElement || options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName))
    return null;
  const {
    arrowKeyOptions = "both",
    attributeName = "[data-reka-collection-item]",
    itemsArray = [],
    loop = true,
    dir = "ltr",
    preventScroll = true,
    focus = false
  } = options;
  const [right, left, up, down, home, end] = [
    e.key === "ArrowRight",
    e.key === "ArrowLeft",
    e.key === "ArrowUp",
    e.key === "ArrowDown",
    e.key === "Home",
    e.key === "End"
  ];
  const goingVertical = up || down;
  const goingHorizontal = right || left;
  if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical)) {
    return null;
  }
  const allCollectionItems = parentElement ? Array.from(parentElement.querySelectorAll(attributeName)) : itemsArray;
  if (!allCollectionItems.length)
    return null;
  if (preventScroll)
    e.preventDefault();
  let item = null;
  if (goingHorizontal || goingVertical) {
    const goForward = goingVertical ? down : dir === "ltr" ? right : left;
    item = findNextFocusableElement(allCollectionItems, currentElement, {
      goForward,
      loop
    });
  } else if (home) {
    item = allCollectionItems.at(0) || null;
  } else if (end) {
    item = allCollectionItems.at(-1) || null;
  }
  if (focus)
    item?.focus();
  return item;
}
function findNextFocusableElement(elements, currentElement, options, iterations = elements.length) {
  if (--iterations === 0)
    return null;
  const index = elements.indexOf(currentElement);
  const newIndex = options.goForward ? index + 1 : index - 1;
  if (!options.loop && (newIndex < 0 || newIndex >= elements.length))
    return null;
  const adjustedNewIndex = (newIndex + elements.length) % elements.length;
  const candidate = elements[adjustedNewIndex];
  if (!candidate)
    return null;
  const isDisabled = candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false";
  if (isDisabled) {
    return findNextFocusableElement(
      elements,
      candidate,
      options,
      iterations
    );
  }
  return candidate;
}

exports.useArrowNavigation = useArrowNavigation;
//# sourceMappingURL=useArrowNavigation.cjs.map
