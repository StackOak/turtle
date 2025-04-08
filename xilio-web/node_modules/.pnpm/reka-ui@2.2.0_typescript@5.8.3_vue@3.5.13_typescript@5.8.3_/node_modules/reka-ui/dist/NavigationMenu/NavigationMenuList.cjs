'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const NavigationMenu_NavigationMenuRoot = require('./NavigationMenuRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "NavigationMenuList",
  props: {
    asChild: { type: Boolean },
    as: { default: "ul" }
  },
  setup(__props) {
    const props = __props;
    const menuContext = NavigationMenu_NavigationMenuRoot.injectNavigationMenuContext();
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    vue.onMounted(() => {
      menuContext.onIndicatorTrackChange(currentElement.value);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        style: { "position": "relative" }
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
            "as-child": props.asChild,
            as: _ctx.as,
            "data-orientation": vue.unref(menuContext).orientation
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["as-child", "as", "data-orientation"])
        ]),
        _: 3
      }, 512);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=NavigationMenuList.cjs.map
