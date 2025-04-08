'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const date = require('@internationalized/date');
const date_comparators = require('../date/comparators.cjs');
const RangeCalendar_useRangeCalendar = require('./useRangeCalendar.cjs');
const Calendar_useCalendar = require('../Calendar/useCalendar.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useLocale = require('../shared/useLocale.cjs');
const shared_useKbd = require('../shared/useKbd.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_nullish = require('../shared/nullish.cjs');
const date_utils = require('../date/utils.cjs');

const _hoisted_1 = { style: { "border": "0px", "clip": "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(50%)", "height": "1px", "margin": "-1px", "overflow": "hidden", "padding": "0px", "position": "absolute", "white-space": "nowrap", "width": "1px" } };
const _hoisted_2 = {
  role: "heading",
  "aria-level": "2"
};
const [injectRangeCalendarRootContext, provideRangeCalendarRootContext] = shared_createContext.createContext("RangeCalendarRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    } = vue.toRefs(props);
    const { primitiveElement, currentElement: parentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const dir = shared_useDirection.useDirection(propDir);
    const locale = shared_useLocale.useLocale(propLocale);
    const lastPressedDateValue = vue.ref();
    const focusedValue = vue.ref();
    const isEditing = vue.ref(false);
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? { start: void 0, end: void 0 },
      passive: props.modelValue === void 0
    });
    const currentModelValue = vue.computed(() => shared_nullish.isNullish(modelValue.value) ? { start: void 0, end: void 0 } : modelValue.value);
    const defaultDate = date_comparators.getDefaultDate({
      defaultPlaceholder: props.placeholder,
      defaultValue: currentModelValue.value.start,
      locale: props.locale
    });
    const startValue = vue.ref(currentModelValue.value.start);
    const endValue = vue.ref(currentModelValue.value.end);
    const placeholder = core.useVModel(props, "placeholder", emits, {
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
    } = Calendar_useCalendar.useCalendar({
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
    } = RangeCalendar_useRangeCalendar.useRangeCalendarState({
      start: startValue,
      end: endValue,
      isDateDisabled,
      isDateUnavailable,
      focusedValue,
      allowNonContiguousRanges
    });
    vue.watch(modelValue, (_modelValue, _prevValue) => {
      if (!_prevValue?.start && _modelValue?.start || !_modelValue || !_modelValue.start || startValue.value && !date.isEqualDay(_modelValue.start, startValue.value)) {
        startValue.value = _modelValue?.start?.copy?.();
      }
      if (!_prevValue?.end && _modelValue.end || !_modelValue || !_modelValue.end || endValue.value && !date.isEqualDay(_modelValue.end, endValue.value)) {
        endValue.value = _modelValue?.end?.copy?.();
      }
    });
    vue.watch(startValue, (_startValue) => {
      if (_startValue && !date.isEqualDay(_startValue, placeholder.value))
        onPlaceholderChange(_startValue);
      emits("update:startValue", _startValue);
    });
    vue.watch([startValue, endValue], ([_startValue, _endValue]) => {
      const value = currentModelValue.value;
      if (value && value.start && value.end && _startValue && _endValue && date.isEqualDay(value.start, _startValue) && date.isEqualDay(value.end, _endValue))
        return;
      isEditing.value = true;
      if (_startValue && _endValue) {
        isEditing.value = false;
        if (value.start && value.end && date.isEqualDay(value.start, _startValue) && date.isEqualDay(value.end, _endValue))
          return;
        if (date_comparators.isBefore(_endValue, _startValue)) {
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
    const kbd = shared_useKbd.useKbd();
    core.useEventListener("keydown", (ev) => {
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
    vue.onMounted(() => {
      if (initialFocus.value)
        date_utils.handleCalendarInitialFocus(parentElement.value);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        as: _ctx.as,
        "as-child": _ctx.asChild,
        role: "application",
        "aria-label": vue.unref(fullCalendarLabel),
        "data-readonly": vue.unref(readonly) ? "" : void 0,
        "data-disabled": vue.unref(disabled) ? "" : void 0,
        "data-invalid": vue.unref(isInvalid) ? "" : void 0,
        dir: vue.unref(dir)
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", _hoisted_1, [
            vue.createElementVNode("div", _hoisted_2, vue.toDisplayString(vue.unref(fullCalendarLabel)), 1)
          ]),
          vue.renderSlot(_ctx.$slots, "default", {
            date: vue.unref(placeholder),
            grid: vue.unref(grid),
            weekDays: vue.unref(weekdays),
            weekStartsOn: vue.unref(weekStartsOn),
            locale: vue.unref(locale),
            fixedWeeks: vue.unref(fixedWeeks),
            modelValue: vue.unref(modelValue)
          })
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-label", "data-readonly", "data-disabled", "data-invalid", "dir"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectRangeCalendarRootContext = injectRangeCalendarRootContext;
//# sourceMappingURL=RangeCalendarRoot.cjs.map
