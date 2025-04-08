'use strict';

const vue = require('vue');
const Checkbox_utils = require('./utils.cjs');
const ohash = require('ohash');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Checkbox_CheckboxGroupRoot = require('./CheckboxGroupRoot.cjs');
const shared_nullish = require('../shared/nullish.cjs');
const shared_isValueEqualOrExist = require('../shared/isValueEqualOrExist.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const RovingFocus_RovingFocusItem = require('../RovingFocus/RovingFocusItem.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');

const [injectCheckboxRootContext, provideCheckboxRootContext] = shared_createContext.createContext("CheckboxRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "CheckboxRoot",
  props: {
    defaultValue: { type: [Boolean, String] },
    modelValue: { type: [Boolean, String, null], default: void 0 },
    disabled: { type: Boolean },
    value: { default: "on" },
    id: {},
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
    const checkboxGroupContext = Checkbox_CheckboxGroupRoot.injectCheckboxGroupRootContext(null);
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const disabled = vue.computed(() => checkboxGroupContext?.disabled.value || props.disabled);
    const checkboxState = vue.computed(() => {
      if (!shared_nullish.isNullish(checkboxGroupContext?.modelValue.value)) {
        return shared_isValueEqualOrExist.isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
      } else {
        return modelValue.value === "indeterminate" ? "indeterminate" : modelValue.value;
      }
    });
    function handleClick() {
      if (!shared_nullish.isNullish(checkboxGroupContext?.modelValue.value)) {
        const modelValueArray = [...checkboxGroupContext.modelValue.value || []];
        if (shared_isValueEqualOrExist.isValueEqualOrExist(modelValueArray, props.value)) {
          const index = modelValueArray.findIndex((i) => ohash.isEqual(i, props.value));
          modelValueArray.splice(index, 1);
        } else {
          modelValueArray.push(props.value);
        }
        checkboxGroupContext.modelValue.value = modelValueArray;
      } else {
        modelValue.value = Checkbox_utils.isIndeterminate(modelValue.value) ? true : !modelValue.value;
      }
    }
    const isFormControl = shared_useFormControl.useFormControl(currentElement);
    const ariaLabel = vue.computed(() => props.id && currentElement.value ? document.querySelector(`[for="${props.id}"]`)?.innerText : void 0);
    provideCheckboxRootContext({
      disabled,
      state: checkboxState
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(checkboxGroupContext)?.rovingFocus.value ? vue.unref(RovingFocus_RovingFocusItem._sfc_main) : vue.unref(Primitive_Primitive.Primitive)), vue.mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: vue.unref(forwardRef),
        role: "checkbox",
        "as-child": _ctx.asChild,
        as: _ctx.as,
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-checked": vue.unref(Checkbox_utils.isIndeterminate)(checkboxState.value) ? "mixed" : checkboxState.value,
        "aria-required": _ctx.required,
        "aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
        "data-state": vue.unref(Checkbox_utils.getState)(checkboxState.value),
        "data-disabled": disabled.value ? "" : void 0,
        disabled: disabled.value,
        focusable: vue.unref(checkboxGroupContext)?.rovingFocus.value ? !disabled.value : void 0,
        onKeydown: vue.withKeys(vue.withModifiers(() => {
        }, ["prevent"]), ["enter"]),
        onClick: handleClick
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            modelValue: vue.unref(modelValue),
            state: checkboxState.value
          }),
          vue.unref(isFormControl) && _ctx.name && !vue.unref(checkboxGroupContext) ? (vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHiddenInput._sfc_main), {
            key: 0,
            type: "checkbox",
            checked: !!checkboxState.value,
            name: _ctx.name,
            value: _ctx.value,
            disabled: disabled.value,
            required: _ctx.required
          }, null, 8, ["checked", "name", "value", "disabled", "required"])) : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["id", "as-child", "as", "type", "aria-checked", "aria-required", "aria-label", "data-state", "data-disabled", "disabled", "focusable", "onKeydown"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectCheckboxRootContext = injectCheckboxRootContext;
//# sourceMappingURL=CheckboxRoot.cjs.map
