import { defineComponent, ref, onMounted, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { useDebounceFn, useResizeObserver } from '@vueuse/core';
import { _ as _sfc_main$1 } from './ScrollAreaScrollbarVisible.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectScrollAreaRootContext } from './ScrollAreaRoot.js';
import { i as injectScrollAreaScrollbarContext } from './ScrollAreaScrollbar.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarAuto",
  props: {
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const rootContext = injectScrollAreaRootContext();
    const scrollbarContext = injectScrollAreaScrollbarContext();
    const { forwardRef } = useForwardExpose();
    const visible = ref(false);
    const handleResize = useDebounceFn(() => {
      if (rootContext.viewport.value) {
        const isOverflowX = rootContext.viewport.value.offsetWidth < rootContext.viewport.value.scrollWidth;
        const isOverflowY = rootContext.viewport.value.offsetHeight < rootContext.viewport.value.scrollHeight;
        visible.value = scrollbarContext.isHorizontal.value ? isOverflowX : isOverflowY;
      }
    }, 10);
    onMounted(() => handleResize());
    useResizeObserver(rootContext.viewport, handleResize);
    useResizeObserver(rootContext.content, handleResize);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || visible.value
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1, mergeProps(_ctx.$attrs, {
            ref: unref(forwardRef),
            "data-state": visible.value ? "visible" : "hidden"
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["data-state"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ScrollAreaScrollbarAuto.js.map
