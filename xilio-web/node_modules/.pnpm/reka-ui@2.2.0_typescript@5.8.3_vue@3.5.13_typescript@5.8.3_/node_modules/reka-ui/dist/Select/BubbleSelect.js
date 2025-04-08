import { defineComponent, ref, watch, createBlock, openBlock, unref, withCtx, createElementVNode, mergeProps, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../VisuallyHidden/VisuallyHidden.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BubbleSelect",
  props: {
    autocomplete: {},
    autofocus: { type: Boolean },
    disabled: { type: Boolean },
    form: {},
    multiple: { type: Boolean },
    name: {},
    required: { type: Boolean },
    size: {},
    value: {}
  },
  setup(__props) {
    const props = __props;
    const selectElement = ref();
    watch(() => props.value, (cur, prev) => {
      const selectProto = window.HTMLSelectElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        selectProto,
        "value"
      );
      const setValue = descriptor.set;
      if (cur !== prev && setValue && selectElement.value) {
        const event = new Event("change", { bubbles: true });
        setValue.call(selectElement.value, cur);
        selectElement.value.dispatchEvent(event);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), { "as-child": "" }, {
        default: withCtx(() => [
          createElementVNode("select", mergeProps({
            ref_key: "selectElement",
            ref: selectElement
          }, props), [
            renderSlot(_ctx.$slots, "default")
          ], 16)
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=BubbleSelect.js.map
