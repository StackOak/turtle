import { defineComponent, createBlock, openBlock, unref, withCtx, resolveDynamicComponent, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './TooltipContentImpl.js';
import { _ as _sfc_main$2 } from './TooltipContentHoverable.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectTooltipRootContext } from './TooltipRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TooltipContent",
  props: {
    forceMount: { type: Boolean },
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: { default: "top" },
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
    updatePositionStrategy: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectTooltipRootContext();
    const forwarded = useForwardPropsEmits(props, emits);
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(rootContext).open.value
      }, {
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).disableHoverableContent.value ? _sfc_main$1 : _sfc_main$2), mergeProps({ ref: unref(forwardRef) }, unref(forwarded)), {
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
//# sourceMappingURL=TooltipContent.js.map
