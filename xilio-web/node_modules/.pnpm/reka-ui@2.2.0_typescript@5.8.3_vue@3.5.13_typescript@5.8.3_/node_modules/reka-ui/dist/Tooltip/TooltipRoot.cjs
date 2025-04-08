'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Popper_PopperRoot = require('../Popper/PopperRoot.cjs');
const Tooltip_utils = require('./utils.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Tooltip_TooltipProvider = require('./TooltipProvider.cjs');

const [injectTooltipRootContext, provideTooltipRootContext] = shared_createContext.createContext("TooltipRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TooltipRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    delayDuration: { default: void 0 },
    disableHoverableContent: { type: Boolean, default: void 0 },
    disableClosingTrigger: { type: Boolean, default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    ignoreNonKeyboardFocus: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    shared_useForwardExpose.useForwardExpose();
    const providerContext = Tooltip_TooltipProvider.injectTooltipProviderContext();
    const disableHoverableContent = vue.computed(() => props.disableHoverableContent ?? providerContext.disableHoverableContent.value);
    const disableClosingTrigger = vue.computed(() => props.disableClosingTrigger ?? providerContext.disableClosingTrigger.value);
    const disableTooltip = vue.computed(() => props.disabled ?? providerContext.disabled.value);
    const delayDuration = vue.computed(() => props.delayDuration ?? providerContext.delayDuration.value);
    const ignoreNonKeyboardFocus = vue.computed(() => props.ignoreNonKeyboardFocus ?? providerContext.ignoreNonKeyboardFocus.value);
    const open = core.useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    vue.watch(open, (isOpen) => {
      if (!providerContext.onClose)
        return;
      if (isOpen) {
        providerContext.onOpen();
        document.dispatchEvent(new CustomEvent(Tooltip_utils.TOOLTIP_OPEN));
      } else {
        providerContext.onClose();
      }
    });
    const wasOpenDelayedRef = vue.ref(false);
    const trigger = vue.ref();
    const stateAttribute = vue.computed(() => {
      if (!open.value)
        return "closed";
      return wasOpenDelayedRef.value ? "delayed-open" : "instant-open";
    });
    const { start: startTimer, stop: clearTimer } = core.useTimeoutFn(() => {
      wasOpenDelayedRef.value = true;
      open.value = true;
    }, delayDuration, { immediate: false });
    function handleOpen() {
      clearTimer();
      wasOpenDelayedRef.value = false;
      open.value = true;
    }
    function handleClose() {
      clearTimer();
      open.value = false;
    }
    function handleDelayedOpen() {
      startTimer();
    }
    provideTooltipRootContext({
      contentId: "",
      open,
      stateAttribute,
      trigger,
      onTriggerChange(el) {
        trigger.value = el;
      },
      onTriggerEnter() {
        if (providerContext.isOpenDelayed.value)
          handleDelayedOpen();
        else handleOpen();
      },
      onTriggerLeave() {
        if (disableHoverableContent.value) {
          handleClose();
        } else {
          clearTimer();
        }
      },
      onOpen: handleOpen,
      onClose: handleClose,
      disableHoverableContent,
      disableClosingTrigger,
      disabled: disableTooltip,
      ignoreNonKeyboardFocus
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperRoot._sfc_main), null, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { open: vue.unref(open) })
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectTooltipRootContext = injectTooltipRootContext;
//# sourceMappingURL=TooltipRoot.cjs.map
