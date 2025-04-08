import { defineComponent, ref, computed, createBlock, openBlock, mergeProps, unref, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './ScrollAreaScrollbarX.js';
import { _ as _sfc_main$2 } from './ScrollAreaScrollbarY.js';
import { g as getThumbRatio, i as isScrollingWithinScrollbarBounds, a as getThumbOffsetFromScroll, b as getScrollPositionFromPointer } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { c as createContext } from '../shared/createContext.js';
import { i as injectScrollAreaRootContext } from './ScrollAreaRoot.js';
import { i as injectScrollAreaScrollbarContext } from './ScrollAreaScrollbar.js';

const [injectScrollAreaScrollbarVisibleContext, provideScrollAreaScrollbarVisibleContext] = createContext("ScrollAreaScrollbarVisible");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarVisible",
  setup(__props) {
    const rootContext = injectScrollAreaRootContext();
    const scrollbarContext = injectScrollAreaScrollbarContext();
    const { forwardRef } = useForwardExpose();
    const sizes = ref({
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
    });
    const hasThumb = computed(() => {
      const thumbRatio = getThumbRatio(sizes.value.viewport, sizes.value.content);
      return Boolean(thumbRatio > 0 && thumbRatio < 1);
    });
    const thumbRef = ref();
    const pointerOffset = ref(0);
    function handleWheelScroll(event, payload) {
      if (isShowingScrollbarX.value) {
        const scrollPos = rootContext.viewport.value.scrollLeft + event.deltaY;
        rootContext.viewport.value.scrollLeft = scrollPos;
        if (isScrollingWithinScrollbarBounds(scrollPos, payload))
          event.preventDefault();
      } else {
        const scrollPos = rootContext.viewport.value.scrollTop + event.deltaY;
        rootContext.viewport.value.scrollTop = scrollPos;
        if (isScrollingWithinScrollbarBounds(scrollPos, payload))
          event.preventDefault();
      }
    }
    function handleThumbDown(event, payload) {
      if (isShowingScrollbarX.value)
        pointerOffset.value = payload.x;
      else pointerOffset.value = payload.y;
    }
    function handleThumbUp(event) {
      pointerOffset.value = 0;
    }
    function handleSizeChange(payload) {
      sizes.value = payload;
    }
    function getScrollPosition(pointerPos, dir) {
      return getScrollPositionFromPointer(
        pointerPos,
        pointerOffset.value,
        sizes.value,
        dir
      );
    }
    const isShowingScrollbarX = computed(
      () => scrollbarContext.isHorizontal.value
    );
    function onDragScroll(payload) {
      if (isShowingScrollbarX.value) {
        rootContext.viewport.value.scrollLeft = getScrollPosition(
          payload,
          rootContext.dir.value
        );
      } else {
        rootContext.viewport.value.scrollTop = getScrollPosition(payload);
      }
    }
    function onThumbPositionChange() {
      if (isShowingScrollbarX.value) {
        if (rootContext.viewport.value && thumbRef.value) {
          const scrollPos = rootContext.viewport.value.scrollLeft;
          const offset = getThumbOffsetFromScroll(
            scrollPos,
            sizes.value,
            rootContext.dir.value
          );
          thumbRef.value.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
      } else {
        if (rootContext.viewport.value && thumbRef.value) {
          const scrollPos = rootContext.viewport.value.scrollTop;
          const offset = getThumbOffsetFromScroll(scrollPos, sizes.value);
          thumbRef.value.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      }
    }
    function onThumbChange(element) {
      thumbRef.value = element;
    }
    provideScrollAreaScrollbarVisibleContext({
      sizes,
      hasThumb,
      handleWheelScroll,
      handleThumbDown,
      handleThumbUp,
      handleSizeChange,
      onThumbPositionChange,
      onThumbChange,
      onDragScroll
    });
    return (_ctx, _cache) => {
      return isShowingScrollbarX.value ? (openBlock(), createBlock(_sfc_main$1, mergeProps({ key: 0 }, _ctx.$attrs, { ref: unref(forwardRef) }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : (openBlock(), createBlock(_sfc_main$2, mergeProps({ key: 1 }, _ctx.$attrs, { ref: unref(forwardRef) }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16));
    };
  }
});

export { _sfc_main as _, injectScrollAreaScrollbarVisibleContext as i };
//# sourceMappingURL=ScrollAreaScrollbarVisible.js.map
