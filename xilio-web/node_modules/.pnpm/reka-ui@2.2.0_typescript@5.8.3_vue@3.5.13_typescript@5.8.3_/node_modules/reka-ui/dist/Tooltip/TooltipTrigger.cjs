'use strict';

const vue = require('vue');
const Popper_PopperAnchor = require('../Popper/PopperAnchor.cjs');
const Tooltip_TooltipRoot = require('./TooltipRoot.cjs');
const shared_useId = require('../shared/useId.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Tooltip_TooltipProvider = require('./TooltipProvider.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TooltipTrigger",
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = Tooltip_TooltipRoot.injectTooltipRootContext();
    const providerContext = Tooltip_TooltipProvider.injectTooltipProviderContext();
    rootContext.contentId ||= shared_useId.useId(void 0, "reka-tooltip-content");
    const { forwardRef, currentElement: triggerElement } = shared_useForwardExpose.useForwardExpose();
    const isPointerDown = vue.ref(false);
    const hasPointerMoveOpened = vue.ref(false);
    const tooltipListeners = vue.computed(() => {
      if (rootContext.disabled.value)
        return {};
      return {
        click: handleClick,
        focus: handleFocus,
        pointermove: handlePointerMove,
        pointerleave: handlePointerLeave,
        pointerdown: handlePointerDown,
        blur: handleBlur
      };
    });
    vue.onMounted(() => {
      rootContext.onTriggerChange(triggerElement.value);
    });
    function handlePointerUp() {
      setTimeout(() => {
        isPointerDown.value = false;
      }, 1);
    }
    function handlePointerDown() {
      isPointerDown.value = true;
      document.addEventListener("pointerup", handlePointerUp, { once: true });
    }
    function handlePointerMove(event) {
      if (event.pointerType === "touch")
        return;
      if (!hasPointerMoveOpened.value && !providerContext.isPointerInTransitRef.value) {
        rootContext.onTriggerEnter();
        hasPointerMoveOpened.value = true;
      }
    }
    function handlePointerLeave() {
      rootContext.onTriggerLeave();
      hasPointerMoveOpened.value = false;
    }
    function handleFocus(event) {
      if (isPointerDown.value)
        return;
      if (rootContext.ignoreNonKeyboardFocus.value && !event.target.matches?.(":focus-visible"))
        return;
      rootContext.onOpen();
    }
    function handleBlur() {
      rootContext.onClose();
    }
    function handleClick() {
      if (!rootContext.disableClosingTrigger.value)
        rootContext.onClose();
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperAnchor._sfc_main), {
        "as-child": "",
        reference: _ctx.reference
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
            ref: vue.unref(forwardRef),
            "aria-describedby": vue.unref(rootContext).open.value ? vue.unref(rootContext).contentId : void 0,
            "data-state": vue.unref(rootContext).stateAttribute.value,
            as: _ctx.as,
            "as-child": props.asChild,
            "data-grace-area-trigger": ""
          }, vue.toHandlers(tooltipListeners.value)), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["aria-describedby", "data-state", "as", "as-child"])
        ]),
        _: 3
      }, 8, ["reference"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TooltipTrigger.cjs.map
