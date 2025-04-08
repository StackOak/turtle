import { defineComponent, onMounted, computed, createBlock, openBlock, unref, normalizeStyle, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './ScrollAreaScrollbarImpl.js';
import { c as getThumbSize } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectScrollAreaRootContext } from './ScrollAreaRoot.js';
import { i as injectScrollAreaScrollbarVisibleContext } from './ScrollAreaScrollbarVisible.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarX",
  setup(__props) {
    const rootContext = injectScrollAreaRootContext();
    const scrollbarVisibleContext = injectScrollAreaScrollbarVisibleContext();
    const { forwardRef, currentElement: scrollbarElement } = useForwardExpose();
    onMounted(() => {
      if (scrollbarElement.value)
        rootContext.onScrollbarXChange(scrollbarElement.value);
    });
    const sizes = computed(() => scrollbarVisibleContext.sizes.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        ref: unref(forwardRef),
        "is-horizontal": true,
        "data-orientation": "horizontal",
        style: normalizeStyle({
          bottom: 0,
          left: unref(rootContext).dir.value === "rtl" ? "var(--reka-scroll-area-corner-width)" : 0,
          right: unref(rootContext).dir.value === "ltr" ? "var(--reka-scroll-area-corner-width)" : 0,
          ["--reka-scroll-area-thumb-width"]: sizes.value ? `${unref(getThumbSize)(sizes.value)}px` : void 0
        }),
        onOnDragScroll: _cache[0] || (_cache[0] = ($event) => unref(scrollbarVisibleContext).onDragScroll($event.x))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["style"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ScrollAreaScrollbarX.js.map
