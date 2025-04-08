'use strict';

const vue = require('vue');
const Editable_EditableRoot = require('./EditableRoot.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "EditableArea",
  props: {
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const context = Editable_EditableRoot.injectEditableRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        "data-placeholder-shown": vue.unref(context).isEditing.value ? void 0 : "",
        "data-focus": vue.unref(context).isEditing.value ? "" : void 0,
        "data-focused": vue.unref(context).isEditing.value ? "" : void 0,
        "data-empty": vue.unref(context).isEmpty.value ? "" : void 0,
        "data-readonly": vue.unref(context).readonly.value ? "" : void 0,
        "data-disabled": vue.unref(context).disabled.value ? "" : void 0,
        style: vue.unref(context).autoResize.value ? { display: "inline-grid" } : void 0
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-placeholder-shown", "data-focus", "data-focused", "data-empty", "data-readonly", "data-disabled", "style"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=EditableArea.cjs.map
