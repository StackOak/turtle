import { defineComponent, computed, createBlock, openBlock, resolveDynamicComponent, unref, withCtx, createVNode, mergeProps, renderSlot, normalizeProps, guardReactiveProps } from 'vue';
import { i as isValueEqualOrExist } from '../shared/isValueEqualOrExist.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusItem.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { _ as _sfc_main$2 } from '../Toggle/Toggle.js';
import { i as injectToggleGroupRootContext } from './ToggleGroupRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToggleGroupItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectToggleGroupRootContext();
    const disabled = computed(() => rootContext.disabled?.value || props.disabled);
    const pressed = computed(() => isValueEqualOrExist(rootContext.modelValue.value, props.value));
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).rovingFocus.value ? unref(_sfc_main$1) : unref(Primitive)), {
        "as-child": "",
        focusable: !disabled.value,
        active: pressed.value
      }, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$2), mergeProps(props, {
            ref: unref(forwardRef),
            disabled: disabled.value,
            "model-value": pressed.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(rootContext).changeModelValue(_ctx.value))
          }), {
            default: withCtx((slotProps) => [
              renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps)))
            ]),
            _: 3
          }, 16, ["disabled", "model-value"])
        ]),
        _: 3
      }, 8, ["focusable", "active"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=ToggleGroupItem.js.map
