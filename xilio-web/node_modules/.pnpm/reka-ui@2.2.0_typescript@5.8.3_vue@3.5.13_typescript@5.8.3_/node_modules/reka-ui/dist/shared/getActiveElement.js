function getActiveElement() {
  let activeElement = document.activeElement;
  if (activeElement == null) {
    return null;
  }
  while (activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}

export { getActiveElement as g };
//# sourceMappingURL=getActiveElement.js.map
