import { defineComponent, createBlock, openBlock, unref, normalizeProps, guardReactiveProps, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../Dialog/DialogDescription.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogDescription",
  props: {
    asChild: { type: Boolean },
    as: { default: "p" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
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
//# sourceMappingURL=AlertDialogDescription.js.map
