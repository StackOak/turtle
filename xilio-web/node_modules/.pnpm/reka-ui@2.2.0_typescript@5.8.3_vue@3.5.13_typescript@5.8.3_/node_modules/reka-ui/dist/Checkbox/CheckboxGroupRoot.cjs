'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const RovingFocus_RovingFocusGroup = require('../RovingFocus/RovingFocusGroup.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');

const [injectCheckboxGroupRootContext, provideCheckboxGroupRootContext] = shared_createContext.createContext("CheckboxGroupRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "CheckboxGroupRoot",
  props: {
    defaultValue: {},
    modelValue: {},
    rovingFocus: { type: Boolean, default: true },
    disabled: { type: Boolean },
    as: {},
    asChild: { type: Boolean },
    dir: {},
    orientation: {},
    loop: { type: Boolean },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { disabled, rovingFocus, dir: propDir } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const isFormControl = shared_useFormControl.useFormControl(currentElement);
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? [],
      passive: props.modelValue === void 0
    });
    const rovingFocusProps = vue.computed(() => {
      return rovingFocus.value ? { loop: props.loop, dir: dir.value, orientation: props.orientation } : {};
    });
    provideCheckboxGroupRootContext({
      modelValue,
      rovingFocus,
      disabled
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(rovingFocus) ? vue.unref(RovingFocus_RovingFocusGroup._sfc_main) : vue.unref(Primitive_Primitive.Primitive)), vue.mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement,
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, rovingFocusProps.value), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default"),
          vue.unref(isFormControl) && _ctx.name ? (vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHiddenInput._sfc_main), {
            key: 0,
            name: _ctx.name,
            value: vue.unref(modelValue),
            required: _ctx.required
          }, null, 8, ["name", "value", "required"])) : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["as", "as-child"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectCheckboxGroupRootContext = injectCheckboxGroupRootContext;
//# sourceMappingURL=CheckboxGroupRoot.cjs.map
