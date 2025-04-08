'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Popover_PopoverRoot = require('./PopoverRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PopoverClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const rootContext = Popover_PopoverRoot.injectPopoverRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        type: _ctx.as === "button" ? "button" : void 0,
        as: _ctx.as,
        "as-child": props.asChild,
        onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(rootContext).onOpenChange(false))
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["type", "as", "as-child"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=PopoverClose.cjs.map
