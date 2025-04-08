'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const NavigationMenu_NavigationMenuRoot = require('./NavigationMenuRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "NavigationMenuIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const menuContext = NavigationMenu_NavigationMenuRoot.injectNavigationMenuContext();
    const indicatorStyle = vue.ref();
    const isHorizontal = vue.computed(() => menuContext.orientation === "horizontal");
    const isVisible = vue.computed(() => !!menuContext.modelValue.value);
    const { activeTrigger } = menuContext;
    function handlePositionChange() {
      if (!activeTrigger.value) {
        return;
      }
      indicatorStyle.value = {
        size: isHorizontal.value ? activeTrigger.value.offsetWidth : activeTrigger.value.offsetHeight,
        position: isHorizontal.value ? activeTrigger.value.offsetLeft : activeTrigger.value.offsetTop
      };
    }
    vue.watchEffect(() => {
      if (!menuContext.modelValue.value) {
        return;
      }
      handlePositionChange();
    });
    core.useResizeObserver(activeTrigger, handlePositionChange);
    core.useResizeObserver(menuContext.indicatorTrack, handlePositionChange);
    return (_ctx, _cache) => {
      return vue.unref(menuContext).indicatorTrack.value ? (vue.openBlock(), vue.createBlock(vue.Teleport, {
        key: 0,
        to: vue.unref(menuContext).indicatorTrack.value
      }, [
        vue.createVNode(vue.unref(Presence_Presence.Presence), {
          present: _ctx.forceMount || isVisible.value
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
              ref: vue.unref(forwardRef),
              "aria-hidden": "true",
              "data-state": isVisible.value ? "visible" : "hidden",
              "data-orientation": vue.unref(menuContext).orientation,
              "as-child": props.asChild,
              as: _ctx.as,
              style: {
                ...indicatorStyle.value ? {
                  "--reka-navigation-menu-indicator-size": `${indicatorStyle.value.size}px`,
                  "--reka-navigation-menu-indicator-position": `${indicatorStyle.value.position}px`
                } : {}
              }
            }, _ctx.$attrs), {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 16, ["data-state", "data-orientation", "as-child", "as", "style"])
          ]),
          _: 3
        }, 8, ["present"])
      ], 8, ["to"])) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=NavigationMenuIndicator.cjs.map
