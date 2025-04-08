'use strict';

const vue = require('vue');
const Checkbox_utils = require('./utils.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Checkbox_CheckboxRoot = require('./CheckboxRoot.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "CheckboxIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Checkbox_CheckboxRoot.injectCheckboxRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(Checkbox_utils.isIndeterminate)(vue.unref(rootContext).state.value) || vue.unref(rootContext).state.value === true
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
            ref: vue.unref(forwardRef),
            "data-state": vue.unref(Checkbox_utils.getState)(vue.unref(rootContext).state.value),
            "data-disabled": vue.unref(rootContext).disabled.value ? "" : void 0,
            style: { pointerEvents: "none" },
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
//# sourceMappingURL=CheckboxIndicator.cjs.map
