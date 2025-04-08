'use strict';

const vue = require('vue');
const Popper_PopperContent = require('../Popper/PopperContent.cjs');
const DismissableLayer_DismissableLayer = require('../DismissableLayer/DismissableLayer.cjs');
const HoverCard_utils = require('./utils.cjs');
require('@floating-ui/vue');
const shared = require('@vueuse/shared');
const shared_useForwardProps = require('../shared/useForwardProps.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useGraceArea = require('../shared/useGraceArea.cjs');
const HoverCard_HoverCardRoot = require('./HoverCardRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const forwarded = shared_useForwardProps.useForwardProps(props);
    const { forwardRef, currentElement: contentElement } = shared_useForwardExpose.useForwardExpose();
    const rootContext = HoverCard_HoverCardRoot.injectHoverCardRootContext();
    const { isPointerInTransit, onPointerExit } = shared_useGraceArea.useGraceArea(rootContext.triggerElement, contentElement);
    shared.syncRef(rootContext.isPointerInTransitRef, isPointerInTransit, { direction: "rtl" });
    onPointerExit(() => {
      rootContext.onClose();
    });
    const containSelection = vue.ref(false);
    let originalBodyUserSelect;
    vue.watchEffect((cleanupFn) => {
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
      vue.nextTick(() => {
        const hasSelection = document.getSelection()?.toString() !== "";
        if (hasSelection)
          rootContext.hasSelectionRef.value = true;
      });
    }
    vue.onMounted(() => {
      if (contentElement.value) {
        document.addEventListener("pointerup", handlePointerUp);
        const tabbables = HoverCard_utils.getTabbableNodes(contentElement.value);
        tabbables.forEach((tabbable) => tabbable.setAttribute("tabindex", "-1"));
      }
    });
    vue.onUnmounted(() => {
      document.removeEventListener("pointerup", handlePointerUp);
      rootContext.hasSelectionRef.value = false;
      rootContext.isPointerDownOnContentRef.value = false;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(DismissableLayer_DismissableLayer._sfc_main), {
        "as-child": "",
        "disable-outside-pointer-events": false,
        onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
        onPointerDownOutside: _cache[2] || (_cache[2] = ($event) => emits("pointerDownOutside", $event)),
        onFocusOutside: _cache[3] || (_cache[3] = vue.withModifiers(($event) => emits("focusOutside", $event), ["prevent"])),
        onDismiss: vue.unref(rootContext).onDismiss
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Popper_PopperContent._sfc_main), vue.mergeProps({ ...vue.unref(forwarded), ..._ctx.$attrs }, {
            ref: vue.unref(forwardRef),
            "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
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
              vue.unref(rootContext).hasSelectionRef.value = false;
              vue.unref(rootContext).isPointerDownOnContentRef.value = true;
            })
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["data-state", "style"])
        ]),
        _: 3
      }, 8, ["onDismiss"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=HoverCardContentImpl.cjs.map
