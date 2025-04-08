'use strict';

const vue = require('vue');
const shared_isValueEqualOrExist = require('../shared/isValueEqualOrExist.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const RovingFocus_RovingFocusItem = require('../RovingFocus/RovingFocusItem.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Toggle_Toggle = require('../Toggle/Toggle.cjs');
const ToggleGroup_ToggleGroupRoot = require('./ToggleGroupRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ToggleGroupItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = ToggleGroup_ToggleGroupRoot.injectToggleGroupRootContext();
    const disabled = vue.computed(() => rootContext.disabled?.value || props.disabled);
    const pressed = vue.computed(() => shared_isValueEqualOrExist.isValueEqualOrExist(rootContext.modelValue.value, props.value));
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(rootContext).rovingFocus.value ? vue.unref(RovingFocus_RovingFocusItem._sfc_main) : vue.unref(Primitive_Primitive.Primitive)), {
        "as-child": "",
        focusable: !disabled.value,
        active: pressed.value
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Toggle_Toggle._sfc_main), vue.mergeProps(props, {
            ref: vue.unref(forwardRef),
            disabled: disabled.value,
            "model-value": pressed.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(rootContext).changeModelValue(_ctx.value))
          }), {
            default: vue.withCtx((slotProps) => [
              vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.guardReactiveProps(slotProps)))
            ]),
            _: 3
          }, 16, ["disabled", "model-value"])
        ]),
        _: 3
      }, 8, ["focusable", "active"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=ToggleGroupItem.cjs.map
