'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const ToggleGroup_ToggleGroupRoot = require('../ToggleGroup/ToggleGroupRoot.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "Toggle",
  props: {
    defaultValue: { type: Boolean },
    modelValue: { type: [Boolean, null], default: void 0 },
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "button" },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const toggleGroupContext = ToggleGroup_ToggleGroupRoot.injectToggleGroupRootContext(null);
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    function togglePressed() {
      modelValue.value = !modelValue.value;
    }
    const dataState = vue.computed(() => {
      return modelValue.value ? "on" : "off";
    });
    const isFormControl = shared_useFormControl.useFormControl(currentElement);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        type: _ctx.as === "button" ? "button" : void 0,
        "as-child": props.asChild,
        as: _ctx.as,
        "aria-pressed": vue.unref(modelValue),
        "data-state": dataState.value,
        "data-disabled": _ctx.disabled ? "" : void 0,
        disabled: _ctx.disabled,
        onClick: togglePressed
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            modelValue: vue.unref(modelValue),
            disabled: _ctx.disabled,
            pressed: vue.unref(modelValue),
            state: dataState.value
          }),
          vue.unref(isFormControl) && _ctx.name && !vue.unref(toggleGroupContext) ? (vue.openBlock(), vue.createBlock(VisuallyHidden_VisuallyHiddenInput._sfc_main, {
            key: 0,
            type: "checkbox",
            name: _ctx.name,
            value: vue.unref(modelValue),
            required: _ctx.required
          }, null, 8, ["name", "value", "required"])) : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["type", "as-child", "as", "aria-pressed", "data-state", "data-disabled", "disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=Toggle.cjs.map
