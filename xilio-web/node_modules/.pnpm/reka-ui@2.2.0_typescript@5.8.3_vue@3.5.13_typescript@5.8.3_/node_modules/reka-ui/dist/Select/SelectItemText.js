import { defineComponent, computed, onMounted, onBeforeUnmount, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectSelectRootContext } from './SelectRoot.js';
import { i as injectSelectContentContext } from './SelectContentImpl.js';
import { i as injectSelectItemContext } from './SelectItem.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SelectItemText",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectSelectRootContext();
    const contentContext = injectSelectContentContext();
    const itemContext = injectSelectItemContext();
    const { forwardRef, currentElement: itemTextElement } = useForwardExpose();
    const optionProps = computed(() => {
      return {
        value: itemContext.value,
        disabled: itemContext.disabled.value,
        textContent: itemTextElement.value?.textContent ?? itemContext.value?.toString() ?? ""
      };
    });
    onMounted(() => {
      if (!itemTextElement.value)
        return;
      itemContext.onItemTextChange(itemTextElement.value);
      contentContext.itemTextRefCallback(
        itemTextElement.value,
        itemContext.value,
        itemContext.disabled.value
      );
      rootContext.onOptionAdd(optionProps.value);
    });
    onBeforeUnmount(() => {
      rootContext.onOptionRemove(optionProps.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({
        id: unref(itemContext).textId,
        ref: unref(forwardRef)
      }, { ...props, ..._ctx.$attrs }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SelectItemText.js.map
