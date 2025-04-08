import { defineComponent, ref, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Menu/MenuContent.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useId } from '../shared/useId.js';
import { i as injectDropdownMenuRootContext } from './DropdownMenuRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const forwarded = useForwardPropsEmits(props, emits);
    useForwardExpose();
    const rootContext = injectDropdownMenuRootContext();
    const hasInteractedOutsideRef = ref(false);
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
    rootContext.contentId ||= useId(void 0, "reka-dropdown-menu-content");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps(unref(forwarded), {
        id: unref(rootContext).contentId,
        "aria-labelledby": unref(rootContext)?.triggerId,
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
          if (!unref(rootContext).modal.value || isRightClick) hasInteractedOutsideRef.value = true;
          if (unref(rootContext).triggerElement.value?.contains(event.target)) event.preventDefault();
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "aria-labelledby"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DropdownMenuContent.js.map
