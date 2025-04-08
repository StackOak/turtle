import { defineComponent, onMounted, computed, createBlock, openBlock, unref, withCtx, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectSelectRootContext } from './SelectRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectValue",
  props: {
    placeholder: { default: "" },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef, currentElement } = useForwardExpose();
    const rootContext = injectSelectRootContext();
    onMounted(() => {
      rootContext.valueElement = currentElement;
    });
    const selectedLabel = computed(() => {
      let list = [];
      const options = Array.from(rootContext.optionsSet.value);
      const getOption = (value) => options.find((option) => option.value === value);
      if (Array.isArray(rootContext.modelValue.value)) {
        list = rootContext.modelValue.value.map((value) => getOption(value)?.textContent ?? "");
      } else {
        list = [getOption(rootContext.modelValue.value)?.textContent ?? ""];
      }
      return list.filter(Boolean);
    });
    const slotText = computed(() => {
      return selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        style: { pointerEvents: "none" },
        "data-placeholder": selectedLabel.value.length ? void 0 : props.placeholder
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            selectedLabel: selectedLabel.value,
            modelValue: unref(rootContext).modelValue.value
          }, () => [
            createTextVNode(toDisplayString(slotText.value), 1)
          ])
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-placeholder"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SelectValue.js.map
