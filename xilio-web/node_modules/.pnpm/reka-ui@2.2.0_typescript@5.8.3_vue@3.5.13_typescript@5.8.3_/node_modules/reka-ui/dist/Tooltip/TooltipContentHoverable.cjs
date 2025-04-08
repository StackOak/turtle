'use strict';

const vue = require('vue');
const Tooltip_TooltipContentImpl = require('./TooltipContentImpl.cjs');
const shared_useForwardProps = require('../shared/useForwardProps.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useGraceArea = require('../shared/useGraceArea.cjs');
const Tooltip_TooltipRoot = require('./TooltipRoot.cjs');
const Tooltip_TooltipProvider = require('./TooltipProvider.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const forwardedProps = shared_useForwardProps.useForwardProps(props);
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const { trigger, onClose } = Tooltip_TooltipRoot.injectTooltipRootContext();
    const providerContext = Tooltip_TooltipProvider.injectTooltipProviderContext();
    const { isPointerInTransit, onPointerExit } = shared_useGraceArea.useGraceArea(trigger, currentElement);
    providerContext.isPointerInTransitRef = isPointerInTransit;
    onPointerExit(() => {
      onClose();
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Tooltip_TooltipContentImpl._sfc_main, vue.mergeProps({ ref: vue.unref(forwardRef) }, vue.unref(forwardedProps)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TooltipContentHoverable.cjs.map
