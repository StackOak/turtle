'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Tabs_TabsRoot = require('./TabsRoot.cjs');
const RovingFocus_RovingFocusGroup = require('../RovingFocus/RovingFocusGroup.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TabsList",
  props: {
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { loop } = vue.toRefs(props);
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const context = Tabs_TabsRoot.injectTabsRootContext();
    context.tabsList = currentElement;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RovingFocus_RovingFocusGroup._sfc_main), {
        "as-child": "",
        orientation: vue.unref(context).orientation.value,
        dir: vue.unref(context).dir.value,
        loop: vue.unref(loop)
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            role: "tablist",
            "as-child": _ctx.asChild,
            as: _ctx.as,
            "aria-orientation": vue.unref(context).orientation.value
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as-child", "as", "aria-orientation"])
        ]),
        _: 3
      }, 8, ["orientation", "dir", "loop"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TabsList.cjs.map
