'use strict';

const vue = require('vue');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_createContext = require('../shared/createContext.cjs');

const [injectToastProviderContext, provideToastProviderContext] = shared_createContext.createContext("ToastProvider");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { label, duration, swipeDirection, swipeThreshold } = vue.toRefs(props);
    Collection_Collection.useCollection({ isProvider: true });
    const viewport = vue.ref();
    const toastCount = vue.ref(0);
    const isFocusedToastEscapeKeyDownRef = vue.ref(false);
    const isClosePausedRef = vue.ref(false);
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
      return vue.renderSlot(_ctx.$slots, "default");
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectToastProviderContext = injectToastProviderContext;
//# sourceMappingURL=ToastProvider.cjs.map
