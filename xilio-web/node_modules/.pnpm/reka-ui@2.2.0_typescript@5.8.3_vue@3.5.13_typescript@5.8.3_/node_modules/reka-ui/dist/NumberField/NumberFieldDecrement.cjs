'use strict';

const vue = require('vue');
const NumberField_utils = require('./utils.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const NumberField_NumberFieldRoot = require('./NumberFieldRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "NumberFieldDecrement",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = NumberField_NumberFieldRoot.injectNumberFieldRootContext();
    const isDisabled = vue.computed(() => rootContext.disabled?.value || props.disabled || rootContext.isDecreaseDisabled.value);
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const { isPressed, onTrigger } = NumberField_utils.usePressedHold({ target: currentElement, disabled: isDisabled });
    onTrigger(() => {
      rootContext.handleDecrease();
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        tabindex: "-1",
        "aria-label": "Decrease",
        type: _ctx.as === "button" ? "button" : void 0,
        style: {
          userSelect: vue.unref(isPressed) ? "none" : void 0
        },
        disabled: isDisabled.value ? "" : void 0,
        "data-disabled": isDisabled.value ? "" : void 0,
        "data-pressed": vue.unref(isPressed) ? "true" : void 0,
        onContextmenu: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["prevent"]))
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["type", "style", "disabled", "data-disabled", "data-pressed"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=NumberFieldDecrement.cjs.map
