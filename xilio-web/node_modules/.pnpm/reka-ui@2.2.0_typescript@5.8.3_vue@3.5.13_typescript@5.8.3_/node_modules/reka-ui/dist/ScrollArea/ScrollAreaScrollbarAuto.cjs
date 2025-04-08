'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const ScrollArea_ScrollAreaScrollbarVisible = require('./ScrollAreaScrollbarVisible.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const ScrollArea_ScrollAreaRoot = require('./ScrollAreaRoot.cjs');
const ScrollArea_ScrollAreaScrollbar = require('./ScrollAreaScrollbar.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ScrollAreaScrollbarAuto",
  props: {
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const rootContext = ScrollArea_ScrollAreaRoot.injectScrollAreaRootContext();
    const scrollbarContext = ScrollArea_ScrollAreaScrollbar.injectScrollAreaScrollbarContext();
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const visible = vue.ref(false);
    const handleResize = core.useDebounceFn(() => {
      if (rootContext.viewport.value) {
        const isOverflowX = rootContext.viewport.value.offsetWidth < rootContext.viewport.value.scrollWidth;
        const isOverflowY = rootContext.viewport.value.offsetHeight < rootContext.viewport.value.scrollHeight;
        visible.value = scrollbarContext.isHorizontal.value ? isOverflowX : isOverflowY;
      }
    }, 10);
    vue.onMounted(() => handleResize());
    core.useResizeObserver(rootContext.viewport, handleResize);
    core.useResizeObserver(rootContext.content, handleResize);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || visible.value
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(ScrollArea_ScrollAreaScrollbarVisible._sfc_main, vue.mergeProps(_ctx.$attrs, {
            ref: vue.unref(forwardRef),
            "data-state": visible.value ? "visible" : "hidden"
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["data-state"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ScrollAreaScrollbarAuto.cjs.map
