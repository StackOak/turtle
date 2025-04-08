import { defineComponent, onBeforeMount, onUnmounted, createBlock, openBlock, unref, normalizeProps, guardReactiveProps, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Popper/PopperAnchor.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectPopoverRootContext } from './PopoverRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PopoverAnchor",
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectPopoverRootContext();
    onBeforeMount(() => {
      rootContext.hasCustomAnchor.value = true;
    });
    onUnmounted(() => {
      rootContext.hasCustomAnchor.value = false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=PopoverAnchor.js.map
