import { defineComponent, createBlock, openBlock, unref, normalizeProps, guardReactiveProps, withCtx, renderSlot } from 'vue';
import '@floating-ui/vue';
import { _ as _sfc_main$1 } from '../Calendar/CalendarNext.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DatePickerNext",
  props: {
    nextPage: { type: Function },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), normalizeProps(guardReactiveProps(props)), {
        default: withCtx((slotProps) => [
          renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps)))
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DatePickerNext.js.map
