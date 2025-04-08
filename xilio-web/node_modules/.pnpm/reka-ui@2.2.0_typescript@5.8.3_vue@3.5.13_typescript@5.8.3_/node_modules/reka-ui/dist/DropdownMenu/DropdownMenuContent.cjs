'use strict';

const vue = require('vue');
const Menu_MenuContent = require('../Menu/MenuContent.cjs');
const shared_useForwardPropsEmits = require('../shared/useForwardPropsEmits.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const DropdownMenu_DropdownMenuRoot = require('./DropdownMenuRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DropdownMenuContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
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
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = shared_useForwardPropsEmits.useForwardPropsEmits(props, emits);
    shared_useForwardExpose.useForwardExpose();
    const rootContext = DropdownMenu_DropdownMenuRoot.injectDropdownMenuRootContext();
    const hasInteractedOutsideRef = vue.ref(false);
    function handleCloseAutoFocus(event) {
      if (event.defaultPrevented)
        return;
      if (!hasInteractedOutsideRef.value) {
        setTimeout(() => {
          rootContext.triggerElement.value?.focus();
        }, 0);
      }
      hasInteractedOutsideRef.value = false;
      event.preventDefault();
    }
    rootContext.contentId ||= shared_useId.useId(void 0, "reka-dropdown-menu-content");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuContent._sfc_main), vue.mergeProps(vue.unref(forwarded), {
        id: vue.unref(rootContext).contentId,
        "aria-labelledby": vue.unref(rootContext)?.triggerId,
        style: {
          "--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
          "--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
          "--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
          "--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
          "--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
        },
        onCloseAutoFocus: handleCloseAutoFocus,
        onInteractOutside: _cache[0] || (_cache[0] = (event) => {
          if (event.defaultPrevented) return;
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (!vue.unref(rootContext).modal.value || isRightClick) hasInteractedOutsideRef.value = true;
          if (vue.unref(rootContext).triggerElement.value?.contains(event.target)) event.preventDefault();
        })
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "aria-labelledby"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DropdownMenuContent.cjs.map
