import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { isEqualDay } from '@internationalized/date';
import '@floating-ui/vue';
import { i as injectDatePickerRootContext } from './DatePickerRoot.js';
import { _ as _sfc_main$1 } from '../Calendar/CalendarRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DatePickerCalendar",
  setup(__props) {
    const rootContext = injectDatePickerRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps({
        isDateDisabled: unref(rootContext).isDateDisabled,
        isDateUnavailable: unref(rootContext).isDateUnavailable,
        minValue: unref(rootContext).minValue.value,
        maxValue: unref(rootContext).maxValue.value,
        locale: unref(rootContext).locale.value,
        disabled: unref(rootContext).disabled.value,
        pagedNavigation: unref(rootContext).pagedNavigation.value,
        weekStartsOn: unref(rootContext).weekStartsOn.value,
        weekdayFormat: unref(rootContext).weekdayFormat.value,
        fixedWeeks: unref(rootContext).fixedWeeks.value,
        numberOfMonths: unref(rootContext).numberOfMonths.value,
        readonly: unref(rootContext).readonly.value,
        preventDeselect: unref(rootContext).preventDeselect.value,
        dir: unref(rootContext).dir.value
      }, {
        "model-value": unref(rootContext).modelValue.value,
        placeholder: unref(rootContext).placeholder.value,
        "initial-focus": "",
        multiple: false,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = (date) => {
          if (date && unref(rootContext).modelValue.value && unref(isEqualDay)(date, unref(rootContext).modelValue.value)) return;
          unref(rootContext).onDateChange(date);
        }),
        "onUpdate:placeholder": _cache[1] || (_cache[1] = (date) => {
          if (unref(isEqualDay)(date, unref(rootContext).placeholder.value)) return;
          unref(rootContext).onPlaceholderChange(date);
        })
      }), {
        default: withCtx(({ weekDays, grid, date, weekStartsOn, locale, fixedWeeks }) => [
          renderSlot(_ctx.$slots, "default", {
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

export { _sfc_main as _ };
//# sourceMappingURL=DatePickerCalendar.js.map
