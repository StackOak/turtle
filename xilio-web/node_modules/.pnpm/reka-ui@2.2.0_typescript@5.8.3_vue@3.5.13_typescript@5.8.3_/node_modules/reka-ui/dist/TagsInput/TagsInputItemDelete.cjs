'use strict';

const vue = require('vue');
const ohash = require('ohash');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const TagsInput_TagsInputRoot = require('./TagsInputRoot.cjs');
const TagsInput_TagsInputItem = require('./TagsInputItem.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TagsInputItemDelete",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    shared_useForwardExpose.useForwardExpose();
    const context = TagsInput_TagsInputRoot.injectTagsInputRootContext();
    const itemContext = TagsInput_TagsInputItem.injectTagsInputItemContext();
    const disabled = vue.computed(() => itemContext.disabled?.value || context.disabled.value);
    function handleDelete() {
      if (disabled.value)
        return;
      const index = context.modelValue.value.findIndex((i) => ohash.isEqual(i, itemContext.value.value));
      context.onRemoveValue(index);
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({ tabindex: "-1" }, props, {
        "aria-labelledby": vue.unref(itemContext).textId,
        "aria-current": vue.unref(itemContext).isSelected.value,
        "data-state": vue.unref(itemContext).isSelected.value ? "active" : "inactive",
        "data-disabled": disabled.value ? "" : void 0,
        type: _ctx.as === "button" ? "button" : void 0,
        onClick: handleDelete
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-labelledby", "aria-current", "data-state", "data-disabled", "type"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TagsInputItemDelete.cjs.map
