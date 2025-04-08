'use strict';

const vue = require('vue');
const date = require('@internationalized/date');
require('@floating-ui/vue');
const DateRangePicker_DateRangePickerRoot = require('./DateRangePickerRoot.cjs');
const RangeCalendar_RangeCalendarRoot = require('../RangeCalendar/RangeCalendarRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DateRangePickerCalendar",
  setup(__props) {
    const rootContext = DateRangePicker_DateRangePickerRoot.injectDateRangePickerRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RangeCalendar_RangeCalendarRoot._sfc_main), vue.mergeProps({
        allowNonContiguousRanges: vue.unref(rootContext).allowNonContiguousRanges.value,
        isDateDisabled: vue.unref(rootContext).isDateDisabled,
        isDateUnavailable: vue.unref(rootContext).isDateUnavailable,
        locale: vue.unref(rootContext).locale.value,
        disabled: vue.unref(rootContext).disabled.value,
        pagedNavigation: vue.unref(rootContext).pagedNavigation.value,
        weekStartsOn: vue.unref(rootContext).weekStartsOn.value,
        weekdayFormat: vue.unref(rootContext).weekdayFormat.value,
        fixedWeeks: vue.unref(rootContext).fixedWeeks.value,
        numberOfMonths: vue.unref(rootContext).numberOfMonths.value,
        readonly: vue.unref(rootContext).readonly.value,
        preventDeselect: vue.unref(rootContext).preventDeselect.value,
        minValue: vue.unref(rootContext).minValue.value,
        maxValue: vue.unref(rootContext).maxValue.value,
        dir: vue.unref(rootContext).dir.value
      }, {
        "initial-focus": "",
        "model-value": vue.unref(rootContext).modelValue.value,
        placeholder: vue.unref(rootContext).placeholder.value,
        "onUpdate:startValue": _cache[0] || (_cache[0] = (date) => {
          vue.unref(rootContext).onStartValueChange(date);
        }),
        "onUpdate:modelValue": _cache[1] || (_cache[1] = (date$1) => {
          if (date$1.start && vue.unref(rootContext).modelValue.value?.start && date$1.end && vue.unref(rootContext).modelValue.value?.end && vue.unref(date.isEqualDay)(date$1.start, vue.unref(rootContext).modelValue.value?.start) && vue.unref(date.isEqualDay)(date$1.end, vue.unref(rootContext).modelValue.value?.end)) return;
          vue.unref(rootContext).onDateChange(date$1);
        }),
        "onUpdate:placeholder": _cache[2] || (_cache[2] = (date$1) => {
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
//# sourceMappingURL=DateRangePickerCalendar.cjs.map
