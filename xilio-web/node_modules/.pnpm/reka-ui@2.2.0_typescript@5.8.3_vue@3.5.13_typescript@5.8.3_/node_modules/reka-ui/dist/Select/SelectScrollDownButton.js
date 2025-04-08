import { defineComponent, ref, watchEffect, watch, createBlock, createCommentVNode, openBlock, unref, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './SelectScrollButtonImpl.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectSelectContentContext } from './SelectContentImpl.js';
import { i as injectSelectItemAlignedPositionContext } from './SelectItemAlignedPosition.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const contentContext = injectSelectContentContext();
    const alignedPositionContext = contentContext.position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
    const { forwardRef, currentElement } = useForwardExpose();
    const canScrollDown = ref(false);
    watchEffect((cleanupFn) => {
      if (contentContext.viewport?.value && contentContext.isPositioned?.value) {
        let handleScroll = function() {
          const maxScroll = viewport.scrollHeight - viewport.clientHeight;
          canScrollDown.value = Math.ceil(viewport.scrollTop) < maxScroll;
        };
        const viewport = contentContext.viewport.value;
        handleScroll();
        viewport.addEventListener("scroll", handleScroll);
        cleanupFn(() => viewport.removeEventListener("scroll", handleScroll));
      }
    });
    watch(currentElement, () => {
      if (currentElement.value)
        alignedPositionContext?.onScrollButtonChange(currentElement.value);
    });
    return (_ctx, _cache) => {
      return canScrollDown.value ? (openBlock(), createBlock(_sfc_main$1, {
        key: 0,
        ref: unref(forwardRef),
        onAutoScroll: _cache[0] || (_cache[0] = () => {
          const { viewport, selectedItem } = unref(contentContext);
          if (viewport?.value && selectedItem?.value) {
            viewport.value.scrollTop = viewport.value.scrollTop + selectedItem.value.offsetHeight;
          }
        })
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 512)) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SelectScrollDownButton.js.map
