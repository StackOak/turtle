'use strict';

const vue = require('vue');
const VisuallyHidden_VisuallyHidden = require('./VisuallyHidden.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const valueState = vue.computed(() => props.checked ?? props.value);
    vue.watch(valueState, (cur, prev) => {
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
      return vue.openBlock(), vue.createBlock(VisuallyHidden_VisuallyHidden._sfc_main, vue.mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement
      }, { ...props, ..._ctx.$attrs }, { as: "input" }), null, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=VisuallyHiddenInputBubble.cjs.map
