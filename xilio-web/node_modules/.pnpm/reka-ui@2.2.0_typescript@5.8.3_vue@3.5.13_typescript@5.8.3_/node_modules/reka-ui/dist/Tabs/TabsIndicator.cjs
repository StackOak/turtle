'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Tabs_TabsRoot = require('./TabsRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TabsIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const context = Tabs_TabsRoot.injectTabsRootContext();
    shared_useForwardExpose.useForwardExpose();
    const activeTab = vue.ref();
    const indicatorStyle = vue.ref({
      size: null,
      position: null
    });
    vue.watch(() => [context.modelValue.value, context?.dir.value], async () => {
      await vue.nextTick();
      updateIndicatorStyle();
    }, { immediate: true });
    core.useResizeObserver([context.tabsList, activeTab], updateIndicatorStyle);
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
      return typeof indicatorStyle.value.size === "number" ? (vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({ key: 0 }, props, {
        style: {
          "--reka-tabs-indicator-size": `${indicatorStyle.value.size}px`,
          "--reka-tabs-indicator-position": `${indicatorStyle.value.position}px`
        }
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])) : vue.createCommentVNode("", true);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TabsIndicator.cjs.map
