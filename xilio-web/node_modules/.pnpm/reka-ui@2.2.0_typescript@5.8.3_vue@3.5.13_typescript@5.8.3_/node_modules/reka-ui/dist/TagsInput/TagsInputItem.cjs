'use strict';

const vue = require('vue');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const TagsInput_TagsInputRoot = require('./TagsInputRoot.cjs');

const [injectTagsInputItemContext, provideTagsInputItemContext] = shared_createContext.createContext("TagsInputItem");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TagsInputItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { value } = vue.toRefs(props);
    const context = TagsInput_TagsInputRoot.injectTagsInputRootContext();
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const { CollectionItem } = Collection_Collection.useCollection();
    const isSelected = vue.computed(() => context.selectedElement.value === currentElement.value);
    const disabled = vue.computed(() => props.disabled || context.disabled.value);
    const itemContext = provideTagsInputItemContext({
      value,
      isSelected,
      disabled,
      textId: "",
      displayValue: vue.computed(() => context.displayValue(value.value))
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionItem), { value: vue.unref(value) }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "aria-labelledby": vue.unref(itemContext).textId,
            "aria-current": isSelected.value,
            "data-disabled": disabled.value ? "" : void 0,
            "data-state": isSelected.value ? "active" : "inactive"
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "as-child", "aria-labelledby", "aria-current", "data-disabled", "data-state"])
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectTagsInputItemContext = injectTagsInputItemContext;
//# sourceMappingURL=TagsInputItem.cjs.map
