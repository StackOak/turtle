import { defineComponent, toRefs, ref, computed, watch, onMounted, createBlock, openBlock, unref, withCtx, createElementVNode, renderSlot, toDisplayString } from 'vue';
import { useVModel, useEventListener } from '@vueuse/core';
import { isEqualDay } from '@internationalized/date';
import { n as getDefaultDate, b as isBefore } from '../date/comparators.js';
import { u as useRangeCalendarState } from './useRangeCalendar.js';
import { u as useCalendar } from '../Calendar/useCalendar.js';
import { c as createContext } from '../shared/createContext.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useLocale } from '../shared/useLocale.js';
import { u as useKbd } from '../shared/useKbd.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as isNullish } from '../shared/nullish.js';
import { h as handleCalendarInitialFocus } from '../date/utils.js';

const _hoisted_1 = { style: { "border": "0px", "clip": "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(50%)", "height": "1px", "margin": "-1px", "overflow": "hidden", "padding": "0px", "position": "absolute", "white-space": "nowrap", "width": "1px" } };
const _hoisted_2 = {
  role: "heading",
  "aria-level": "2"
};
const [injectRangeCalendarRootContext, provideRangeCalendarRootContext] = createContext("RangeCalendarRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarRoot",
  props: {
    defaultPlaceholder: {},
    defaultValue: { default: () => ({ start: void 0, end: void 0 }) },
    modelValue: {},
    placeholder: { default: void 0 },
    allowNonContiguousRanges: { type: Boolean, default: false },
    pagedNavigation: { type: Boolean, default: false },
    preventDeselect: { type: Boolean, default: false },
    weekStartsOn: { default: 0 },
    weekdayFormat: { default: "narrow" },
    calendarLabel: {},
    fixedWeeks: { type: Boolean, default: false },
    maxValue: {},
    minValue: {},
    locale: {},
    numberOfMonths: { default: 1 },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    initialFocus: { type: Boolean, default: false },
    isDateDisabled: { type: Function, default: void 0 },
    isDateUnavailable: { type: Function, default: void 0 },
    dir: {},
    nextPage: {},
    prevPage: {},
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  emits: ["update:modelValue", "update:placeholder", "update:startValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      disabled,
      readonly,
      initialFocus,
      pagedNavigation,
      weekStartsOn,
      weekdayFormat,
      fixedWeeks,
      numberOfMonths,
      preventDeselect,
      isDateUnavailable: propsIsDateUnavailable,
      isDateDisabled: propsIsDateDisabled,
      calendarLabel,
      maxValue,
      minValue,
      dir: propDir,
      locale: propLocale,
      nextPage: propsNextPage,
      prevPage: propsPrevPage,
      allowNonContiguousRanges
    } = toRefs(props);
    const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
    const dir = useDirection(propDir);
    const locale = useLocale(propLocale);
    const lastPressedDateValue = ref();
    const focusedValue = ref();
    const isEditing = ref(false);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? { start: void 0, end: void 0 },
      passive: props.modelValue === void 0
    });
    const currentModelValue = computed(() => isNullish(modelValue.value) ? { start: void 0, end: void 0 } : modelValue.value);
    const defaultDate = getDefaultDate({
      defaultPlaceholder: props.placeholder,
      defaultValue: currentModelValue.value.start,
      locale: props.locale
    });
    const startValue = ref(currentModelValue.value.start);
    const endValue = ref(currentModelValue.value.end);
    const placeholder = useVModel(props, "placeholder", emits, {
      defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
      passive: props.placeholder === void 0
    });
    function onPlaceholderChange(value) {
      placeholder.value = value.copy();
    }
    const {
      fullCalendarLabel,
      headingValue,
      isDateDisabled,
      isDateUnavailable,
      isNextButtonDisabled,
      isPrevButtonDisabled,
      grid,
      weekdays,
      isOutsideVisibleView,
      nextPage,
      prevPage,
      formatter
    } = useCalendar({
      locale,
      placeholder,
      weekStartsOn,
      fixedWeeks,
      numberOfMonths,
      minValue,
      maxValue,
      disabled,
      weekdayFormat,
      pagedNavigation,
      isDateDisabled: propsIsDateDisabled.value,
      isDateUnavailable: propsIsDateUnavailable.value,
      calendarLabel,
      nextPage: propsNextPage,
      prevPage: propsPrevPage
    });
    const {
      isInvalid,
      isSelected,
      highlightedRange,
      isSelectionStart,
      isSelectionEnd,
      isHighlightedStart,
      isHighlightedEnd
    } = useRangeCalendarState({
      start: startValue,
      end: endValue,
      isDateDisabled,
      isDateUnavailable,
      focusedValue,
      allowNonContiguousRanges
    });
    watch(modelValue, (_modelValue, _prevValue) => {
      if (!_prevValue?.start && _modelValue?.start || !_modelValue || !_modelValue.start || startValue.value && !isEqualDay(_modelValue.start, startValue.value)) {
        startValue.value = _modelValue?.start?.copy?.();
      }
      if (!_prevValue?.end && _modelValue.end || !_modelValue || !_modelValue.end || endValue.value && !isEqualDay(_modelValue.end, endValue.value)) {
        endValue.value = _modelValue?.end?.copy?.();
      }
    });
    watch(startValue, (_startValue) => {
      if (_startValue && !isEqualDay(_startValue, placeholder.value))
        onPlaceholderChange(_startValue);
      emits("update:startValue", _startValue);
    });
    watch([startValue, endValue], ([_startValue, _endValue]) => {
      const value = currentModelValue.value;
      if (value && value.start && value.end && _startValue && _endValue && isEqualDay(value.start, _startValue) && isEqualDay(value.end, _endValue))
        return;
      isEditing.value = true;
      if (_startValue && _endValue) {
        isEditing.value = false;
        if (value.start && value.end && isEqualDay(value.start, _startValue) && isEqualDay(value.end, _endValue))
          return;
        if (isBefore(_endValue, _startValue)) {
          modelValue.value = {
            start: _endValue.copy(),
            end: _startValue.copy()
          };
        } else {
          modelValue.value = {
            start: _startValue.copy(),
            end: _endValue.copy()
          };
        }
      }
    });
    const kbd = useKbd();
    useEventListener("keydown", (ev) => {
      if (ev.key === kbd.ESCAPE && isEditing.value) {
        startValue.value = modelValue.value.start?.copy();
        endValue.value = modelValue.value.end?.copy();
      }
    });
    provideRangeCalendarRootContext({
      isDateUnavailable,
      startValue,
      endValue,
      formatter,
      modelValue,
      placeholder,
      disabled,
      initialFocus,
      pagedNavigation,
      grid,
      weekDays: weekdays,
      weekStartsOn,
      weekdayFormat,
      fixedWeeks,
      numberOfMonths,
      readonly,
      preventDeselect,
      fullCalendarLabel,
      headingValue,
      isInvalid,
      isDateDisabled,
      highlightedRange,
      focusedValue,
      lastPressedDateValue,
      isSelected,
      isSelectionEnd,
      isSelectionStart,
      isNextButtonDisabled,
      isPrevButtonDisabled,
      isOutsideVisibleView,
      nextPage,
      prevPage,
      parentElement,
      onPlaceholderChange,
      locale,
      dir,
      isHighlightedStart,
      isHighlightedEnd
    });
    onMounted(() => {
      if (initialFocus.value)
        handleCalendarInitialFocus(parentElement.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        as: _ctx.as,
        "as-child": _ctx.asChild,
        role: "application",
        "aria-label": unref(fullCalendarLabel),
        "data-readonly": unref(readonly) ? "" : void 0,
        "data-disabled": unref(disabled) ? "" : void 0,
        "data-invalid": unref(isInvalid) ? "" : void 0,
        dir: unref(dir)
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1, [
            createElementVNode("div", _hoisted_2, toDisplayString(unref(fullCalendarLabel)), 1)
          ]),
          renderSlot(_ctx.$slots, "default", {
            date: unref(placeholder),
            grid: unref(grid),
            weekDays: unref(weekdays),
            weekStartsOn: unref(weekStartsOn),
            locale: unref(locale),
            fixedWeeks: unref(fixedWeeks),
            modelValue: unref(modelValue)
          })
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-label", "data-readonly", "data-disabled", "data-invalid", "dir"]);
    };
  }
});

export { _sfc_main as _, injectRangeCalendarRootContext as i };
//# sourceMappingURL=RangeCalendarRoot.js.map
