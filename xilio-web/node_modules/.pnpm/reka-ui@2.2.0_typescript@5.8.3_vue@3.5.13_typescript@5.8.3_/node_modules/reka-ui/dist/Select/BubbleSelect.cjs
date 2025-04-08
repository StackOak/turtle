'use strict';

const vue = require('vue');
const VisuallyHidden_VisuallyHidden = require('../VisuallyHidden/VisuallyHidden.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const selectElement = vue.ref();
    vue.watch(() => props.value, (cur, prev) => {
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
      return vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHidden._sfc_main), { "as-child": "" }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("select", vue.mergeProps({
            ref_key: "selectElement",
            ref: selectElement
          }, props), [
            vue.renderSlot(_ctx.$slots, "default")
          ], 16)
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=BubbleSelect.cjs.map
