'use strict';

const SELECTOR = "[data-reka-calendar-cell-trigger]:not([data-outside-view]):not([data-outside-visible-view])";
function getSelectableCells(calendar) {
  return Array.from(calendar.querySelectorAll(SELECTOR)) ?? [];
}

exports.getSelectableCells = getSelectableCells;
//# sourceMappingURL=utils.cjs.map
