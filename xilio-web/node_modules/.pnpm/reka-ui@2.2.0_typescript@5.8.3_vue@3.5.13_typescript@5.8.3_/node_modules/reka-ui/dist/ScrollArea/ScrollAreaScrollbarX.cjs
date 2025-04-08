'use strict';

const vue = require('vue');
const ScrollArea_ScrollAreaScrollbarImpl = require('./ScrollAreaScrollbarImpl.cjs');
const ScrollArea_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const ScrollArea_ScrollAreaRoot = require('./ScrollAreaRoot.cjs');
const ScrollArea_ScrollAreaScrollbarVisible = require('./ScrollAreaScrollbarVisible.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ScrollAreaScrollbarX",
  setup(__props) {
    const rootContext = ScrollArea_ScrollAreaRoot.injectScrollAreaRootContext();
    const scrollbarVisibleContext = ScrollArea_ScrollAreaScrollbarVisible.injectScrollAreaScrollbarVisibleContext();
    const { forwardRef, currentElement: scrollbarElement } = shared_useForwardExpose.useForwardExpose();
    vue.onMounted(() => {
      if (scrollbarElement.value)
        rootContext.onScrollbarXChange(scrollbarElement.value);
    });
    const sizes = vue.computed(() => scrollbarVisibleContext.sizes.value);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(ScrollArea_ScrollAreaScrollbarImpl._sfc_main, {
        ref: vue.unref(forwardRef),
        "is-horizontal": true,
        "data-orientation": "horizontal",
        style: vue.normalizeStyle({
          bottom: 0,
          left: vue.unref(rootContext).dir.value === "rtl" ? "var(--reka-scroll-area-corner-width)" : 0,
          right: vue.unref(rootContext).dir.value === "ltr" ? "var(--reka-scroll-area-corner-width)" : 0,
          ["--reka-scroll-area-thumb-width"]: sizes.value ? `${vue.unref(ScrollArea_utils.getThumbSize)(sizes.value)}px` : void 0
        }),
        onOnDragScroll: _cache[0] || (_cache[0] = ($event) => vue.unref(scrollbarVisibleContext).onDragScroll($event.x))
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["style"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ScrollAreaScrollbarX.cjs.map
