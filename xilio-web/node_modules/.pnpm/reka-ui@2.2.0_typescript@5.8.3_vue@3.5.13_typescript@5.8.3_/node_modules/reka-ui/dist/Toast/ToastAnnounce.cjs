'use strict';

const vue = require('vue');
const shared = require('@vueuse/shared');
const core = require('@vueuse/core');
const Toast_ToastProvider = require('./ToastProvider.cjs');
const VisuallyHidden_VisuallyHidden = require('../VisuallyHidden/VisuallyHidden.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ToastAnnounce",
  setup(__props) {
    const providerContext = Toast_ToastProvider.injectToastProviderContext();
    const isAnnounced = shared.useTimeout(1e3);
    const renderAnnounceText = vue.ref(false);
    core.useRafFn(() => {
      renderAnnounceText.value = true;
    });
    return (_ctx, _cache) => {
      return vue.unref(isAnnounced) || renderAnnounceText.value ? (vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHidden._sfc_main), { key: 0 }, {
        default: vue.withCtx(() => [
          vue.createTextVNode(vue.toDisplayString(vue.unref(providerContext).label.value) + " ", 1),
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      })) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ToastAnnounce.cjs.map
