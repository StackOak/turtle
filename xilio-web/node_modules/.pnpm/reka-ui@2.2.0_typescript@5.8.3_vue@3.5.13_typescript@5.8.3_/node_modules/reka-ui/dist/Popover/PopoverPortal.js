import { defineComponent, createBlock, openBlock, unref, normalizeProps, guardReactiveProps, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Teleport/Teleport.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PopoverPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    defer: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PopoverPortal.js.map
