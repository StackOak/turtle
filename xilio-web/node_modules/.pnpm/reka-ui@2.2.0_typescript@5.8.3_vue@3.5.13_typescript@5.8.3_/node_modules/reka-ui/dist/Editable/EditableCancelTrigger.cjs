'use strict';

const vue = require('vue');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Editable_EditableRoot = require('./EditableRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "EditableCancelTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const context = Editable_EditableRoot.injectEditableRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        "aria-label": "cancel",
        "aria-disabled": vue.unref(context).disabled.value ? "" : void 0,
        "data-disabled": vue.unref(context).disabled.value ? "" : void 0,
        disabled: vue.unref(context).disabled.value,
        type: _ctx.as === "button" ? "button" : void 0,
        hidden: vue.unref(context).isEditing.value ? void 0 : "",
        onClick: vue.unref(context).cancel
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            _cache[0] || (_cache[0] = vue.createTextVNode("Cancel"))
          ])
        ]),
        _: 3
      }, 16, ["aria-disabled", "data-disabled", "disabled", "type", "hidden", "onClick"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=EditableCancelTrigger.cjs.map
