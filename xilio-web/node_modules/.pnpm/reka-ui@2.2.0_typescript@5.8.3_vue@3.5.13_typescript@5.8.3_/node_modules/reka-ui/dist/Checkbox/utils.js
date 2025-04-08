function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}

export { getState as g, isIndeterminate as i };
//# sourceMappingURL=utils.js.map
