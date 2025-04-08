import { defineComponent, toRefs, watch, onMounted, createBlock, openBlock, unref, withCtx, renderSlot, createElementVNode, toDisplayString } from 'vue';
import { useVModel } from '@vueuse/core';
import { isEqualDay, isSameDay } from '@internationalized/date';
import { u as useCalendar, a as useCalendarState } from './useCalendar.js';
import { c as createContext } from '../shared/createContext.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { u as useLocale } from '../shared/useLocale.js';
import { u as useDirection } from '../shared/useDirection.js';
import { n as getDefaultDate } from '../date/comparators.js';
import { h as handleCalendarInitialFocus } from '../date/utils.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _hoisted_1 = { style: { "border": "0px", "clip": "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(50%)", "height": "1px", "margin": "-1px", "overflow": "hidden", "padding": "0px", "position": "absolute", "white-space": "nowrap", "width": "1px" } };
const _hoisted_2 = {
  role: "heading",
  "aria-level": "2"
};
const [injectCalendarRootContext, provideCalendarRootContext] = createContext("CalendarRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    } = toRefs(props);
    const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
    const locale = useLocale(propLocale);
    const dir = useDirection(propDir);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: defaultValue.value,
      passive: props.modelValue === void 0
    });
    const defaultDate = getDefaultDate({
      defaultPlaceholder: props.placeholder,
      defaultValue: modelValue.value,
      locale: props.locale
    });
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
      weekdays,
      isOutsideVisibleView,
      nextPage,
      prevPage,
      formatter,
      grid
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
      isDateSelected
    } = useCalendarState({
      date: modelValue,
      isDateDisabled,
      isDateUnavailable
    });
    watch(modelValue, (_modelValue) => {
      if (Array.isArray(_modelValue) && _modelValue.length) {
        const lastValue = _modelValue[_modelValue.length - 1];
        if (lastValue && !isEqualDay(placeholder.value, lastValue))
          onPlaceholderChange(lastValue);
      } else if (!Array.isArray(_modelValue) && _modelValue && !isEqualDay(placeholder.value, _modelValue)) {
        onPlaceholderChange(_modelValue);
      }
    });
    function onDateChange(value) {
      if (!multiple.value) {
        if (!modelValue.value) {
          modelValue.value = value.copy();
          return;
        }
        if (!preventDeselect.value && isEqualDay(modelValue.value, value)) {
          placeholder.value = value.copy();
          modelValue.value = void 0;
        } else {
          modelValue.value = value.copy();
        }
      } else if (!modelValue.value) {
        modelValue.value = [value.copy()];
      } else if (Array.isArray(modelValue.value)) {
        const index = modelValue.value.findIndex((date) => isSameDay(date, value));
        if (index === -1) {
          modelValue.value = [...modelValue.value, value];
        } else if (!preventDeselect.value) {
          const next = modelValue.value.filter((date) => !isSameDay(date, value));
          if (!next.length) {
            placeholder.value = value.copy();
            modelValue.value = void 0;
            return;
          }
          modelValue.value = next.map((date) => date.copy());
        }
      }
    }
    onMounted(() => {
      if (initialFocus.value)
        handleCalendarInitialFocus(parentElement.value);
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
          renderSlot(_ctx.$slots, "default", {
            date: unref(placeholder),
            grid: unref(grid),
            weekDays: unref(weekdays),
            weekStartsOn: unref(weekStartsOn),
            locale: unref(locale),
            fixedWeeks: unref(fixedWeeks),
            modelValue: unref(modelValue)
          }),
          createElementVNode("div", _hoisted_1, [
            createElementVNode("div", _hoisted_2, toDisplayString(unref(fullCalendarLabel)), 1)
          ])
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-label", "data-readonly", "data-disabled", "data-invalid", "dir"]);
    };
  }
});

export { _sfc_main as _, injectCalendarRootContext as i };
//# sourceMappingURL=CalendarRoot.js.map
