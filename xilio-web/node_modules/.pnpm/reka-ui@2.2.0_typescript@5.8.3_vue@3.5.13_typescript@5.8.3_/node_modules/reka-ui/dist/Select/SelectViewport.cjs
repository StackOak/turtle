'use strict';

const vue = require('vue');
const Select_utils = require('./utils.cjs');
const shared_useNonce = require('../shared/useNonce.cjs');
const Select_SelectItemAlignedPosition = require('./SelectItemAlignedPosition.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Select_SelectContentImpl = require('./SelectContentImpl.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { nonce: propNonce } = vue.toRefs(props);
    const nonce = shared_useNonce.useNonce(propNonce);
    const contentContext = Select_SelectContentImpl.injectSelectContentContext();
    const alignedPositionContext = contentContext.position === "item-aligned" ? Select_SelectItemAlignedPosition.injectSelectItemAlignedPositionContext() : void 0;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    vue.onMounted(() => {
      contentContext?.onViewportChange(currentElement.value);
    });
    const prevScrollTopRef = vue.ref(0);
    function handleScroll(event) {
      const viewport = event.currentTarget;
      const { shouldExpandOnScrollRef, contentWrapper } = alignedPositionContext ?? {};
      if (shouldExpandOnScrollRef?.value && contentWrapper?.value) {
        const scrolledBy = Math.abs(prevScrollTopRef.value - viewport.scrollTop);
        if (scrolledBy > 0) {
          const availableHeight = window.innerHeight - Select_utils.CONTENT_MARGIN * 2;
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
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
          ref: vue.unref(forwardRef),
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
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16),
        vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
          as: "style",
          nonce: vue.unref(nonce)
        }, {
          default: vue.withCtx(() => _cache[0] || (_cache[0] = [
            vue.createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")
          ])),
          _: 1
        }, 8, ["nonce"])
      ], 64);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SelectViewport.cjs.map
