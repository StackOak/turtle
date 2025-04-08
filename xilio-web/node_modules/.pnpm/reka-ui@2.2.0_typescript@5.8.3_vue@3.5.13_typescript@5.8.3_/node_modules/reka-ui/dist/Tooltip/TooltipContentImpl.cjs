'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Tooltip_utils = require('./utils.cjs');
const Popper_PopperContent = require('../Popper/PopperContent.cjs');
const DismissableLayer_DismissableLayer = require('../DismissableLayer/DismissableLayer.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const VisuallyHidden_VisuallyHidden = require('../VisuallyHidden/VisuallyHidden.cjs');
const Tooltip_TooltipRoot = require('./TooltipRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const rootContext = Tooltip_TooltipRoot.injectTooltipRootContext();
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const slot = vue.useSlots();
    const defaultSlot = vue.computed(() => slot.default?.({}));
    const ariaLabel = vue.computed(() => {
      if (props.ariaLabel)
        return props.ariaLabel;
      let content = "";
      function recursiveTextSearch(node) {
        if (typeof node.children === "string" && node.type !== vue.Comment)
          content += node.children;
        else if (Array.isArray(node.children))
          node.children.forEach((child) => recursiveTextSearch(child));
      }
      defaultSlot.value?.forEach((node) => recursiveTextSearch(node));
      return content;
    });
    const popperContentProps = vue.computed(() => {
      const { ariaLabel: _, ...restProps } = props;
      return restProps;
    });
    vue.onMounted(() => {
      core.useEventListener(window, "scroll", (event) => {
        const target = event.target;
        if (target?.contains(rootContext.trigger.value))
          rootContext.onClose();
      });
      core.useEventListener(window, Tooltip_utils.TOOLTIP_OPEN, rootContext.onClose);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(DismissableLayer_DismissableLayer._sfc_main), {
        "as-child": "",
        "disable-outside-pointer-events": false,
        onEscapeKeyDown: _cache[0] || (_cache[0] = ($event) => emits("escapeKeyDown", $event)),
        onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
          if (vue.unref(rootContext).disableClosingTrigger.value && vue.unref(rootContext).trigger.value?.contains(event.target))
            event.preventDefault();
          emits("pointerDownOutside", event);
        }),
        onFocusOutside: _cache[2] || (_cache[2] = vue.withModifiers(() => {
        }, ["prevent"])),
        onDismiss: _cache[3] || (_cache[3] = ($event) => vue.unref(rootContext).onClose())
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Popper_PopperContent._sfc_main), vue.mergeProps({
            ref: vue.unref(forwardRef),
            "data-state": vue.unref(rootContext).stateAttribute.value
          }, { ..._ctx.$attrs, ...popperContentProps.value }, { style: {
            "--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
            "--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
            "--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
            "--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
            "--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
          } }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default"),
              vue.createVNode(vue.unref(VisuallyHidden_VisuallyHidden._sfc_main), {
                id: vue.unref(rootContext).contentId,
                role: "tooltip"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(ariaLabel.value), 1)
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

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TooltipContentImpl.cjs.map
