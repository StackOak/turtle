import { defineComponent, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { u as useBodyScrollLock } from '../shared/useBodyScrollLock.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectDialogRootContext } from './DialogRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const rootContext = injectDialogRootContext();
    useBodyScrollLock(true);
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        style: { "pointer-events": "auto" }
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-state"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DialogOverlayImpl.js.map
