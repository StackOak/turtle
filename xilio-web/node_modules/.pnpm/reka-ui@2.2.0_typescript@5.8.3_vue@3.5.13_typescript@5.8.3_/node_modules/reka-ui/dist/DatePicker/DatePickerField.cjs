'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const DateField_DateFieldRoot = require('../DateField/DateFieldRoot.cjs');
const DatePicker_DatePickerRoot = require('./DatePickerRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DatePickerField",
  setup(__props) {
    const rootContext = DatePicker_DatePickerRoot.injectDatePickerRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(DateField_DateFieldRoot._sfc_main), vue.mergeProps({
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
          if (date && vue.unref(rootContext).modelValue.value && date.compare(vue.unref(rootContext).modelValue.value) === 0) return;
          vue.unref(rootContext).onDateChange(date);
        }),
        "onUpdate:placeholder": _cache[1] || (_cache[1] = (date) => {
          if (date.compare(vue.unref(rootContext).placeholder.value) === 0) return;
          vue.unref(rootContext).onPlaceholderChange(date);
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
//# sourceMappingURL=DatePickerField.cjs.map
