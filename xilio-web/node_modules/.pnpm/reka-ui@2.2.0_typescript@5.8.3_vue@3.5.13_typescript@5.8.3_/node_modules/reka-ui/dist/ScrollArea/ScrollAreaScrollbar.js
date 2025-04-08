import { defineComponent, computed, watch, onUnmounted, toRefs, createBlock, createCommentVNode, unref, openBlock, mergeProps, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from './ScrollAreaScrollbarHover.js';
import { _ as _sfc_main$2 } from './ScrollAreaScrollbarScroll.js';
import { _ as _sfc_main$3 } from './ScrollAreaScrollbarAuto.js';
import { _ as _sfc_main$4 } from './ScrollAreaScrollbarVisible.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectScrollAreaRootContext } from './ScrollAreaRoot.js';

const [injectScrollAreaScrollbarContext, provideScrollAreaScrollbarContext] = createContext("ScrollAreaScrollbar");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ScrollAreaScrollbar",
  props: {
    orientation: { default: "vertical" },
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const rootContext = injectScrollAreaRootContext();
    const isHorizontal = computed(() => props.orientation === "horizontal");
    watch(
      isHorizontal,
      () => {
        if (isHorizontal.value)
          rootContext.onScrollbarXEnabledChange(true);
        else rootContext.onScrollbarYEnabledChange(true);
      },
      { immediate: true }
    );
    onUnmounted(() => {
      rootContext.onScrollbarXEnabledChange(false);
      rootContext.onScrollbarYEnabledChange(false);
    });
    const { orientation, forceMount, asChild, as } = toRefs(props);
    provideScrollAreaScrollbarContext({
      orientation,
      forceMount,
      isHorizontal,
      as,
      asChild
    });
    return (_ctx, _cache) => {
      return unref(rootContext).type.value === "hover" ? (openBlock(), createBlock(_sfc_main$1, mergeProps({ key: 0 }, _ctx.$attrs, {
        ref: unref(forwardRef),
        "force-mount": unref(forceMount)
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["force-mount"])) : unref(rootContext).type.value === "scroll" ? (openBlock(), createBlock(_sfc_main$2, mergeProps({ key: 1 }, _ctx.$attrs, {
        ref: unref(forwardRef),
        "force-mount": unref(forceMount)
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["force-mount"])) : unref(rootContext).type.value === "auto" ? (openBlock(), createBlock(_sfc_main$3, mergeProps({ key: 2 }, _ctx.$attrs, {
        ref: unref(forwardRef),
        "force-mount": unref(forceMount)
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["force-mount"])) : unref(rootContext).type.value === "always" ? (openBlock(), createBlock(_sfc_main$4, mergeProps({ key: 3 }, _ctx.$attrs, {
        ref: unref(forwardRef),
        "data-state": "visible"
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _, injectScrollAreaScrollbarContext as i };
//# sourceMappingURL=ScrollAreaScrollbar.js.map
