'use strict';

const number = require('@internationalized/number');
const core = require('@vueuse/core');
const shared = require('@vueuse/shared');
const vue = require('vue');

function usePressedHold(options) {
  const { disabled } = options;
  const timeout = vue.ref();
  const triggerHook = shared.createEventHook();
  const resetTimeout = () => window.clearTimeout(timeout.value);
  const onIncrementPressStart = (delay) => {
    resetTimeout();
    if (disabled.value)
      return;
    triggerHook.trigger();
    timeout.value = window.setTimeout(() => {
      onIncrementPressStart(60);
    }, delay);
  };
  const handlePressStart = () => {
    onIncrementPressStart(400);
  };
  const handlePressEnd = () => {
    resetTimeout();
  };
  const isPressed = vue.ref(false);
  const target = vue.computed(() => core.unrefElement(options.target));
  const onPressStart = (event) => {
    if (event.button !== 0 || isPressed.value)
      return;
    event.preventDefault();
    isPressed.value = true;
    handlePressStart();
  };
  const onPressRelease = () => {
    isPressed.value = false;
    handlePressEnd();
  };
  if (shared.isClient) {
    core.useEventListener(target || window, "pointerdown", onPressStart);
    core.useEventListener(window, "pointerup", onPressRelease);
    core.useEventListener(window, "pointercancel", onPressRelease);
  }
  return {
    isPressed,
    onTrigger: triggerHook.on
  };
}
function useNumberFormatter(locale, options = vue.ref({})) {
  return shared.reactiveComputed(() => new number.NumberFormatter(locale.value, options.value));
}
function useNumberParser(locale, options = vue.ref({})) {
  return shared.reactiveComputed(() => new number.NumberParser(locale.value, options.value));
}
function handleDecimalOperation(operator, value1, value2) {
  let result = operator === "+" ? value1 + value2 : value1 - value2;
  if (value1 % 1 !== 0 || value2 % 1 !== 0) {
    const value1Decimal = value1.toString().split(".");
    const value2Decimal = value2.toString().split(".");
    const value1DecimalLength = value1Decimal[1] && value1Decimal[1].length || 0;
    const value2DecimalLength = value2Decimal[1] && value2Decimal[1].length || 0;
    const multiplier = 10 ** Math.max(value1DecimalLength, value2DecimalLength);
    value1 = Math.round(value1 * multiplier);
    value2 = Math.round(value2 * multiplier);
    result = operator === "+" ? value1 + value2 : value1 - value2;
    result /= multiplier;
  }
  return result;
}

exports.handleDecimalOperation = handleDecimalOperation;
exports.useNumberFormatter = useNumberFormatter;
exports.useNumberParser = useNumberParser;
exports.usePressedHold = usePressedHold;
//# sourceMappingURL=utils.cjs.map
