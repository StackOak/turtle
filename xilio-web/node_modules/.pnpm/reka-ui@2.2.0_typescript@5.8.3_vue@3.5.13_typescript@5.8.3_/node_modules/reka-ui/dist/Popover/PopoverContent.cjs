'use strict';

const vue = require('vue');
const Popover_PopoverContentModal = require('./PopoverContentModal.cjs');
const Popover_PopoverContentNonModal = require('./PopoverContentNonModal.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Popover_PopoverRoot = require('./PopoverRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PopoverContent",
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
    const rootContext = Popover_PopoverRoot.injectPopoverRootContext();
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    rootContext.contentId ||= shared_useId.useId(void 0, "reka-popover-content");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(rootContext).open.value
      }, {
        default: vue.withCtx(() => [
          vue.unref(rootContext).modal.value ? (vue.openBlock(), vue.createBlock(Popover_PopoverContentModal._sfc_main, vue.mergeProps({ key: 0 }, vue.unref(forwarded), { ref: vue.unref(forwardRef) }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)) : (vue.openBlock(), vue.createBlock(Popover_PopoverContentNonModal._sfc_main, vue.mergeProps({ key: 1 }, vue.unref(forwarded), { ref: vue.unref(forwardRef) }), {
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
//# sourceMappingURL=PopoverContent.cjs.map
