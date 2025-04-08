import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { isEqualDay } from '@internationalized/date';
import '@floating-ui/vue';
import { _ as _sfc_main$1 } from '../DateRangeField/DateRangeFieldRoot.js';
import { i as injectDateRangePickerRootContext } from './DateRangePickerRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DateRangePickerField",
  setup(__props) {
    const rootContext = injectDateRangePickerRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps({
        ref: unref(rootContext).dateFieldRef,
        "model-value": unref(rootContext).modelValue.value,
        placeholder: unref(rootContext).placeholder.value
      }, {
        id: unref(rootContext).id.value,
        name: unref(rootContext).name.value,
        disabled: unref(rootContext).disabled.value,
        minValue: unref(rootContext).minValue.value,
        maxValue: unref(rootContext).maxValue.value,
        readonly: unref(rootContext).readonly.value,
        hourCycle: unref(rootContext).hourCycle.value,
        granularity: unref(rootContext).granularity.value,
        hideTimeZone: unref(rootContext).hideTimeZone.value,
        locale: unref(rootContext).locale.value,
        isDateUnavailable: unref(rootContext).isDateUnavailable,
        required: unref(rootContext).required.value,
        dir: unref(rootContext).dir.value
      }, {
        "onUpdate:modelValue": _cache[0] || (_cache[0] = (date) => {
          if (date.start && unref(rootContext).modelValue.value.start && date.end && unref(rootContext).modelValue.value.end && date.start.compare(unref(rootContext).modelValue.value.start) === 0 && date.end.compare(unref(rootContext).modelValue.value.end) === 0) return;
          unref(rootContext).onDateChange(date);
        }),
        "onUpdate:placeholder": _cache[1] || (_cache[1] = (date) => {
          if (unref(isEqualDay)(date, unref(rootContext).placeholder.value) && date.compare(unref(rootContext).placeholder.value) === 0) return;
          unref(rootContext).onPlaceholderChange(date);
        })
      }), {
        default: withCtx(({ segments, modelValue }) => [
          renderSlot(_ctx.$slots, "default", {
            segments,
            modelValue
          })
        ]),
        _: 3
      }, 16, ["model-value", "placeholder"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DateRangePickerField.js.map
