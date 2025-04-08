import { defineComponent, createBlock, openBlock, unref, withCtx, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './DialogContentModal.js';
import { _ as _sfc_main$2 } from './DialogContentNonModal.js';
import { u as useEmitAsProps } from '../shared/useEmitAsProps.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectDialogRootContext } from './DialogRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectDialogRootContext();
    const emitsAsProps = useEmitAsProps(emits);
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(rootContext).open.value
      }, {
        default: withCtx(() => [
          unref(rootContext).modal.value ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
            key: 0,
            ref: unref(forwardRef)
          }, { ...props, ...unref(emitsAsProps), ..._ctx.$attrs }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)) : (openBlock(), createBlock(_sfc_main$2, mergeProps({
            key: 1,
            ref: unref(forwardRef)
          }, { ...props, ...unref(emitsAsProps), ..._ctx.$attrs }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16))
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DialogContent.js.map
