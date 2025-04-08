'use strict';

const vue = require('vue');
const VisuallyHidden_VisuallyHiddenInputBubble = require('./VisuallyHiddenInputBubble.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "VisuallyHiddenInput",
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
    const isFormArrayEmptyAndRequired = vue.computed(
      () => typeof props.value === "object" && Array.isArray(props.value) && props.value.length === 0 && props.required
    );
    const parsedValue = vue.computed(() => {
      if (typeof props.value === "string" || typeof props.value === "number" || typeof props.value === "boolean") {
        return [{ name: props.name, value: props.value }];
      } else if (typeof props.value === "object" && Array.isArray(props.value)) {
        return props.value.flatMap((obj, index) => {
          if (typeof obj === "object")
            return Object.entries(obj).map(([key, value]) => ({ name: `[${props.name}][${index}][${key}]`, value }));
          else
            return { name: `[${props.name}][${index}]`, value: obj };
        });
      } else if (props.value !== null && typeof props.value === "object" && !Array.isArray(props.value)) {
        return Object.entries(props.value).map(([key, value]) => ({ name: `[${props.name}][${key}]`, value }));
      }
      return [];
    });
    return (_ctx, _cache) => {
      return isFormArrayEmptyAndRequired.value ? (vue.openBlock(), vue.createBlock(VisuallyHidden_VisuallyHiddenInputBubble._sfc_main, vue.mergeProps({ key: _ctx.name }, { ...props, ..._ctx.$attrs }, {
        name: _ctx.name,
        value: _ctx.value
      }), null, 16, ["name", "value"])) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(parsedValue.value, (parsed) => {
        return vue.openBlock(), vue.createBlock(VisuallyHidden_VisuallyHiddenInputBubble._sfc_main, vue.mergeProps({
          key: parsed.name,
          ref_for: true
        }, { ...props, ..._ctx.$attrs }, {
          name: parsed.name,
          value: parsed.value
        }), null, 16, ["name", "value"]);
      }), 128));
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=VisuallyHiddenInput.cjs.map
