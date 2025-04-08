import { defineComponent, ref, createBlock, createCommentVNode, unref, openBlock, withCtx, createTextVNode, renderSlot, toDisplayString } from 'vue';
import { useTimeout } from '@vueuse/shared';
import { useRafFn } from '@vueuse/core';
import { i as injectToastProviderContext } from './ToastProvider.js';
import { _ as _sfc_main$1 } from '../VisuallyHidden/VisuallyHidden.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToastAnnounce",
  setup(__props) {
    const providerContext = injectToastProviderContext();
    const isAnnounced = useTimeout(1e3);
    const renderAnnounceText = ref(false);
    useRafFn(() => {
      renderAnnounceText.value = true;
    });
    return (_ctx, _cache) => {
      return unref(isAnnounced) || renderAnnounceText.value ? (openBlock(), createBlock(unref(_sfc_main$1), { key: 0 }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(unref(providerContext).label.value) + " ", 1),
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      })) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToastAnnounce.js.map
