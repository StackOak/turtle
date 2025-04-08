import { defineComponent, onMounted, computed, createBlock, openBlock, unref, normalizeStyle, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './ScrollAreaScrollbarImpl.js';
import { c as getThumbSize } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectScrollAreaRootContext } from './ScrollAreaRoot.js';
import { i as injectScrollAreaScrollbarVisibleContext } from './ScrollAreaScrollbarVisible.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarY",
  setup(__props) {
    const rootContext = injectScrollAreaRootContext();
    const scrollbarVisibleContext = injectScrollAreaScrollbarVisibleContext();
    const { forwardRef, currentElement: scrollbarElement } = useForwardExpose();
    onMounted(() => {
      if (scrollbarElement.value)
        rootContext.onScrollbarYChange(scrollbarElement.value);
    });
    const sizes = computed(() => scrollbarVisibleContext.sizes.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, {
        ref: unref(forwardRef),
        "is-horizontal": false,
        "data-orientation": "vertical",
        style: normalizeStyle({
          top: 0,
          right: unref(rootContext).dir.value === "ltr" ? 0 : void 0,
          left: unref(rootContext).dir.value === "rtl" ? 0 : void 0,
          bottom: "var(--reka-scroll-area-corner-height)",
          ["--reka-scroll-area-thumb-height"]: sizes.value ? `${unref(getThumbSize)(sizes.value)}px` : void 0
        }),
        onOnDragScroll: _cache[0] || (_cache[0] = ($event) => unref(scrollbarVisibleContext).onDragScroll($event.y))
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
//# sourceMappingURL=ScrollAreaScrollbarY.js.map
