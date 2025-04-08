'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const Popover_PopoverPortal = require('../Popover/PopoverPortal.cjs');
const Popover_PopoverContent = require('../Popover/PopoverContent.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DateRangePickerContent",
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
    as: {},
    disableOutsidePointerEvents: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popover_PopoverPortal._sfc_main), null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Popover_PopoverContent._sfc_main), vue.normalizeProps(vue.guardReactiveProps({ ...vue.unref(forwarded), ..._ctx.$attrs })), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DateRangePickerContent.cjs.map
