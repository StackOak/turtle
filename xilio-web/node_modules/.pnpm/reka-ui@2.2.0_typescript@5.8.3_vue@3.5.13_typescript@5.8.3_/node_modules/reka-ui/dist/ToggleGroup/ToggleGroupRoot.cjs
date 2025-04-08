'use strict';

const vue = require('vue');
const shared_useSingleOrMultipleValue = require('../shared/useSingleOrMultipleValue.cjs');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const RovingFocus_RovingFocusGroup = require('../RovingFocus/RovingFocusGroup.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectToggleGroupRootContext, provideToggleGroupRootContext] = shared_createContext.createContext("ToggleGroupRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ToggleGroupRoot",
  props: {
    rovingFocus: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    orientation: {},
    dir: {},
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { loop, rovingFocus, disabled, dir: propDir } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const { modelValue, changeModelValue, isSingle } = shared_useSingleOrMultipleValue.useSingleOrMultipleValue(props, emits);
    const isFormControl = shared_useFormControl.useFormControl(currentElement);
    provideToggleGroupRootContext({
      isSingle,
      modelValue,
      changeModelValue,
      dir,
      orientation: props.orientation,
      loop,
      rovingFocus,
      disabled
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(rovingFocus) ? vue.unref(RovingFocus_RovingFocusGroup._sfc_main) : vue.unref(Primitive_Primitive.Primitive)), {
        "as-child": "",
        orientation: vue.unref(rovingFocus) ? _ctx.orientation : void 0,
        dir: vue.unref(dir),
        loop: vue.unref(rovingFocus) ? vue.unref(loop) : void 0
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            ref: vue.unref(forwardRef),
            role: "group",
            "as-child": _ctx.asChild,
            as: _ctx.as
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) }),
              vue.unref(isFormControl) && _ctx.name ? (vue.openBlock(), vue.createBlock(VisuallyHidden_VisuallyHiddenInput._sfc_main, {
                key: 0,
                name: _ctx.name,
                required: _ctx.required,
                value: vue.unref(modelValue)
              }, null, 8, ["name", "required", "value"])) : vue.createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["as-child", "as"])
        ]),
        _: 3
      }, 8, ["orientation", "dir", "loop"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectToggleGroupRootContext = injectToggleGroupRootContext;
//# sourceMappingURL=ToggleGroupRoot.cjs.map
