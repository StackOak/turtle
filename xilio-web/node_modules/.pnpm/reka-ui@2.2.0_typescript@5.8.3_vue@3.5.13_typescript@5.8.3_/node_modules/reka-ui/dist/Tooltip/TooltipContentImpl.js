import { defineComponent, useSlots, computed, onMounted, createBlock, openBlock, unref, withModifiers, withCtx, createVNode, mergeProps, renderSlot, createTextVNode, toDisplayString, Comment } from 'vue';
import { useEventListener } from '@vueuse/core';
import { T as TOOLTIP_OPEN } from './utils.js';
import { _ as _sfc_main$2 } from '../Popper/PopperContent.js';
import { _ as _sfc_main$1 } from '../DismissableLayer/DismissableLayer.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$3 } from '../VisuallyHidden/VisuallyHidden.js';
import { i as injectTooltipRootContext } from './TooltipRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TooltipContentImpl",
  props: {
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: { default: "top" },
    sideOffset: { default: 0 },
    align: { default: "center" },
    alignOffset: {},
    avoidCollisions: { type: Boolean, default: true },
    collisionBoundary: { default: () => [] },
    collisionPadding: { default: 0 },
    arrowPadding: { default: 0 },
    sticky: { default: "partial" },
    hideWhenDetached: { type: Boolean, default: false },
    positionStrategy: {},
    updatePositionStrategy: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectTooltipRootContext();
    const { forwardRef } = useForwardExpose();
    const slot = useSlots();
    const defaultSlot = computed(() => slot.default?.({}));
    const ariaLabel = computed(() => {
      if (props.ariaLabel)
        return props.ariaLabel;
      let content = "";
      function recursiveTextSearch(node) {
        if (typeof node.children === "string" && node.type !== Comment)
          content += node.children;
        else if (Array.isArray(node.children))
          node.children.forEach((child) => recursiveTextSearch(child));
      }
      defaultSlot.value?.forEach((node) => recursiveTextSearch(node));
      return content;
    });
    const popperContentProps = computed(() => {
      const { ariaLabel: _, ...restProps } = props;
      return restProps;
    });
    onMounted(() => {
      useEventListener(window, "scroll", (event) => {
        const target = event.target;
        if (target?.contains(rootContext.trigger.value))
          rootContext.onClose();
      });
      useEventListener(window, TOOLTIP_OPEN, rootContext.onClose);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        "disable-outside-pointer-events": false,
        onEscapeKeyDown: _cache[0] || (_cache[0] = ($event) => emits("escapeKeyDown", $event)),
        onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
          if (unref(rootContext).disableClosingTrigger.value && unref(rootContext).trigger.value?.contains(event.target))
            event.preventDefault();
          emits("pointerDownOutside", event);
        }),
        onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["prevent"])),
        onDismiss: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onClose())
      }, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$2), mergeProps({
            ref: unref(forwardRef),
            "data-state": unref(rootContext).stateAttribute.value
          }, { ..._ctx.$attrs, ...popperContentProps.value }, { style: {
            "--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
            "--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
            "--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
            "--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
            "--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
          } }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default"),
              createVNode(unref(_sfc_main$3), {
                id: unref(rootContext).contentId,
                role: "tooltip"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(ariaLabel.value), 1)
                ]),
                _: 1
              }, 8, ["id"])
            ]),
            _: 3
          }, 16, ["data-state"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=TooltipContentImpl.js.map
