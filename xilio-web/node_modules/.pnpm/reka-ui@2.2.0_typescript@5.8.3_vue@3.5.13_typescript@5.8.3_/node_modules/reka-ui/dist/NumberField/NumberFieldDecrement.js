import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withModifiers, withCtx, renderSlot } from 'vue';
import { u as usePressedHold } from './utils.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectNumberFieldRootContext } from './NumberFieldRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NumberFieldDecrement",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectNumberFieldRootContext();
    const isDisabled = computed(() => rootContext.disabled?.value || props.disabled || rootContext.isDecreaseDisabled.value);
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const { isPressed, onTrigger } = usePressedHold({ target: currentElement, disabled: isDisabled });
    onTrigger(() => {
      rootContext.handleDecrease();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        tabindex: "-1",
        "aria-label": "Decrease",
        type: _ctx.as === "button" ? "button" : void 0,
        style: {
          userSelect: unref(isPressed) ? "none" : void 0
        },
        disabled: isDisabled.value ? "" : void 0,
        "data-disabled": isDisabled.value ? "" : void 0,
        "data-pressed": unref(isPressed) ? "true" : void 0,
        onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["prevent"]))
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["type", "style", "disabled", "data-disabled", "data-pressed"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=NumberFieldDecrement.js.map
