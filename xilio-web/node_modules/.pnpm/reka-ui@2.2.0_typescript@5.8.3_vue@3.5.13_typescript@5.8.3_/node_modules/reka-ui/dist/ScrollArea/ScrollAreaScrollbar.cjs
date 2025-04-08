'use strict';

const vue = require('vue');
const ScrollArea_ScrollAreaScrollbarHover = require('./ScrollAreaScrollbarHover.cjs');
const ScrollArea_ScrollAreaScrollbarScroll = require('./ScrollAreaScrollbarScroll.cjs');
const ScrollArea_ScrollAreaScrollbarAuto = require('./ScrollAreaScrollbarAuto.cjs');
const ScrollArea_ScrollAreaScrollbarVisible = require('./ScrollAreaScrollbarVisible.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const ScrollArea_ScrollAreaRoot = require('./ScrollAreaRoot.cjs');

const [injectScrollAreaScrollbarContext, provideScrollAreaScrollbarContext] = shared_createContext.createContext("ScrollAreaScrollbar");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const rootContext = ScrollArea_ScrollAreaRoot.injectScrollAreaRootContext();
    const isHorizontal = vue.computed(() => props.orientation === "horizontal");
    vue.watch(
      isHorizontal,
      () => {
        if (isHorizontal.value)
          rootContext.onScrollbarXEnabledChange(true);
        else rootContext.onScrollbarYEnabledChange(true);
      },
      { immediate: true }
    );
    vue.onUnmounted(() => {
      rootContext.onScrollbarXEnabledChange(false);
      rootContext.onScrollbarYEnabledChange(false);
    });
    const { orientation, forceMount, asChild, as } = vue.toRefs(props);
    provideScrollAreaScrollbarContext({
      orientation,
      forceMount,
      isHorizontal,
      as,
      asChild
    });
    return (_ctx, _cache) => {
      return vue.unref(rootContext).type.value === "hover" ? (vue.openBlock(), vue.createBlock(ScrollArea_ScrollAreaScrollbarHover._sfc_main, vue.mergeProps({ key: 0 }, _ctx.$attrs, {
        ref: vue.unref(forwardRef),
        "force-mount": vue.unref(forceMount)
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["force-mount"])) : vue.unref(rootContext).type.value === "scroll" ? (vue.openBlock(), vue.createBlock(ScrollArea_ScrollAreaScrollbarScroll._sfc_main, vue.mergeProps({ key: 1 }, _ctx.$attrs, {
        ref: vue.unref(forwardRef),
        "force-mount": vue.unref(forceMount)
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["force-mount"])) : vue.unref(rootContext).type.value === "auto" ? (vue.openBlock(), vue.createBlock(ScrollArea_ScrollAreaScrollbarAuto._sfc_main, vue.mergeProps({ key: 2 }, _ctx.$attrs, {
        ref: vue.unref(forwardRef),
        "force-mount": vue.unref(forceMount)
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["force-mount"])) : vue.unref(rootContext).type.value === "always" ? (vue.openBlock(), vue.createBlock(ScrollArea_ScrollAreaScrollbarVisible._sfc_main, vue.mergeProps({ key: 3 }, _ctx.$attrs, {
        ref: vue.unref(forwardRef),
        "data-state": "visible"
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectScrollAreaScrollbarContext = injectScrollAreaScrollbarContext;
//# sourceMappingURL=ScrollAreaScrollbar.cjs.map
