'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Popper_PopperRoot = require('../Popper/PopperRoot.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');

const [injectHoverCardRootContext, provideHoverCardRootContext] = shared_createContext.createContext("HoverCardRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { openDelay, closeDelay } = vue.toRefs(props);
    shared_useForwardExpose.useForwardExpose();
    const open = core.useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const openTimerRef = vue.ref(0);
    const closeTimerRef = vue.ref(0);
    const hasSelectionRef = vue.ref(false);
    const isPointerDownOnContentRef = vue.ref(false);
    const isPointerInTransitRef = vue.ref(false);
    const triggerElement = vue.ref();
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
exports.injectHoverCardRootContext = injectHoverCardRootContext;
//# sourceMappingURL=HoverCardRoot.cjs.map
