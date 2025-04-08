import { NumberFormatter, NumberParser } from '@internationalized/number';
import { unrefElement, useEventListener } from '@vueuse/core';
import { reactiveComputed, createEventHook, isClient } from '@vueuse/shared';
import { ref, computed } from 'vue';

function usePressedHold(options) {
  const { disabled } = options;
  const timeout = ref();
  const triggerHook = createEventHook();
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
  const isPressed = ref(false);
  const target = computed(() => unrefElement(options.target));
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
  if (isClient) {
    useEventListener(target || window, "pointerdown", onPressStart);
    useEventListener(window, "pointerup", onPressRelease);
    useEventListener(window, "pointercancel", onPressRelease);
  }
  return {
    isPressed,
    onTrigger: triggerHook.on
  };
}
function useNumberFormatter(locale, options = ref({})) {
  return reactiveComputed(() => new NumberFormatter(locale.value, options.value));
}
function useNumberParser(locale, options = ref({})) {
  return reactiveComputed(() => new NumberParser(locale.value, options.value));
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

export { useNumberFormatter as a, useNumberParser as b, handleDecimalOperation as h, usePressedHold as u };
//# sourceMappingURL=utils.js.map
