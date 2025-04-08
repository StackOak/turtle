import { defineComponent, createBlock, createCommentVNode, unref, openBlock, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './DialogOverlayImpl.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectDialogRootContext } from './DialogRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const rootContext = injectDialogRootContext();
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return unref(rootContext)?.modal.value ? (openBlock(), createBlock(unref(Presence), {
        key: 0,
        present: _ctx.forceMount || unref(rootContext).open.value
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1, mergeProps(_ctx.$attrs, {
            ref: unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DialogOverlay.js.map
