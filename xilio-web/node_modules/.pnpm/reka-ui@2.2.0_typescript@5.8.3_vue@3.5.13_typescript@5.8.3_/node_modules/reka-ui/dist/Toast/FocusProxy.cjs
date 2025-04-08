'use strict';

const vue = require('vue');
const VisuallyHidden_VisuallyHidden = require('../VisuallyHidden/VisuallyHidden.cjs');
const Toast_ToastProvider = require('./ToastProvider.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "FocusProxy",
  emits: ["focusFromOutsideViewport"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const providerContext = Toast_ToastProvider.injectToastProviderContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHidden._sfc_main), {
        "aria-hidden": "true",
        tabindex: "0",
        style: { "position": "fixed" },
        onFocus: _cache[0] || (_cache[0] = (event) => {
          const prevFocusedElement = event.relatedTarget;
          const isFocusFromOutsideViewport = !vue.unref(providerContext).viewport.value?.contains(prevFocusedElement);
          if (isFocusFromOutsideViewport) emits("focusFromOutsideViewport");
        })
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=FocusProxy.cjs.map
