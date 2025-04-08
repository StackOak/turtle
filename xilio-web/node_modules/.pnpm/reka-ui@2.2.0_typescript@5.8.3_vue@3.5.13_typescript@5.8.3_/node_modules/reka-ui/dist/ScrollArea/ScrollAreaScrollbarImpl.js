import { defineComponent, ref, onMounted, onUnmounted, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { t as toInt } from './utils.js';
import { i as injectScrollAreaScrollbarVisibleContext } from './ScrollAreaScrollbarVisible.js';
import { i as injectScrollAreaScrollbarContext } from './ScrollAreaScrollbar.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectScrollAreaRootContext } from './ScrollAreaRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarImpl",
  props: {
    isHorizontal: { type: Boolean }
  },
  emits: ["onDragScroll", "onWheelScroll", "onThumbPointerDown"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rootContext = injectScrollAreaRootContext();
    const scrollbarVisibleContext = injectScrollAreaScrollbarVisibleContext();
    const scrollbarContext = injectScrollAreaScrollbarContext();
    const { forwardRef, currentElement: scrollbar } = useForwardExpose();
    const prevWebkitUserSelectRef = ref("");
    const rectRef = ref();
    function handleDragScroll(event) {
      if (rectRef.value) {
        const x = event.clientX - rectRef.value?.left;
        const y = event.clientY - rectRef.value?.top;
        emit("onDragScroll", { x, y });
      }
    }
    function handlePointerDown(event) {
      const mainPointer = 0;
      if (event.button === mainPointer) {
        const element = event.target;
        element.setPointerCapture(event.pointerId);
        rectRef.value = scrollbar.value.getBoundingClientRect();
        prevWebkitUserSelectRef.value = document.body.style.webkitUserSelect;
        document.body.style.webkitUserSelect = "none";
        if (rootContext.viewport)
          rootContext.viewport.value.style.scrollBehavior = "auto";
        handleDragScroll(event);
      }
    }
    function handlePointerMove(event) {
      handleDragScroll(event);
    }
    function handlePointerUp(event) {
      const element = event.target;
      if (element.hasPointerCapture(event.pointerId))
        element.releasePointerCapture(event.pointerId);
      document.body.style.webkitUserSelect = prevWebkitUserSelectRef.value;
      if (rootContext.viewport)
        rootContext.viewport.value.style.scrollBehavior = "";
      rectRef.value = void 0;
    }
    function handleWheel(event) {
      const element = event.target;
      const isScrollbarWheel = scrollbar.value?.contains(element);
      const maxScrollPos = scrollbarVisibleContext.sizes.value.content - scrollbarVisibleContext.sizes.value.viewport;
      if (isScrollbarWheel)
        scrollbarVisibleContext.handleWheelScroll(event, maxScrollPos);
    }
    onMounted(() => {
      document.addEventListener("wheel", handleWheel, { passive: false });
    });
    onUnmounted(() => {
      document.removeEventListener("wheel", handleWheel);
    });
    function handleSizeChange() {
      if (!scrollbar.value)
        return;
      if (props.isHorizontal) {
        scrollbarVisibleContext.handleSizeChange({
          content: rootContext.viewport.value?.scrollWidth ?? 0,
          viewport: rootContext.viewport.value?.offsetWidth ?? 0,
          scrollbar: {
            size: scrollbar.value.clientWidth ?? 0,
            paddingStart: toInt(getComputedStyle(scrollbar.value).paddingLeft),
            paddingEnd: toInt(getComputedStyle(scrollbar.value).paddingRight)
          }
        });
      } else {
        scrollbarVisibleContext.handleSizeChange({
          content: rootContext.viewport.value?.scrollHeight ?? 0,
          viewport: rootContext.viewport.value?.offsetHeight ?? 0,
          scrollbar: {
            size: scrollbar.value?.clientHeight ?? 0,
            paddingStart: toInt(getComputedStyle(scrollbar.value).paddingLeft),
            paddingEnd: toInt(getComputedStyle(scrollbar.value).paddingRight)
          }
        });
      }
    }
    useResizeObserver(scrollbar, handleSizeChange);
    useResizeObserver(rootContext.content, handleSizeChange);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        style: { "position": "absolute" },
        "data-scrollbarimpl": "",
        as: unref(scrollbarContext).as.value,
        "as-child": unref(scrollbarContext).asChild.value,
        onPointerdown: handlePointerDown,
        onPointermove: handlePointerMove,
        onPointerup: handlePointerUp
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ScrollAreaScrollbarImpl.js.map
