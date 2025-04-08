'use strict';

const vue = require('vue');
const Tooltip_TooltipContentImpl = require('./TooltipContentImpl.cjs');
const Tooltip_TooltipContentHoverable = require('./TooltipContentHoverable.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Tooltip_TooltipRoot = require('./TooltipRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const rootContext = Tooltip_TooltipRoot.injectTooltipRootContext();
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(rootContext).open.value
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(rootContext).disableHoverableContent.value ? Tooltip_TooltipContentImpl._sfc_main : Tooltip_TooltipContentHoverable._sfc_main), vue.mergeProps({ ref: vue.unref(forwardRef) }, vue.unref(forwarded)), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16))
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TooltipContent.cjs.map
