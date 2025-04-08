'use strict';

const vue = require('vue');
const ScrollArea_ScrollAreaScrollbarX = require('./ScrollAreaScrollbarX.cjs');
const ScrollArea_ScrollAreaScrollbarY = require('./ScrollAreaScrollbarY.cjs');
const ScrollArea_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const ScrollArea_ScrollAreaRoot = require('./ScrollAreaRoot.cjs');
const ScrollArea_ScrollAreaScrollbar = require('./ScrollAreaScrollbar.cjs');

const [injectScrollAreaScrollbarVisibleContext, provideScrollAreaScrollbarVisibleContext] = shared_createContext.createContext("ScrollAreaScrollbarVisible");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ScrollAreaScrollbarVisible",
  setup(__props) {
    const rootContext = ScrollArea_ScrollAreaRoot.injectScrollAreaRootContext();
    const scrollbarContext = ScrollArea_ScrollAreaScrollbar.injectScrollAreaScrollbarContext();
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const sizes = vue.ref({
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
    });
    const hasThumb = vue.computed(() => {
      const thumbRatio = ScrollArea_utils.getThumbRatio(sizes.value.viewport, sizes.value.content);
      return Boolean(thumbRatio > 0 && thumbRatio < 1);
    });
    const thumbRef = vue.ref();
    const pointerOffset = vue.ref(0);
    function handleWheelScroll(event, payload) {
      if (isShowingScrollbarX.value) {
        const scrollPos = rootContext.viewport.value.scrollLeft + event.deltaY;
        rootContext.viewport.value.scrollLeft = scrollPos;
        if (ScrollArea_utils.isScrollingWithinScrollbarBounds(scrollPos, payload))
          event.preventDefault();
      } else {
        const scrollPos = rootContext.viewport.value.scrollTop + event.deltaY;
        rootContext.viewport.value.scrollTop = scrollPos;
        if (ScrollArea_utils.isScrollingWithinScrollbarBounds(scrollPos, payload))
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
      return ScrollArea_utils.getScrollPositionFromPointer(
        pointerPos,
        pointerOffset.value,
        sizes.value,
        dir
      );
    }
    const isShowingScrollbarX = vue.computed(
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
          const offset = ScrollArea_utils.getThumbOffsetFromScroll(
            scrollPos,
            sizes.value,
            rootContext.dir.value
          );
          thumbRef.value.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
      } else {
        if (rootContext.viewport.value && thumbRef.value) {
          const scrollPos = rootContext.viewport.value.scrollTop;
          const offset = ScrollArea_utils.getThumbOffsetFromScroll(scrollPos, sizes.value);
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
      return isShowingScrollbarX.value ? (vue.openBlock(), vue.createBlock(ScrollArea_ScrollAreaScrollbarX._sfc_main, vue.mergeProps({ key: 0 }, _ctx.$attrs, { ref: vue.unref(forwardRef) }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : (vue.openBlock(), vue.createBlock(ScrollArea_ScrollAreaScrollbarY._sfc_main, vue.mergeProps({ key: 1 }, _ctx.$attrs, { ref: vue.unref(forwardRef) }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16));
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectScrollAreaScrollbarVisibleContext = injectScrollAreaScrollbarVisibleContext;
//# sourceMappingURL=ScrollAreaScrollbarVisible.cjs.map
