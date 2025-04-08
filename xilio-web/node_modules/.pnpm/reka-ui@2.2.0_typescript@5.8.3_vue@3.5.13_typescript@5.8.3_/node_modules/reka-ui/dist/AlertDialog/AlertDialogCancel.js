import { defineComponent, onMounted, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { i as injectAlertDialogContentContext } from './AlertDialogContent.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../Dialog/DialogClose.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogCancel",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const contentContext = injectAlertDialogContentContext();
    const { forwardRef, currentElement } = useForwardExpose();
    onMounted(() => {
      contentContext.onCancelElementChange(currentElement.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps(props, { ref: unref(forwardRef) }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=AlertDialogCancel.js.map
