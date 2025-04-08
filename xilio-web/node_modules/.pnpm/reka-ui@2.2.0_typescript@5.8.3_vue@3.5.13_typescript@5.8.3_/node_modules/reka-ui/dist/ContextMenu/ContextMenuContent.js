import { defineComponent, ref, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Menu/MenuContent.js';
import { u as useForwardPropsEmits } from '../shared/useForwardPropsEmits.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectContextMenuRootContext } from './ContextMenuRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContextMenuContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    alignOffset: { default: 0 },
    avoidCollisions: { type: Boolean, default: true },
    collisionBoundary: { default: () => [] },
    collisionPadding: { default: 0 },
    sticky: { default: "partial" },
    hideWhenDetached: { type: Boolean, default: false },
    positionStrategy: {},
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
    const rootContext = injectContextMenuRootContext();
    const hasInteractedOutside = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), mergeProps(unref(forwarded), {
        side: "right",
        "side-offset": 2,
        align: "start",
        "update-position-strategy": "always",
        style: {
          "--reka-context-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
          "--reka-context-menu-content-available-width": "var(--reka-popper-available-width)",
          "--reka-context-menu-content-available-height": "var(--reka-popper-available-height)",
          "--reka-context-menu-trigger-width": "var(--reka-popper-anchor-width)",
          "--reka-context-menu-trigger-height": "var(--reka-popper-anchor-height)"
        },
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented && hasInteractedOutside.value) {
            event.preventDefault();
          }
          hasInteractedOutside.value = false;
        }),
        onInteractOutside: _cache[1] || (_cache[1] = (event) => {
          const originalEvent = event.detail.originalEvent;
          if (originalEvent.button === 2 && event.target === unref(rootContext).triggerElement.value) {
            event.preventDefault();
          }
          if (!event.defaultPrevented && !unref(rootContext).modal.value)
            hasInteractedOutside.value = true;
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ContextMenuContent.js.map
