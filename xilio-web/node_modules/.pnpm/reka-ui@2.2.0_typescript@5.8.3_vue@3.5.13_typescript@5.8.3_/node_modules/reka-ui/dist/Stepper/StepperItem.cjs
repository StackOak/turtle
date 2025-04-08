'use strict';

const vue = require('vue');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Stepper_StepperRoot = require('./StepperRoot.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectStepperItemContext, provideStepperItemContext] = shared_createContext.createContext("StepperItem");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "StepperItem",
  props: {
    step: {},
    disabled: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const { disabled, step, completed } = vue.toRefs(props);
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Stepper_StepperRoot.injectStepperRootContext();
    const titleId = shared_useId.useId(void 0, "reka-stepper-item-title");
    const descriptionId = shared_useId.useId(void 0, "reka-stepper-item-description");
    const itemState = vue.computed(() => {
      if (completed.value)
        return "completed";
      if (rootContext.modelValue.value === step.value)
        return "active";
      if (rootContext.modelValue.value > step.value)
        return "completed";
      return "inactive";
    });
    const isFocusable = vue.computed(() => {
      if (disabled.value)
        return false;
      if (rootContext.linear.value)
        return step.value <= rootContext.modelValue.value || step.value === rootContext.modelValue.value + 1;
      return true;
    });
    provideStepperItemContext({
      titleId,
      descriptionId,
      state: itemState,
      disabled,
      step,
      isFocusable
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "aria-current": itemState.value === "active" ? "true" : void 0,
        "data-state": itemState.value,
        disabled: vue.unref(disabled) || !isFocusable.value ? "" : void 0,
        "data-disabled": vue.unref(disabled) || !isFocusable.value ? "" : void 0,
        "data-orientation": vue.unref(rootContext).orientation.value
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { state: itemState.value })
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-current", "data-state", "disabled", "data-disabled", "data-orientation"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectStepperItemContext = injectStepperItemContext;
//# sourceMappingURL=StepperItem.cjs.map
