'use strict';

const shared = require('@vueuse/shared');
const vue = require('vue');

let count = 0;
function useFocusGuards() {
  vue.watchEffect((cleanupFn) => {
    if (!shared.isClient)
      return;
    const edgeGuards = document.querySelectorAll("[data-reka-focus-guard]");
    document.body.insertAdjacentElement(
      "afterbegin",
      edgeGuards[0] ?? createFocusGuard()
    );
    document.body.insertAdjacentElement(
      "beforeend",
      edgeGuards[1] ?? createFocusGuard()
    );
    count++;
    cleanupFn(() => {
      if (count === 1) {
        document.querySelectorAll("[data-reka-focus-guard]").forEach((node) => node.remove());
      }
      count--;
    });
  });
}
function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-reka-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}

exports.useFocusGuards = useFocusGuards;
//# sourceMappingURL=useFocusGuards.cjs.map
