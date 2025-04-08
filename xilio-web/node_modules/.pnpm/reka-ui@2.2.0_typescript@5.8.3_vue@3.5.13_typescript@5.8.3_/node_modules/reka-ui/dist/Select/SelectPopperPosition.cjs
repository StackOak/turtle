'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const Select_utils = require('./utils.cjs');
const Popper_PopperContent = require('../Popper/PopperContent.cjs');
const shared_useForwardProps = require('../shared/useForwardProps.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectPopperPosition",
  props: {
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: { default: Select_utils.CONTENT_MARGIN },
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
  setup(__props) {
    const props = __props;
    const forwarded = shared_useForwardProps.useForwardProps(props);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperContent._sfc_main), vue.mergeProps(vue.unref(forwarded), { style: {
        // Ensure border-box for floating-ui calculations
        "boxSizing": "border-box",
        "--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-select-content-available-width": "var(--reka-popper-available-width)",
        "--reka-select-content-available-height": "var(--reka-popper-available-height)",
        "--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SelectPopperPosition.cjs.map
