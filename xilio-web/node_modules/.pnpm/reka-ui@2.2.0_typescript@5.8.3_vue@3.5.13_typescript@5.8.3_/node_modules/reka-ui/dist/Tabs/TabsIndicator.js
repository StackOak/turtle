import { defineComponent, ref, watch, nextTick, createBlock, createCommentVNode, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectTabsRootContext } from './TabsRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TabsIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const context = injectTabsRootContext();
    useForwardExpose();
    const activeTab = ref();
    const indicatorStyle = ref({
      size: null,
      position: null
    });
    watch(() => [context.modelValue.value, context?.dir.value], async () => {
      await nextTick();
      updateIndicatorStyle();
    }, { immediate: true });
    useResizeObserver([context.tabsList, activeTab], updateIndicatorStyle);
    function updateIndicatorStyle() {
      activeTab.value = context.tabsList.value?.querySelector('[role="tab"][data-state="active"]');
      if (!activeTab.value)
        return;
      if (context.orientation.value === "horizontal") {
        indicatorStyle.value = {
          size: activeTab.value.offsetWidth,
          position: activeTab.value.offsetLeft
        };
      } else {
        indicatorStyle.value = {
          size: activeTab.value.offsetHeight,
          position: activeTab.value.offsetTop
        };
      }
    }
    return (_ctx, _cache) => {
      return typeof indicatorStyle.value.size === "number" ? (openBlock(), createBlock(unref(Primitive), mergeProps({ key: 0 }, props, {
        style: {
          "--reka-tabs-indicator-size": `${indicatorStyle.value.size}px`,
          "--reka-tabs-indicator-position": `${indicatorStyle.value.position}px`
        }
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=TabsIndicator.js.map
