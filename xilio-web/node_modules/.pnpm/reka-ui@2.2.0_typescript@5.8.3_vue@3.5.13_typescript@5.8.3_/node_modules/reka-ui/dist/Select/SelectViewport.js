import { defineComponent, toRefs, onMounted, ref, createElementBlock, openBlock, Fragment, createVNode, unref, mergeProps, withCtx, renderSlot, createTextVNode } from 'vue';
import { C as CONTENT_MARGIN } from './utils.js';
import { u as useNonce } from '../shared/useNonce.js';
import { i as injectSelectItemAlignedPositionContext } from './SelectItemAlignedPosition.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectSelectContentContext } from './SelectContentImpl.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { nonce: propNonce } = toRefs(props);
    const nonce = useNonce(propNonce);
    const contentContext = injectSelectContentContext();
    const alignedPositionContext = contentContext.position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
    const { forwardRef, currentElement } = useForwardExpose();
    onMounted(() => {
      contentContext?.onViewportChange(currentElement.value);
    });
    const prevScrollTopRef = ref(0);
    function handleScroll(event) {
      const viewport = event.currentTarget;
      const { shouldExpandOnScrollRef, contentWrapper } = alignedPositionContext ?? {};
      if (shouldExpandOnScrollRef?.value && contentWrapper?.value) {
        const scrolledBy = Math.abs(prevScrollTopRef.value - viewport.scrollTop);
        if (scrolledBy > 0) {
          const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
          const cssMinHeight = Number.parseFloat(
            contentWrapper.value.style.minHeight
          );
          const cssHeight = Number.parseFloat(contentWrapper.value.style.height);
          const prevHeight = Math.max(cssMinHeight, cssHeight);
          if (prevHeight < availableHeight) {
            const nextHeight = prevHeight + scrolledBy;
            const clampedNextHeight = Math.min(availableHeight, nextHeight);
            const heightDiff = nextHeight - clampedNextHeight;
            contentWrapper.value.style.height = `${clampedNextHeight}px`;
            if (contentWrapper.value.style.bottom === "0px") {
              viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
              contentWrapper.value.style.justifyContent = "flex-end";
            }
          }
        }
      }
      prevScrollTopRef.value = viewport.scrollTop;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(unref(Primitive), mergeProps({
          ref: unref(forwardRef),
          "data-reka-select-viewport": "",
          role: "presentation"
        }, { ..._ctx.$attrs, ...props }, {
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            overflow: "hidden auto"
          },
          onScroll: handleScroll
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16),
        createVNode(unref(Primitive), {
          as: "style",
          nonce: unref(nonce)
        }, {
          default: withCtx(() => _cache[0] || (_cache[0] = [
            createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")
          ])),
          _: 1
        }, 8, ["nonce"])
      ], 64);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SelectViewport.js.map
