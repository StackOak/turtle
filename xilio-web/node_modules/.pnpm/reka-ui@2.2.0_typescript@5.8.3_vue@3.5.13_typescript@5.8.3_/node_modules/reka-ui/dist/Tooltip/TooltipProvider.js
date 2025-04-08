import { defineComponent, toRefs, ref, renderSlot } from 'vue';
import { useTimeoutFn } from '@vueuse/shared';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';

const [injectTooltipProviderContext, provideTooltipProviderContext] = createContext("TooltipProvider");
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { delayDuration, skipDelayDuration, disableHoverableContent, disableClosingTrigger, ignoreNonKeyboardFocus, disabled } = toRefs(props);
    useForwardExpose();
    const isOpenDelayed = ref(true);
    const isPointerInTransitRef = ref(false);
    const { start: startTimer, stop: clearTimer } = useTimeoutFn(() => {
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
      return renderSlot(_ctx.$slots, "default");
    };
  }
});

export { _sfc_main as _, injectTooltipProviderContext as i };
//# sourceMappingURL=TooltipProvider.js.map
