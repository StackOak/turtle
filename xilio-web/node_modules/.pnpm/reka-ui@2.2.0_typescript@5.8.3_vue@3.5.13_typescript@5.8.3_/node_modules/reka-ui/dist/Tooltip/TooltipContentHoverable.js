import { defineComponent, createBlock, openBlock, mergeProps, unref, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './TooltipContentImpl.js';
import { u as useForwardProps } from '../shared/useForwardProps.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useGraceArea } from '../shared/useGraceArea.js';
import { i as injectTooltipRootContext } from './TooltipRoot.js';
import { i as injectTooltipProviderContext } from './TooltipProvider.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TooltipContentHoverable",
  props: {
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
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
    updatePositionStrategy: {}
  },
  setup(__props) {
    const props = __props;
    const forwardedProps = useForwardProps(props);
    const { forwardRef, currentElement } = useForwardExpose();
    const { trigger, onClose } = injectTooltipRootContext();
    const providerContext = injectTooltipProviderContext();
    const { isPointerInTransit, onPointerExit } = useGraceArea(trigger, currentElement);
    providerContext.isPointerInTransitRef = isPointerInTransit;
    onPointerExit(() => {
      onClose();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, mergeProps({ ref: unref(forwardRef) }, unref(forwardedProps)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=TooltipContentHoverable.js.map
