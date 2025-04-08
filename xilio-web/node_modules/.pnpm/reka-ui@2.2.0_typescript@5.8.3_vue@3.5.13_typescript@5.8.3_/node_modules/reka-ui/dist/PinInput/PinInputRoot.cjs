'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectPinInputRootContext, providePinInputRootContext] = shared_createContext.createContext("PinInputRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PinInputRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    placeholder: { default: "" },
    mask: { type: Boolean },
    otp: { type: Boolean },
    type: { default: "text" },
    dir: {},
    disabled: { type: Boolean },
    id: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "complete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { mask, otp, placeholder, type, disabled, dir: propDir } = vue.toRefs(props);
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const dir = shared_useDirection.useDirection(propDir);
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? [],
      passive: props.modelValue === void 0
    });
    const currentModelValue = vue.computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);
    const inputElements = vue.ref(/* @__PURE__ */ new Set());
    function onInputElementChange(el) {
      inputElements.value.add(el);
    }
    const isCompleted = vue.computed(() => {
      const modelValues = currentModelValue.value.filter((i) => !!i);
      return modelValues.length === inputElements.value.size;
    });
    vue.watch(modelValue, () => {
      if (isCompleted.value)
        emits("complete", modelValue.value);
    }, { deep: true });
    providePinInputRootContext({
      modelValue,
      currentModelValue,
      mask,
      otp,
      placeholder,
      type,
      dir,
      disabled,
      isCompleted,
      inputElements,
      onInputElementChange
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
        ref: vue.unref(forwardRef),
        dir: vue.unref(dir),
        "data-complete": isCompleted.value ? "" : void 0,
        "data-disabled": vue.unref(disabled) ? "" : void 0
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) }),
          vue.createVNode(VisuallyHidden_VisuallyHiddenInput._sfc_main, {
            id: _ctx.id,
            as: "input",
            feature: "focusable",
            tabindex: "-1",
            value: currentModelValue.value.join(""),
            name: _ctx.name ?? "",
            disabled: vue.unref(disabled),
            required: _ctx.required,
            onFocus: _cache[0] || (_cache[0] = ($event) => Array.from(inputElements.value)?.[0]?.focus())
          }, null, 8, ["id", "value", "name", "disabled", "required"])
        ]),
        _: 3
      }, 16, ["dir", "data-complete", "data-disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectPinInputRootContext = injectPinInputRootContext;
//# sourceMappingURL=PinInputRoot.cjs.map
