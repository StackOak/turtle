'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const ScrollArea_utils = require('./utils.cjs');
const ScrollArea_ScrollAreaScrollbarVisible = require('./ScrollAreaScrollbarVisible.cjs');
const ScrollArea_ScrollAreaScrollbar = require('./ScrollAreaScrollbar.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const ScrollArea_ScrollAreaRoot = require('./ScrollAreaRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ScrollAreaScrollbarImpl",
  props: {
    isHorizontal: { type: Boolean }
  },
  emits: ["onDragScroll", "onWheelScroll", "onThumbPointerDown"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rootContext = ScrollArea_ScrollAreaRoot.injectScrollAreaRootContext();
    const scrollbarVisibleContext = ScrollArea_ScrollAreaScrollbarVisible.injectScrollAreaScrollbarVisibleContext();
    const scrollbarContext = ScrollArea_ScrollAreaScrollbar.injectScrollAreaScrollbarContext();
    const { forwardRef, currentElement: scrollbar } = shared_useForwardExpose.useForwardExpose();
    const prevWebkitUserSelectRef = vue.ref("");
    const rectRef = vue.ref();
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
    vue.onMounted(() => {
      document.addEventListener("wheel", handleWheel, { passive: false });
    });
    vue.onUnmounted(() => {
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
            paddingStart: ScrollArea_utils.toInt(getComputedStyle(scrollbar.value).paddingLeft),
            paddingEnd: ScrollArea_utils.toInt(getComputedStyle(scrollbar.value).paddingRight)
          }
        });
      } else {
        scrollbarVisibleContext.handleSizeChange({
          content: rootContext.viewport.value?.scrollHeight ?? 0,
          viewport: rootContext.viewport.value?.offsetHeight ?? 0,
          scrollbar: {
            size: scrollbar.value?.clientHeight ?? 0,
            paddingStart: ScrollArea_utils.toInt(getComputedStyle(scrollbar.value).paddingLeft),
            paddingEnd: ScrollArea_utils.toInt(getComputedStyle(scrollbar.value).paddingRight)
          }
        });
      }
    }
    core.useResizeObserver(scrollbar, handleSizeChange);
    core.useResizeObserver(rootContext.content, handleSizeChange);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        style: { "position": "absolute" },
        "data-scrollbarimpl": "",
        as: vue.unref(scrollbarContext).as.value,
        "as-child": vue.unref(scrollbarContext).asChild.value,
        onPointerdown: handlePointerDown,
        onPointermove: handlePointerMove,
        onPointerup: handlePointerUp
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ScrollAreaScrollbarImpl.cjs.map
