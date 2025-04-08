import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { e as excludeTouch } from './utils.js';
import { _ as _sfc_main$1 } from './HoverCardContentImpl.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectHoverCardRootContext } from './HoverCardRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HoverCardContent",
  props: {
    forceMount: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const { forwardRef } = useForwardExpose();
    const rootContext = injectHoverCardRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(rootContext).open.value
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1, mergeProps(unref(forwarded), {
            ref: unref(forwardRef),
            onPointerenter: _cache[0] || (_cache[0] = ($event) => unref(excludeTouch)(unref(rootContext).onOpen)($event))
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=HoverCardContent.js.map
