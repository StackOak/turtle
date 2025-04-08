'use strict';

const vue = require('vue');
const Select_SelectScrollButtonImpl = require('./SelectScrollButtonImpl.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Select_SelectContentImpl = require('./SelectContentImpl.cjs');
const Select_SelectItemAlignedPosition = require('./SelectItemAlignedPosition.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const contentContext = Select_SelectContentImpl.injectSelectContentContext();
    const alignedPositionContext = contentContext.position === "item-aligned" ? Select_SelectItemAlignedPosition.injectSelectItemAlignedPositionContext() : void 0;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const canScrollDown = vue.ref(false);
    vue.watchEffect((cleanupFn) => {
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
    vue.watch(currentElement, () => {
      if (currentElement.value)
        alignedPositionContext?.onScrollButtonChange(currentElement.value);
    });
    return (_ctx, _cache) => {
      return canScrollDown.value ? (vue.openBlock(), vue.createBlock(Select_SelectScrollButtonImpl._sfc_main, {
        key: 0,
        ref: vue.unref(forwardRef),
        onAutoScroll: _cache[0] || (_cache[0] = () => {
          const { viewport, selectedItem } = vue.unref(contentContext);
          if (viewport?.value && selectedItem?.value) {
            viewport.value.scrollTop = viewport.value.scrollTop + selectedItem.value.offsetHeight;
          }
        })
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 512)) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SelectScrollDownButton.cjs.map
