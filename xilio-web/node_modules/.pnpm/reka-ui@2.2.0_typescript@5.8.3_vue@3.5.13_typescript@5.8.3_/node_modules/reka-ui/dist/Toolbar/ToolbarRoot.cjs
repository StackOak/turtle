'use strict';

const vue = require('vue');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const RovingFocus_RovingFocusGroup = require('../RovingFocus/RovingFocusGroup.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectToolbarRootContext, provideToolbarRootContext] = shared_createContext.createContext("ToolbarRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ToolbarRoot",
  props: {
    orientation: { default: "horizontal" },
    dir: {},
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation, dir: propDir } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    provideToolbarRootContext({ orientation, dir });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RovingFocus_RovingFocusGroup._sfc_main), {
        "as-child": "",
        orientation: vue.unref(orientation),
        dir: vue.unref(dir),
        loop: _ctx.loop
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            role: "toolbar",
            "aria-orientation": vue.unref(orientation),
            "as-child": _ctx.asChild,
            as: _ctx.as
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["aria-orientation", "as-child", "as"])
        ]),
        _: 3
      }, 8, ["orientation", "dir", "loop"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectToolbarRootContext = injectToolbarRootContext;
//# sourceMappingURL=ToolbarRoot.cjs.map
