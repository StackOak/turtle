'use strict';

const vue = require('vue');
const Popover_PopoverContentImpl = require('./PopoverContentImpl.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const Popover_PopoverRoot = require('./PopoverRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PopoverContentNonModal",
  props: {
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
    const hasInteractedOutsideRef = vue.ref(false);
    const hasPointerDownOutsideRef = vue.ref(false);
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Popover_PopoverContentImpl._sfc_main, vue.mergeProps(vue.unref(forwarded), {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          emits("closeAutoFocus", event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.value) vue.unref(rootContext).triggerElement.value?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.value = false;
          hasPointerDownOutsideRef.value = false;
        }),
        onInteractOutside: _cache[1] || (_cache[1] = async (event) => {
          emits("interactOutside", event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.value = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.value = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = vue.unref(rootContext).triggerElement.value?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) {
            event.preventDefault();
          }
        })
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PopoverContentNonModal.cjs.map
