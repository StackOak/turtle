import { defineComponent, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$3 } from '../Popper/PopperContent.js';
import { _ as _sfc_main$2 } from '../DismissableLayer/DismissableLayer.js';
import { reactiveOmit } from '@vueuse/shared';
import { u as useForwardProps } from '../shared/useForwardProps.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useFocusGuards } from '../shared/useFocusGuards.js';
import { _ as _sfc_main$1 } from '../FocusScope/FocusScope.js';
import { i as injectPopoverRootContext } from './PopoverRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PopoverContentImpl",
  props: {
    trapFocus: { type: Boolean },
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
    const forwarded = useForwardProps(reactiveOmit(props, "trapFocus", "disableOutsidePointerEvents"));
    const { forwardRef } = useForwardExpose();
    const rootContext = injectPopoverRootContext();
    useFocusGuards();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        loop: "",
        trapped: _ctx.trapFocus,
        onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
        onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
      }, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$2), {
            "as-child": "",
            "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
            onPointerDownOutside: _cache[0] || (_cache[0] = ($event) => emits("pointerDownOutside", $event)),
            onInteractOutside: _cache[1] || (_cache[1] = ($event) => emits("interactOutside", $event)),
            onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
            onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
            onDismiss: _cache[4] || (_cache[4] = ($event) => unref(rootContext).onOpenChange(false))
          }, {
            default: withCtx(() => [
              createVNode(unref(_sfc_main$3), mergeProps(unref(forwarded), {
                id: unref(rootContext).contentId,
                ref: unref(forwardRef),
                "data-state": unref(rootContext).open.value ? "open" : "closed",
                "aria-labelledby": unref(rootContext).triggerId,
                style: {
                  "--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
                  "--reka-popover-content-available-width": "var(--reka-popper-available-width)",
                  "--reka-popover-content-available-height": "var(--reka-popper-available-height)",
                  "--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
                  "--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
                },
                role: "dialog"
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["id", "data-state", "aria-labelledby"])
            ]),
            _: 3
          }, 8, ["disable-outside-pointer-events"])
        ]),
        _: 3
      }, 8, ["trapped"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PopoverContentImpl.js.map
