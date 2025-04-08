'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const date = require('@internationalized/date');
const Calendar_useCalendar = require('./useCalendar.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const shared_useLocale = require('../shared/useLocale.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const date_comparators = require('../date/comparators.cjs');
const date_utils = require('../date/utils.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _hoisted_1 = { style: { "border": "0px", "clip": "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(50%)", "height": "1px", "margin": "-1px", "overflow": "hidden", "padding": "0px", "position": "absolute", "white-space": "nowrap", "width": "1px" } };
const _hoisted_2 = {
  role: "heading",
  "aria-level": "2"
};
const [injectCalendarRootContext, provideCalendarRootContext] = shared_createContext.createContext("CalendarRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "CalendarRoot",
  props: {
    modelValue: {},
    multiple: { type: Boolean, default: false },
    defaultValue: { default: void 0 },
    defaultPlaceholder: {},
    placeholder: { default: void 0 },
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
  emits: ["update:modelValue", "update:placeholder"],
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
      multiple,
      minValue,
      maxValue,
      numberOfMonths,
      preventDeselect,
      isDateDisabled: propsIsDateDisabled,
      isDateUnavailable: propsIsDateUnavailable,
      calendarLabel,
      defaultValue,
      nextPage: propsNextPage,
      prevPage: propsPrevPage,
      dir: propDir,
      locale: propLocale
    } = vue.toRefs(props);
    const { primitiveElement, currentElement: parentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const locale = shared_useLocale.useLocale(propLocale);
    const dir = shared_useDirection.useDirection(propDir);
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: defaultValue.value,
      passive: props.modelValue === void 0
    });
    const defaultDate = date_comparators.getDefaultDate({
      defaultPlaceholder: props.placeholder,
      defaultValue: modelValue.value,
      locale: props.locale
    });
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
      weekdays,
      isOutsideVisibleView,
      nextPage,
      prevPage,
      formatter,
      grid
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
      isDateSelected
    } = Calendar_useCalendar.useCalendarState({
      date: modelValue,
      isDateDisabled,
      isDateUnavailable
    });
    vue.watch(modelValue, (_modelValue) => {
      if (Array.isArray(_modelValue) && _modelValue.length) {
        const lastValue = _modelValue[_modelValue.length - 1];
        if (lastValue && !date.isEqualDay(placeholder.value, lastValue))
          onPlaceholderChange(lastValue);
      } else if (!Array.isArray(_modelValue) && _modelValue && !date.isEqualDay(placeholder.value, _modelValue)) {
        onPlaceholderChange(_modelValue);
      }
    });
    function onDateChange(value) {
      if (!multiple.value) {
        if (!modelValue.value) {
          modelValue.value = value.copy();
          return;
        }
        if (!preventDeselect.value && date.isEqualDay(modelValue.value, value)) {
          placeholder.value = value.copy();
          modelValue.value = void 0;
        } else {
          modelValue.value = value.copy();
        }
      } else if (!modelValue.value) {
        modelValue.value = [value.copy()];
      } else if (Array.isArray(modelValue.value)) {
        const index = modelValue.value.findIndex((date$1) => date.isSameDay(date$1, value));
        if (index === -1) {
          modelValue.value = [...modelValue.value, value];
        } else if (!preventDeselect.value) {
          const next = modelValue.value.filter((date$1) => !date.isSameDay(date$1, value));
          if (!next.length) {
            placeholder.value = value.copy();
            modelValue.value = void 0;
            return;
          }
          modelValue.value = next.map((date) => date.copy());
        }
      }
    }
    vue.onMounted(() => {
      if (initialFocus.value)
        date_utils.handleCalendarInitialFocus(parentElement.value);
    });
    provideCalendarRootContext({
      isDateUnavailable,
      dir,
      isDateDisabled,
      locale,
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
      multiple,
      numberOfMonths,
      readonly,
      preventDeselect,
      fullCalendarLabel,
      headingValue,
      isInvalid,
      isDateSelected,
      isNextButtonDisabled,
      isPrevButtonDisabled,
      isOutsideVisibleView,
      nextPage,
      prevPage,
      parentElement,
      onPlaceholderChange,
      onDateChange
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
          vue.renderSlot(_ctx.$slots, "default", {
            date: vue.unref(placeholder),
            grid: vue.unref(grid),
            weekDays: vue.unref(weekdays),
            weekStartsOn: vue.unref(weekStartsOn),
            locale: vue.unref(locale),
            fixedWeeks: vue.unref(fixedWeeks),
            modelValue: vue.unref(modelValue)
          }),
          vue.createElementVNode("div", _hoisted_1, [
            vue.createElementVNode("div", _hoisted_2, vue.toDisplayString(vue.unref(fullCalendarLabel)), 1)
          ])
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-label", "data-readonly", "data-disabled", "data-invalid", "dir"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectCalendarRootContext = injectCalendarRootContext;
//# sourceMappingURL=CalendarRoot.cjs.map
