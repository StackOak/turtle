import { defineComponent, toRefs, ref, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { _ as _sfc_main$1 } from '../Popper/PopperRoot.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';

const [injectHoverCardRootContext, provideHoverCardRootContext] = createContext("HoverCardRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HoverCardRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    openDelay: { default: 700 },
    closeDelay: { default: 300 }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { openDelay, closeDelay } = toRefs(props);
    useForwardExpose();
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const openTimerRef = ref(0);
    const closeTimerRef = ref(0);
    const hasSelectionRef = ref(false);
    const isPointerDownOnContentRef = ref(false);
    const isPointerInTransitRef = ref(false);
    const triggerElement = ref();
    function handleOpen() {
      clearTimeout(closeTimerRef.value);
      openTimerRef.value = window.setTimeout(() => open.value = true, openDelay.value);
    }
    function handleClose() {
      clearTimeout(openTimerRef.value);
      if (!hasSelectionRef.value && !isPointerDownOnContentRef.value)
        closeTimerRef.value = window.setTimeout(() => open.value = false, closeDelay.value);
    }
    function handleDismiss() {
      open.value = false;
    }
    provideHoverCardRootContext({
      open,
      onOpenChange(value) {
        open.value = value;
      },
      onOpen: handleOpen,
      onClose: handleClose,
      onDismiss: handleDismiss,
      hasSelectionRef,
      isPointerDownOnContentRef,
      isPointerInTransitRef,
      triggerElement
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

export { _sfc_main as _, injectHoverCardRootContext as i };
//# sourceMappingURL=HoverCardRoot.js.map
