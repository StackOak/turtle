'use strict';

const vue = require('vue');
const Switch_SwitchRoot = require('./SwitchRoot.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SwitchThumb",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const rootContext = Switch_SwitchRoot.injectSwitchRootContext();
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        "data-state": vue.unref(rootContext).modelValue?.value ? "checked" : "unchecked",
        "data-disabled": vue.unref(rootContext).disabled.value ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "data-disabled", "as-child", "as"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SwitchThumb.cjs.map
