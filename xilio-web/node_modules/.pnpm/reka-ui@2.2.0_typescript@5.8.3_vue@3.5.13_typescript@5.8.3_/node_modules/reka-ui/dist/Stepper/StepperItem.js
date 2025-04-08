import { defineComponent, toRefs, computed, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectStepperRootContext } from './StepperRoot.js';
import { u as useId } from '../shared/useId.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectStepperItemContext, provideStepperItemContext] = createContext("StepperItem");
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const { disabled, step, completed } = toRefs(props);
    const { forwardRef } = useForwardExpose();
    const rootContext = injectStepperRootContext();
    const titleId = useId(void 0, "reka-stepper-item-title");
    const descriptionId = useId(void 0, "reka-stepper-item-description");
    const itemState = computed(() => {
      if (completed.value)
        return "completed";
      if (rootContext.modelValue.value === step.value)
        return "active";
      if (rootContext.modelValue.value > step.value)
        return "completed";
      return "inactive";
    });
    const isFocusable = computed(() => {
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
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "aria-current": itemState.value === "active" ? "true" : void 0,
        "data-state": itemState.value,
        disabled: unref(disabled) || !isFocusable.value ? "" : void 0,
        "data-disabled": unref(disabled) || !isFocusable.value ? "" : void 0,
        "data-orientation": unref(rootContext).orientation.value
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { state: itemState.value })
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-current", "data-state", "disabled", "data-disabled", "data-orientation"]);
    };
  }
});

export { _sfc_main as _, injectStepperItemContext as i };
//# sourceMappingURL=StepperItem.js.map
