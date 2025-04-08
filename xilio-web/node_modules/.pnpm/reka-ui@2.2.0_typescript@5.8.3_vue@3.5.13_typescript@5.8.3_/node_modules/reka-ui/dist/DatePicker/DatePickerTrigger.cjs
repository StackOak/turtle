'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const Popover_PopoverTrigger = require('../Popover/PopoverTrigger.cjs');
const DatePicker_DatePickerRoot = require('./DatePickerRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DatePickerTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = DatePicker_DatePickerRoot.injectDatePickerRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popover_PopoverTrigger._sfc_main), vue.mergeProps({ "data-reka-date-field-segment": "trigger" }, props, {
        disabled: vue.unref(rootContext).disabled.value,
        onFocusin: _cache[0] || (_cache[0] = (e) => {
          vue.unref(rootContext).dateFieldRef.value?.setFocusedElement(e.target);
        })
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DatePickerTrigger.cjs.map
