import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, normalizeProps, guardReactiveProps } from 'vue';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../Dialog/DialogRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogRoot",
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps(unref(forwarded), { modal: true }), {
        default: withCtx((slotProps) => [
          renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps)))
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=AlertDialogRoot.js.map
