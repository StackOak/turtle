function debounce(callback, durationMs = 10) {
  let timeoutId = null;
  const callable = (...args) => {
    if (timeoutId !== null)
      clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, durationMs);
  };
  return callable;
}

export { debounce as d };
//# sourceMappingURL=debounce.js.map
