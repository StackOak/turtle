'use strict';

const vue = require('vue');
const Popover_PopoverContentImpl = require('./PopoverContentImpl.cjs');
const shared_useBodyScrollLock = require('../shared/useBodyScrollLock.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useHideOthers = require('../shared/useHideOthers.cjs');
const Popover_PopoverRoot = require('./PopoverRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PopoverContentModal",
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
    const isRightClickOutsideRef = vue.ref(false);
    shared_useBodyScrollLock.useBodyScrollLock(true);
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    shared_useHideOthers.useHideOthers(currentElement);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Popover_PopoverContentImpl._sfc_main, vue.mergeProps(vue.unref(forwarded), {
        ref: vue.unref(forwardRef),
        "trap-focus": vue.unref(rootContext).open.value,
        "disable-outside-pointer-events": "",
        onCloseAutoFocus: _cache[0] || (_cache[0] = vue.withModifiers(
          (event) => {
            emits("closeAutoFocus", event);
            if (!isRightClickOutsideRef.value) vue.unref(rootContext).triggerElement.value?.focus();
          },
          ["prevent"]
        )),
        onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
          emits("pointerDownOutside", event);
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          isRightClickOutsideRef.value = isRightClick;
        }),
        onFocusOutside: _cache[2] || (_cache[2] = vue.withModifiers(() => {
        }, ["prevent"]))
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["trap-focus"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PopoverContentModal.cjs.map
