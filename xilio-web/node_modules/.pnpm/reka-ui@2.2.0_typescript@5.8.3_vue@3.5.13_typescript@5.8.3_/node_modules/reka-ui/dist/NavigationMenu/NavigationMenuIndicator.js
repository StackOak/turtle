import { defineComponent, ref, computed, watchEffect, createBlock, createCommentVNode, unref, openBlock, Teleport, createVNode, withCtx, mergeProps, renderSlot } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Presence } from '../Presence/Presence.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectNavigationMenuContext } from './NavigationMenuRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { forwardRef } = useForwardExpose();
    const menuContext = injectNavigationMenuContext();
    const indicatorStyle = ref();
    const isHorizontal = computed(() => menuContext.orientation === "horizontal");
    const isVisible = computed(() => !!menuContext.modelValue.value);
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
    watchEffect(() => {
      if (!menuContext.modelValue.value) {
        return;
      }
      handlePositionChange();
    });
    useResizeObserver(activeTrigger, handlePositionChange);
    useResizeObserver(menuContext.indicatorTrack, handlePositionChange);
    return (_ctx, _cache) => {
      return unref(menuContext).indicatorTrack.value ? (openBlock(), createBlock(Teleport, {
        key: 0,
        to: unref(menuContext).indicatorTrack.value
      }, [
        createVNode(unref(Presence), {
          present: _ctx.forceMount || isVisible.value
        }, {
          default: withCtx(() => [
            createVNode(unref(Primitive), mergeProps({
              ref: unref(forwardRef),
              "aria-hidden": "true",
              "data-state": isVisible.value ? "visible" : "hidden",
              "data-orientation": unref(menuContext).orientation,
              "as-child": props.asChild,
              as: _ctx.as,
              style: {
                ...indicatorStyle.value ? {
                  "--reka-navigation-menu-indicator-size": `${indicatorStyle.value.size}px`,
                  "--reka-navigation-menu-indicator-position": `${indicatorStyle.value.position}px`
                } : {}
              }
            }, _ctx.$attrs), {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 16, ["data-state", "data-orientation", "as-child", "as", "style"])
          ]),
          _: 3
        }, 8, ["present"])
      ], 8, ["to"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=NavigationMenuIndicator.js.map
