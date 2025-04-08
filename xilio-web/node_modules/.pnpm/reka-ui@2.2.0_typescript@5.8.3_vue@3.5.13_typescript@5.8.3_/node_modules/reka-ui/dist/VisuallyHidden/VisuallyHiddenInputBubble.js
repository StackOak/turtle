import { defineComponent, computed, watch, createBlock, openBlock, mergeProps } from 'vue';
import { _ as _sfc_main$1 } from './VisuallyHidden.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "VisuallyHiddenInputBubble",
  props: {
    name: {},
    value: {},
    checked: { type: Boolean, default: void 0 },
    required: { type: Boolean },
    disabled: { type: Boolean },
    feature: { default: "fully-hidden" }
  },
  setup(__props) {
    const props = __props;
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const valueState = computed(() => props.checked ?? props.value);
    watch(valueState, (cur, prev) => {
      if (!currentElement.value)
        return;
      const input = currentElement.value;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, "value");
      const setValue = descriptor.set;
      if (setValue && cur !== prev) {
        const inputEvent = new Event("input", { bubbles: true });
        const changeEvent = new Event("change", { bubbles: true });
        setValue.call(input, cur);
        input.dispatchEvent(inputEvent);
        input.dispatchEvent(changeEvent);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement
      }, { ...props, ..._ctx.$attrs }, { as: "input" }), null, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=VisuallyHiddenInputBubble.js.map
