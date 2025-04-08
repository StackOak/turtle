import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { isEqual } from 'ohash';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectTagsInputRootContext } from './TagsInputRoot.js';
import { i as injectTagsInputItemContext } from './TagsInputItem.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TagsInputItemDelete",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const context = injectTagsInputRootContext();
    const itemContext = injectTagsInputItemContext();
    const disabled = computed(() => itemContext.disabled?.value || context.disabled.value);
    function handleDelete() {
      if (disabled.value)
        return;
      const index = context.modelValue.value.findIndex((i) => isEqual(i, itemContext.value.value));
      context.onRemoveValue(index);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({ tabindex: "-1" }, props, {
        "aria-labelledby": unref(itemContext).textId,
        "aria-current": unref(itemContext).isSelected.value,
        "data-state": unref(itemContext).isSelected.value ? "active" : "inactive",
        "data-disabled": disabled.value ? "" : void 0,
        type: _ctx.as === "button" ? "button" : void 0,
        onClick: handleDelete
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-labelledby", "aria-current", "data-state", "data-disabled", "type"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=TagsInputItemDelete.js.map
