'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Collapsible_CollapsibleRoot = require('./CollapsibleRoot.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "CollapsibleTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const rootContext = Collapsible_CollapsibleRoot.injectCollapsibleRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        type: _ctx.as === "button" ? "button" : void 0,
        as: _ctx.as,
        "as-child": props.asChild,
        "aria-controls": vue.unref(rootContext).contentId,
        "aria-expanded": vue.unref(rootContext).open.value,
        "data-state": vue.unref(rootContext).open.value ? "open" : "closed",
        "data-disabled": vue.unref(rootContext).disabled?.value ? "" : void 0,
        disabled: vue.unref(rootContext).disabled?.value,
        onClick: vue.unref(rootContext).onOpenToggle
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["type", "as", "as-child", "aria-controls", "aria-expanded", "data-state", "data-disabled", "disabled", "onClick"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=CollapsibleTrigger.cjs.map
