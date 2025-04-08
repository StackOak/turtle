'use strict';

const vue = require('vue');
const date = require('@internationalized/date');
require('@floating-ui/vue');
const DatePicker_DatePickerRoot = require('./DatePickerRoot.cjs');
const Calendar_CalendarRoot = require('../Calendar/CalendarRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DatePickerCalendar",
  setup(__props) {
    const rootContext = DatePicker_DatePickerRoot.injectDatePickerRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Calendar_CalendarRoot._sfc_main), vue.mergeProps({
        isDateDisabled: vue.unref(rootContext).isDateDisabled,
        isDateUnavailable: vue.unref(rootContext).isDateUnavailable,
        minValue: vue.unref(rootContext).minValue.value,
        maxValue: vue.unref(rootContext).maxValue.value,
        locale: vue.unref(rootContext).locale.value,
        disabled: vue.unref(rootContext).disabled.value,
        pagedNavigation: vue.unref(rootContext).pagedNavigation.value,
        weekStartsOn: vue.unref(rootContext).weekStartsOn.value,
        weekdayFormat: vue.unref(rootContext).weekdayFormat.value,
        fixedWeeks: vue.unref(rootContext).fixedWeeks.value,
        numberOfMonths: vue.unref(rootContext).numberOfMonths.value,
        readonly: vue.unref(rootContext).readonly.value,
        preventDeselect: vue.unref(rootContext).preventDeselect.value,
        dir: vue.unref(rootContext).dir.value
      }, {
        "model-value": vue.unref(rootContext).modelValue.value,
        placeholder: vue.unref(rootContext).placeholder.value,
        "initial-focus": "",
        multiple: false,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = (date$1) => {
          if (date$1 && vue.unref(rootContext).modelValue.value && vue.unref(date.isEqualDay)(date$1, vue.unref(rootContext).modelValue.value)) return;
          vue.unref(rootContext).onDateChange(date$1);
        }),
        "onUpdate:placeholder": _cache[1] || (_cache[1] = (date$1) => {
          if (vue.unref(date.isEqualDay)(date$1, vue.unref(rootContext).placeholder.value)) return;
          vue.unref(rootContext).onPlaceholderChange(date$1);
        })
      }), {
        default: vue.withCtx(({ weekDays, grid, date, weekStartsOn, locale, fixedWeeks }) => [
          vue.renderSlot(_ctx.$slots, "default", {
            date,
            grid,
            weekDays,
            weekStartsOn,
            locale,
            fixedWeeks
          })
        ]),
        _: 3
      }, 16, ["model-value", "placeholder"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DatePickerCalendar.cjs.map
