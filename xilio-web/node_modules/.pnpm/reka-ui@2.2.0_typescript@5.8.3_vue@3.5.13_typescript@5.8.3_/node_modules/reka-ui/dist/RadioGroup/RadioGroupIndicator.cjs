'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const RadioGroup_RadioGroupItem = require('./RadioGroupItem.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "RadioGroupIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const itemContext = RadioGroup_RadioGroupItem.injectRadioGroupItemContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(itemContext).checked.value
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
            ref: vue.unref(forwardRef),
            "data-state": vue.unref(itemContext).checked.value ? "checked" : "unchecked",
            "data-disabled": vue.unref(itemContext).disabled.value ? "" : void 0,
            "as-child": _ctx.asChild,
            as: _ctx.as
          }, _ctx.$attrs), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["data-state", "data-disabled", "as-child", "as"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=RadioGroupIndicator.cjs.map
