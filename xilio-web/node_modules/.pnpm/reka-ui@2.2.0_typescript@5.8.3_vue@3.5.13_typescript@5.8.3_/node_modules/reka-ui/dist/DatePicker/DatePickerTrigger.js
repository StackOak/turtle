import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import '@floating-ui/vue';
import { _ as _sfc_main$1 } from '../Popover/PopoverTrigger.js';
import { i as injectDatePickerRootContext } from './DatePickerRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DatePickerTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDatePickerRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps({ "data-reka-date-field-segment": "trigger" }, props, {
        disabled: unref(rootContext).disabled.value,
        onFocusin: _cache[0] || (_cache[0] = (e) => {
          unref(rootContext).dateFieldRef.value?.setFocusedElement(e.target);
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DatePickerTrigger.js.map
