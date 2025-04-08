'use strict';

const vue = require('vue');
const shared = require('@vueuse/shared');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');

const [injectTooltipProviderContext, provideTooltipProviderContext] = shared_createContext.createContext("TooltipProvider");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "TooltipProvider",
  props: {
    delayDuration: { default: 700 },
    skipDelayDuration: { default: 300 },
    disableHoverableContent: { type: Boolean, default: false },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { delayDuration, skipDelayDuration, disableHoverableContent, disableClosingTrigger, ignoreNonKeyboardFocus, disabled } = vue.toRefs(props);
    shared_useForwardExpose.useForwardExpose();
    const isOpenDelayed = vue.ref(true);
    const isPointerInTransitRef = vue.ref(false);
    const { start: startTimer, stop: clearTimer } = shared.useTimeoutFn(() => {
      isOpenDelayed.value = true;
    }, skipDelayDuration, { immediate: false });
    provideTooltipProviderContext({
      isOpenDelayed,
      delayDuration,
      onOpen() {
        clearTimer();
        isOpenDelayed.value = false;
      },
      onClose() {
        startTimer();
      },
      isPointerInTransitRef,
      disableHoverableContent,
      disableClosingTrigger,
      disabled,
      ignoreNonKeyboardFocus
    });
    return (_ctx, _cache) => {
      return vue.renderSlot(_ctx.$slots, "default");
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectTooltipProviderContext = injectTooltipProviderContext;
//# sourceMappingURL=TooltipProvider.cjs.map
