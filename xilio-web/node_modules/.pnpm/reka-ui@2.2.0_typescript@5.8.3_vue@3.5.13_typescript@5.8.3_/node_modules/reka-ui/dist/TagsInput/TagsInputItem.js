import { defineComponent, toRefs, computed, createBlock, openBlock, unref, withCtx, createVNode, renderSlot } from 'vue';
import { u as useCollection } from '../Collection/Collection.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectTagsInputRootContext } from './TagsInputRoot.js';

const [injectTagsInputItemContext, provideTagsInputItemContext] = createContext("TagsInputItem");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TagsInputItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { value } = toRefs(props);
    const context = injectTagsInputRootContext();
    const { forwardRef, currentElement } = useForwardExpose();
    const { CollectionItem } = useCollection();
    const isSelected = computed(() => context.selectedElement.value === currentElement.value);
    const disabled = computed(() => props.disabled || context.disabled.value);
    const itemContext = provideTagsInputItemContext({
      value,
      isSelected,
      disabled,
      textId: "",
      displayValue: computed(() => context.displayValue(value.value))
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionItem), { value: unref(value) }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            ref: unref(forwardRef),
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "aria-labelledby": unref(itemContext).textId,
            "aria-current": isSelected.value,
            "data-disabled": disabled.value ? "" : void 0,
            "data-state": isSelected.value ? "active" : "inactive"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "as-child", "aria-labelledby", "aria-current", "data-disabled", "data-state"])
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
});

export { _sfc_main as _, injectTagsInputItemContext as i };
//# sourceMappingURL=TagsInputItem.js.map
