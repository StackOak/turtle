'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const ScrollArea_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const ScrollArea_ScrollAreaRoot = require('./ScrollAreaRoot.cjs');
const ScrollArea_ScrollAreaScrollbarVisible = require('./ScrollAreaScrollbarVisible.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ScrollAreaThumb",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = ScrollArea_ScrollAreaRoot.injectScrollAreaRootContext();
    const scrollbarContextVisible = ScrollArea_ScrollAreaScrollbarVisible.injectScrollAreaScrollbarVisibleContext();
    function handlePointerDown(event) {
      const thumb = event.target;
      const thumbRect = thumb.getBoundingClientRect();
      const x = event.clientX - thumbRect.left;
      const y = event.clientY - thumbRect.top;
      scrollbarContextVisible.handleThumbDown(event, { x, y });
    }
    function handlePointerUp(event) {
      scrollbarContextVisible.handleThumbUp(event);
    }
    const { forwardRef, currentElement: thumbElement } = shared_useForwardExpose.useForwardExpose();
    const removeUnlinkedScrollListenerRef = vue.ref();
    const viewport = vue.computed(() => rootContext.viewport.value);
    function handleScroll() {
      if (!removeUnlinkedScrollListenerRef.value) {
        const listener = ScrollArea_utils.addUnlinkedScrollListener(
          viewport.value,
          scrollbarContextVisible.onThumbPositionChange
        );
        removeUnlinkedScrollListenerRef.value = listener;
        scrollbarContextVisible.onThumbPositionChange();
      }
    }
    const sizes = vue.computed(() => scrollbarContextVisible.sizes.value);
    core.watchOnce(sizes, () => {
      scrollbarContextVisible.onThumbChange(thumbElement.value);
      if (viewport.value) {
        scrollbarContextVisible.onThumbPositionChange();
        viewport.value.addEventListener("scroll", handleScroll);
      }
    });
    vue.onUnmounted(() => {
      viewport.value.removeEventListener("scroll", handleScroll);
      rootContext.viewport.value?.removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        "data-state": vue.unref(scrollbarContextVisible).hasThumb ? "visible" : "hidden",
        style: {
          width: "var(--reka-scroll-area-thumb-width)",
          height: "var(--reka-scroll-area-thumb-height)"
        },
        "as-child": props.asChild,
        as: _ctx.as,
        onPointerdown: handlePointerDown,
        onPointerup: handlePointerUp
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "as-child", "as"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ScrollAreaThumb.cjs.map
