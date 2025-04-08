import { defineComponent, ref, onMounted, onUnmounted, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './ScrollAreaScrollbarAuto.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';
import { i as injectScrollAreaRootContext } from './ScrollAreaRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ScrollAreaScrollbarHover",
  props: {
    forceMount: { type: Boolean }
  },
  setup(__props) {
    const rootContext = injectScrollAreaRootContext();
    const { forwardRef } = useForwardExpose();
    let timeout;
    const visible = ref(false);
    function handlePointerEnter() {
      window.clearTimeout(timeout);
      visible.value = true;
    }
    function handlePointerLeave() {
      timeout = window.setTimeout(() => {
        visible.value = false;
      }, rootContext.scrollHideDelay.value);
    }
    onMounted(() => {
      const scrollArea = rootContext.scrollArea.value;
      if (scrollArea) {
        scrollArea.addEventListener("pointerenter", handlePointerEnter);
        scrollArea.addEventListener("pointerleave", handlePointerLeave);
      }
    });
    onUnmounted(() => {
      const scrollArea = rootContext.scrollArea.value;
      if (scrollArea) {
        window.clearTimeout(timeout);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || visible.value
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$1, mergeProps(_ctx.$attrs, {
            ref: unref(forwardRef),
            "data-state": visible.value ? "visible" : "hidden"
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["data-state"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ScrollAreaScrollbarHover.js.map
