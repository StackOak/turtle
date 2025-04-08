'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');

const [injectSwitchRootContext, provideSwitchRootContext] = shared_createContext.createContext("SwitchRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SwitchRoot",
  props: {
    defaultValue: { type: Boolean },
    modelValue: { type: [Boolean, null], default: void 0 },
    disabled: { type: Boolean },
    id: {},
    value: { default: "on" },
    asChild: { type: Boolean },
    as: { default: "button" },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { disabled } = vue.toRefs(props);
    const modelValue = core.useVModel(props, "modelValue", emit, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    function toggleCheck() {
      if (disabled.value)
        return;
      modelValue.value = !modelValue.value;
    }
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const isFormControl = shared_useFormControl.useFormControl(currentElement);
    const ariaLabel = vue.computed(() => props.id && currentElement.value ? document.querySelector(`[for="${props.id}"]`)?.innerText : void 0);
    provideSwitchRootContext({
      modelValue,
      toggleCheck,
      disabled
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: vue.unref(forwardRef),
        role: "switch",
        type: _ctx.as === "button" ? "button" : void 0,
        value: _ctx.value,
        "aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
        "aria-checked": vue.unref(modelValue),
        "aria-required": _ctx.required,
        "data-state": vue.unref(modelValue) ? "checked" : "unchecked",
        "data-disabled": vue.unref(disabled) ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as,
        disabled: vue.unref(disabled),
        onClick: toggleCheck,
        onKeydown: vue.withKeys(vue.withModifiers(toggleCheck, ["prevent"]), ["enter"])
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) }),
          vue.unref(isFormControl) && _ctx.name ? (vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHiddenInput._sfc_main), {
            key: 0,
            type: "checkbox",
            name: _ctx.name,
            disabled: vue.unref(disabled),
            required: _ctx.required,
            value: _ctx.value,
            checked: !!vue.unref(modelValue)
          }, null, 8, ["name", "disabled", "required", "value", "checked"])) : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["id", "type", "value", "aria-label", "aria-checked", "aria-required", "data-state", "data-disabled", "as-child", "as", "disabled", "onKeydown"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectSwitchRootContext = injectSwitchRootContext;
//# sourceMappingURL=SwitchRoot.cjs.map
