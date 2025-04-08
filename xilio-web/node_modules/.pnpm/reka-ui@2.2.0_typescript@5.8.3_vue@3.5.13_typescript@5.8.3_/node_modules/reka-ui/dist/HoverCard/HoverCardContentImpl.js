import { defineComponent, ref, watchEffect, onMounted, onUnmounted, createBlock, openBlock, unref, withModifiers, withCtx, createVNode, mergeProps, renderSlot, nextTick } from 'vue';
import { _ as _sfc_main$2 } from '../Popper/PopperContent.js';
import { _ as _sfc_main$1 } from '../DismissableLayer/DismissableLayer.js';
import { g as getTabbableNodes } from './utils.js';
import '@floating-ui/vue';
import { syncRef } from '@vueuse/shared';
import { u as useForwardProps } from '../shared/useForwardProps.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useGraceArea } from '../shared/useGraceArea.js';
import { i as injectHoverCardRootContext } from './HoverCardRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HoverCardContentImpl",
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
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardProps(props);
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    const rootContext = injectHoverCardRootContext();
    const { isPointerInTransit, onPointerExit } = useGraceArea(rootContext.triggerElement, contentElement);
    syncRef(rootContext.isPointerInTransitRef, isPointerInTransit, { direction: "rtl" });
    onPointerExit(() => {
      rootContext.onClose();
    });
    const containSelection = ref(false);
    let originalBodyUserSelect;
    watchEffect((cleanupFn) => {
      if (containSelection.value) {
        const body = document.body;
        originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;
        body.style.userSelect = "none";
        body.style.webkitUserSelect = "none";
        cleanupFn(() => {
          body.style.userSelect = originalBodyUserSelect;
          body.style.webkitUserSelect = originalBodyUserSelect;
        });
      }
    });
    function handlePointerUp() {
      containSelection.value = false;
      rootContext.isPointerDownOnContentRef.value = false;
      nextTick(() => {
        const hasSelection = document.getSelection()?.toString() !== "";
        if (hasSelection)
          rootContext.hasSelectionRef.value = true;
      });
    }
    onMounted(() => {
      if (contentElement.value) {
        document.addEventListener("pointerup", handlePointerUp);
        const tabbables = getTabbableNodes(contentElement.value);
        tabbables.forEach((tabbable) => tabbable.setAttribute("tabindex", "-1"));
      }
    });
    onUnmounted(() => {
      document.removeEventListener("pointerup", handlePointerUp);
      rootContext.hasSelectionRef.value = false;
      rootContext.isPointerDownOnContentRef.value = false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        "disable-outside-pointer-events": false,
        onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
        onPointerDownOutside: _cache[2] || (_cache[2] = ($event) => emits("pointerDownOutside", $event)),
        onFocusOutside: _cache[3] || (_cache[3] = withModifiers(($event) => emits("focusOutside", $event), ["prevent"])),
        onDismiss: unref(rootContext).onDismiss
      }, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$2), mergeProps({ ...unref(forwarded), ..._ctx.$attrs }, {
            ref: unref(forwardRef),
            "data-state": unref(rootContext).open.value ? "open" : "closed",
            style: {
              "userSelect": containSelection.value ? "text" : void 0,
              // Safari requires prefix
              "WebkitUserSelect": containSelection.value ? "text" : void 0,
              // re-namespace exposed content custom properties
              "--reka-hover-card-content-transform-origin": "var(--reka-popper-transform-origin)",
              "--reka-hover-card-content-available-width": "var(--reka-popper-available-width)",
              "--reka-hover-card-content-available-height": "var(--reka-popper-available-height)",
              "--reka-hover-card-trigger-width": "var(--reka-popper-anchor-width)",
              "--reka-hover-card-trigger-height": "var(--reka-popper-anchor-height)"
            },
            onPointerdown: _cache[0] || (_cache[0] = (event) => {
              if (event.currentTarget.contains(event.target)) {
                containSelection.value = true;
              }
              unref(rootContext).hasSelectionRef.value = false;
              unref(rootContext).isPointerDownOnContentRef.value = true;
            })
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["data-state", "style"])
        ]),
        _: 3
      }, 8, ["onDismiss"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=HoverCardContentImpl.js.map
