'use strict';

function handleAndDispatchCustomEvent(name, handler, detail) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail
  });
  if (handler)
    target.addEventListener(name, handler, { once: true });
  target.dispatchEvent(event);
}

exports.handleAndDispatchCustomEvent = handleAndDispatchCustomEvent;
//# sourceMappingURL=handleAndDispatchCustomEvent.cjs.map
