import { defineComponent, watchEffect, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { u as useStateMachine } from '../shared/useStateMachine.js';
import { _ as _sfc_main$1 } from './ScrollAreaScrollbarVisible.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectScrollAreaRootContext } from './ScrollAreaRoot.js';
import { i as injectScrollAreaScrollbarContext } from './ScrollAreaScrollbar.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarScroll",
  props: {
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const rootContext = injectScrollAreaRootContext();
    const scrollbarContext = injectScrollAreaScrollbarContext();
    const { forwardRef } = useForwardExpose();
    const { state, dispatch } = useStateMachine("hidden", {
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
    watchEffect((onCleanup) => {
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
    const debounceScrollEnd = useDebounceFn(() => dispatch("SCROLL_END"), 100);
    watchEffect((onCleanup) => {
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
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(state) !== "hidden"
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1, mergeProps(_ctx.$attrs, { ref: unref(forwardRef) }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ScrollAreaScrollbarScroll.js.map
