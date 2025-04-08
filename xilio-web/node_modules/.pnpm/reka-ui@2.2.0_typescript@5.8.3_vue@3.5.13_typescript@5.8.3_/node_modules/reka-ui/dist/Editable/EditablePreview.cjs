'use strict';

const vue = require('vue');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Editable_EditableRoot = require('./EditableRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "EditablePreview",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const context = Editable_EditableRoot.injectEditableRootContext();
    const placeholder = vue.computed(() => context.placeholder.value?.preview);
    function handleFocus() {
      if (context.activationMode.value === "focus")
        context.edit();
    }
    function handleDoubleClick() {
      if (context.activationMode.value === "dblclick")
        context.edit();
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        tabindex: "0",
        "data-placeholder-shown": vue.unref(context).isEditing.value ? void 0 : "",
        hidden: vue.unref(context).autoResize.value ? void 0 : vue.unref(context).isEditing.value,
        style: vue.unref(context).autoResize.value ? {
          whiteSpace: "pre",
          userSelect: "none",
          gridArea: "1 / 1 / auto / auto",
          visibility: vue.unref(context).isEditing.value ? "hidden" : void 0,
          overflow: "hidden",
          textOverflow: "ellipsis"
        } : void 0,
        onFocusin: handleFocus,
        onDblclick: handleDoubleClick
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(vue.toDisplayString(vue.unref(context).modelValue.value || placeholder.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["data-placeholder-shown", "hidden", "style"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=EditablePreview.cjs.map
