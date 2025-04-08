'use strict';

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

exports.debounce = debounce;
//# sourceMappingURL=debounce.cjs.map
