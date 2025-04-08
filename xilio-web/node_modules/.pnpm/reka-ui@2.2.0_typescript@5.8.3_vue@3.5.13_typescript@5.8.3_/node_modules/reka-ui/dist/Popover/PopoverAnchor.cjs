'use strict';

const vue = require('vue');
const Popper_PopperAnchor = require('../Popper/PopperAnchor.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Popover_PopoverRoot = require('./PopoverRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PopoverAnchor",
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const rootContext = Popover_PopoverRoot.injectPopoverRootContext();
    vue.onBeforeMount(() => {
      rootContext.hasCustomAnchor.value = true;
    });
    vue.onUnmounted(() => {
      rootContext.hasCustomAnchor.value = false;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperAnchor._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PopoverAnchor.cjs.map
