import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Popper/PopperAnchor.js';
import { e as excludeTouch } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectHoverCardRootContext } from './HoverCardRoot.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HoverCardTrigger",
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: { default: "a" }
  },
  setup(__props) {
    const { forwardRef, currentElement } = useForwardExpose();
    const rootContext = injectHoverCardRootContext();
    rootContext.triggerElement = currentElement;
    function handleLeave() {
      setTimeout(() => {
        if (!rootContext.isPointerInTransitRef.value && !rootContext.open.value) {
          rootContext.onClose();
        }
      }, 0);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        reference: _ctx.reference
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            ref: unref(forwardRef),
            "as-child": _ctx.asChild,
            as: _ctx.as,
            "data-state": unref(rootContext).open.value ? "open" : "closed",
            "data-grace-area-trigger": "",
            onPointerenter: _cache[0] || (_cache[0] = ($event) => unref(excludeTouch)(unref(rootContext).onOpen)($event)),
            onPointerleave: _cache[1] || (_cache[1] = ($event) => unref(excludeTouch)(handleLeave)($event)),
            onFocus: _cache[2] || (_cache[2] = ($event) => unref(rootContext).onOpen()),
            onBlur: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onClose())
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as-child", "as", "data-state"])
        ]),
        _: 3
      }, 8, ["reference"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=HoverCardTrigger.js.map
