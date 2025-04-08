'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const RovingFocus_RovingFocusGroup = require('../RovingFocus/RovingFocusGroup.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');

const [injectRadioGroupRootContext, provideRadioGroupRootContext] = shared_createContext.createContext("RadioGroupRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "RadioGroupRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    disabled: { type: Boolean, default: false },
    orientation: { default: void 0 },
    dir: {},
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const { disabled, loop, orientation, name, required, dir: propDir } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    const isFormControl = shared_useFormControl.useFormControl(currentElement);
    provideRadioGroupRootContext({
      modelValue,
      changeModelValue: (value) => {
        modelValue.value = value;
      },
      disabled,
      loop,
      orientation,
      name: name?.value,
      required
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RovingFocus_RovingFocusGroup._sfc_main), {
        "as-child": "",
        orientation: vue.unref(orientation),
        dir: vue.unref(dir),
        loop: vue.unref(loop)
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            role: "radiogroup",
            "data-disabled": vue.unref(disabled) ? "" : void 0,
            "as-child": _ctx.asChild,
            as: _ctx.as,
            "aria-orientation": vue.unref(orientation),
            "aria-required": vue.unref(required),
            dir: vue.unref(dir)
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) }),
              vue.unref(isFormControl) && vue.unref(name) ? (vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHiddenInput._sfc_main), {
                key: 0,
                required: vue.unref(required),
                disabled: vue.unref(disabled),
                value: vue.unref(modelValue),
                name: vue.unref(name)
              }, null, 8, ["required", "disabled", "value", "name"])) : vue.createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["data-disabled", "as-child", "as", "aria-orientation", "aria-required", "dir"])
        ]),
        _: 3
      }, 8, ["orientation", "dir", "loop"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectRadioGroupRootContext = injectRadioGroupRootContext;
//# sourceMappingURL=RadioGroupRoot.cjs.map
