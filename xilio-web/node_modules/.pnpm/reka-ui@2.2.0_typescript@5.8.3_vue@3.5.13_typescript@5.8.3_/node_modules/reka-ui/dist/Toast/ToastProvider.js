import { defineComponent, toRefs, ref, renderSlot } from 'vue';
import { u as useCollection } from '../Collection/Collection.js';
import { c as createContext } from '../shared/createContext.js';

const [injectToastProviderContext, provideToastProviderContext] = createContext("ToastProvider");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ToastProvider",
  props: {
    label: { default: "Notification" },
    duration: { default: 5e3 },
    swipeDirection: { default: "right" },
    swipeThreshold: { default: 50 }
  },
  setup(__props) {
    const props = __props;
    const { label, duration, swipeDirection, swipeThreshold } = toRefs(props);
    useCollection({ isProvider: true });
    const viewport = ref();
    const toastCount = ref(0);
    const isFocusedToastEscapeKeyDownRef = ref(false);
    const isClosePausedRef = ref(false);
    if (props.label && typeof props.label === "string" && !props.label.trim()) {
      const error = "Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.";
      throw new Error(error);
    }
    provideToastProviderContext({
      label,
      duration,
      swipeDirection,
      swipeThreshold,
      toastCount,
      viewport,
      onViewportChange(el) {
        viewport.value = el;
      },
      onToastAdd() {
        toastCount.value++;
      },
      onToastRemove() {
        toastCount.value--;
      },
      isFocusedToastEscapeKeyDownRef,
      isClosePausedRef
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});

export { _sfc_main as _, injectToastProviderContext as i };
//# sourceMappingURL=ToastProvider.js.map
