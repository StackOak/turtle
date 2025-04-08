'use strict';

const vue = require('vue');
const date = require('@internationalized/date');
require('@floating-ui/vue');
const DateRangeField_DateRangeFieldRoot = require('../DateRangeField/DateRangeFieldRoot.cjs');
const DateRangePicker_DateRangePickerRoot = require('./DateRangePickerRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DateRangePickerField",
  setup(__props) {
    const rootContext = DateRangePicker_DateRangePickerRoot.injectDateRangePickerRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(DateRangeField_DateRangeFieldRoot._sfc_main), vue.mergeProps({
        ref: vue.unref(rootContext).dateFieldRef,
        "model-value": vue.unref(rootContext).modelValue.value,
        placeholder: vue.unref(rootContext).placeholder.value
      }, {
        id: vue.unref(rootContext).id.value,
        name: vue.unref(rootContext).name.value,
        disabled: vue.unref(rootContext).disabled.value,
        minValue: vue.unref(rootContext).minValue.value,
        maxValue: vue.unref(rootContext).maxValue.value,
        readonly: vue.unref(rootContext).readonly.value,
        hourCycle: vue.unref(rootContext).hourCycle.value,
        granularity: vue.unref(rootContext).granularity.value,
        hideTimeZone: vue.unref(rootContext).hideTimeZone.value,
        locale: vue.unref(rootContext).locale.value,
        isDateUnavailable: vue.unref(rootContext).isDateUnavailable,
        required: vue.unref(rootContext).required.value,
        dir: vue.unref(rootContext).dir.value
      }, {
        "onUpdate:modelValue": _cache[0] || (_cache[0] = (date) => {
          if (date.start && vue.unref(rootContext).modelValue.value.start && date.end && vue.unref(rootContext).modelValue.value.end && date.start.compare(vue.unref(rootContext).modelValue.value.start) === 0 && date.end.compare(vue.unref(rootContext).modelValue.value.end) === 0) return;
          vue.unref(rootContext).onDateChange(date);
        }),
        "onUpdate:placeholder": _cache[1] || (_cache[1] = (date$1) => {
          if (vue.unref(date.isEqualDay)(date$1, vue.unref(rootContext).placeholder.value) && date$1.compare(vue.unref(rootContext).placeholder.value) === 0) return;
          vue.unref(rootContext).onPlaceholderChange(date$1);
        })
      }), {
        default: vue.withCtx(({ segments, modelValue }) => [
          vue.renderSlot(_ctx.$slots, "default", {
            segments,
            modelValue
          })
        ]),
        _: 3
      }, 16, ["model-value", "placeholder"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DateRangePickerField.cjs.map
