'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_useStateMachine = require('../shared/useStateMachine.cjs');
const ScrollArea_ScrollAreaScrollbarVisible = require('./ScrollAreaScrollbarVisible.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const ScrollArea_ScrollAreaRoot = require('./ScrollAreaRoot.cjs');
const ScrollArea_ScrollAreaScrollbar = require('./ScrollAreaScrollbar.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ScrollAreaScrollbarScroll",
  props: {
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const rootContext = ScrollArea_ScrollAreaRoot.injectScrollAreaRootContext();
    const scrollbarContext = ScrollArea_ScrollAreaScrollbar.injectScrollAreaScrollbarContext();
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const { state, dispatch } = shared_useStateMachine.useStateMachine("hidden", {
      hidden: {
        SCROLL: "scrolling"
      },
      scrolling: {
        SCROLL_END: "idle",
        POINTER_ENTER: "interacting"
      },
      interacting: {
        SCROLL: "interacting",
        POINTER_LEAVE: "idle"
      },
      idle: {
        HIDE: "hidden",
        SCROLL: "scrolling",
        POINTER_ENTER: "interacting"
      }
    });
    vue.watchEffect((onCleanup) => {
      if (state.value === "idle") {
        const timeId = window.setTimeout(
          () => dispatch("HIDE"),
          rootContext.scrollHideDelay.value
        );
        onCleanup(() => {
          window.clearTimeout(timeId);
        });
      }
    });
    const debounceScrollEnd = core.useDebounceFn(() => dispatch("SCROLL_END"), 100);
    vue.watchEffect((onCleanup) => {
      const viewport = rootContext.viewport.value;
      const scrollDirection = scrollbarContext.isHorizontal.value ? "scrollLeft" : "scrollTop";
      if (viewport) {
        let prevScrollPos = viewport[scrollDirection];
        const handleScroll = () => {
          const scrollPos = viewport[scrollDirection];
          const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
          if (hasScrollInDirectionChanged) {
            dispatch("SCROLL");
            debounceScrollEnd();
          }
          prevScrollPos = scrollPos;
        };
        viewport.addEventListener("scroll", handleScroll);
        onCleanup(() => {
          viewport.removeEventListener("scroll", handleScroll);
        });
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(state) !== "hidden"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(ScrollArea_ScrollAreaScrollbarVisible._sfc_main, vue.mergeProps(_ctx.$attrs, { ref: vue.unref(forwardRef) }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ScrollAreaScrollbarScroll.cjs.map
