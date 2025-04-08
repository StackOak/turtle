import { defineComponent, computed, watch, ref, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { useVModel, useTimeoutFn } from '@vueuse/core';
import { _ as _sfc_main$1 } from '../Popper/PopperRoot.js';
import { T as TOOLTIP_OPEN } from './utils.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectTooltipProviderContext } from './TooltipProvider.js';

const [injectTooltipRootContext, provideTooltipRootContext] = createContext("TooltipRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    useForwardExpose();
    const providerContext = injectTooltipProviderContext();
    const disableHoverableContent = computed(() => props.disableHoverableContent ?? providerContext.disableHoverableContent.value);
    const disableClosingTrigger = computed(() => props.disableClosingTrigger ?? providerContext.disableClosingTrigger.value);
    const disableTooltip = computed(() => props.disabled ?? providerContext.disabled.value);
    const delayDuration = computed(() => props.delayDuration ?? providerContext.delayDuration.value);
    const ignoreNonKeyboardFocus = computed(() => props.ignoreNonKeyboardFocus ?? providerContext.ignoreNonKeyboardFocus.value);
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    watch(open, (isOpen) => {
      if (!providerContext.onClose)
        return;
      if (isOpen) {
        providerContext.onOpen();
        document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
      } else {
        providerContext.onClose();
      }
    });
    const wasOpenDelayedRef = ref(false);
    const trigger = ref();
    const stateAttribute = computed(() => {
      if (!open.value)
        return "closed";
      return wasOpenDelayedRef.value ? "delayed-open" : "instant-open";
    });
    const { start: startTimer, stop: clearTimer } = useTimeoutFn(() => {
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
      return openBlock(), createBlock(unref(_sfc_main$1), null, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { open: unref(open) })
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _, injectTooltipRootContext as i };
//# sourceMappingURL=TooltipRoot.js.map
