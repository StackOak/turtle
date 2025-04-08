import { defineComponent, computed, createBlock, createCommentVNode, openBlock, mergeProps, unref, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './ScrollAreaCornerImpl.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectScrollAreaRootContext } from './ScrollAreaRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaCorner",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const rootContext = injectScrollAreaRootContext();
    const hasBothScrollbarsVisible = computed(
      () => !!rootContext.scrollbarX.value && !!rootContext.scrollbarY.value
    );
    const hasCorner = computed(
      () => rootContext.type.value !== "scroll" && hasBothScrollbarsVisible.value
    );
    return (_ctx, _cache) => {
      return hasCorner.value ? (openBlock(), createBlock(_sfc_main$1, mergeProps({ key: 0 }, props, { ref: unref(forwardRef) }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ScrollAreaCorner.js.map
