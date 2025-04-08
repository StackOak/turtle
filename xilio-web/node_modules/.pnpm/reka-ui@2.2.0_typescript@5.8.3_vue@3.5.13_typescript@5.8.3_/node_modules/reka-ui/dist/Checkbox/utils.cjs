'use strict';

function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}

exports.getState = getState;
exports.isIndeterminate = isIndeterminate;
//# sourceMappingURL=utils.cjs.map
