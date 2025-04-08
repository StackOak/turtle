import { defineComponent, ref, computed, onUnmounted, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { watchOnce } from '@vueuse/core';
import { d as addUnlinkedScrollListener } from './utils.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectScrollAreaRootContext } from './ScrollAreaRoot.js';
import { i as injectScrollAreaScrollbarVisibleContext } from './ScrollAreaScrollbarVisible.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaThumb",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectScrollAreaRootContext();
    const scrollbarContextVisible = injectScrollAreaScrollbarVisibleContext();
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
    const { forwardRef, currentElement: thumbElement } = useForwardExpose();
    const removeUnlinkedScrollListenerRef = ref();
    const viewport = computed(() => rootContext.viewport.value);
    function handleScroll() {
      if (!removeUnlinkedScrollListenerRef.value) {
        const listener = addUnlinkedScrollListener(
          viewport.value,
          scrollbarContextVisible.onThumbPositionChange
        );
        removeUnlinkedScrollListenerRef.value = listener;
        scrollbarContextVisible.onThumbPositionChange();
      }
    }
    const sizes = computed(() => scrollbarContextVisible.sizes.value);
    watchOnce(sizes, () => {
      scrollbarContextVisible.onThumbChange(thumbElement.value);
      if (viewport.value) {
        scrollbarContextVisible.onThumbPositionChange();
        viewport.value.addEventListener("scroll", handleScroll);
      }
    });
    onUnmounted(() => {
      viewport.value.removeEventListener("scroll", handleScroll);
      rootContext.viewport.value?.removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        "data-state": unref(scrollbarContextVisible).hasThumb ? "visible" : "hidden",
        style: {
          width: "var(--reka-scroll-area-thumb-width)",
          height: "var(--reka-scroll-area-thumb-height)"
        },
        "as-child": props.asChild,
        as: _ctx.as,
        onPointerdown: handlePointerDown,
        onPointerup: handlePointerUp
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "as-child", "as"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ScrollAreaThumb.js.map
