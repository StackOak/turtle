import { defineComponent, computed, ref, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, withKeys, withModifiers, renderSlot } from 'vue';
import { _ as _sfc_main$2 } from './Radio.js';
import { useEventListener } from '@vueuse/core';
import { isEqual } from 'ohash';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { i as injectRadioGroupRootContext } from './RadioGroupRoot.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusItem.js';

const [injectRadioGroupItemContext, provideRadiogroupItemContext] = createContext("RadioGroupItem");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "RadioGroupItem",
  props: {
    id: {},
    value: {},
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "button" },
    name: {},
    required: { type: Boolean }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = useForwardExpose();
    const rootContext = injectRadioGroupRootContext();
    const disabled = computed(() => rootContext.disabled.value || props.disabled);
    const required = computed(() => rootContext.required.value || props.required);
    const checked = computed(() => isEqual(rootContext.modelValue?.value, props.value));
    provideRadiogroupItemContext({ disabled, checked });
    const isArrowKeyPressed = ref(false);
    const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    useEventListener("keydown", (event) => {
      if (ARROW_KEYS.includes(event.key))
        isArrowKeyPressed.value = true;
    });
    useEventListener("keyup", () => {
      isArrowKeyPressed.value = false;
    });
    function handleFocus() {
      setTimeout(() => {
        if (isArrowKeyPressed.value)
          currentElement.value?.click();
      }, 0);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        checked: checked.value,
        disabled: disabled.value,
        "as-child": "",
        focusable: !disabled.value,
        active: checked.value
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$2, mergeProps({ ..._ctx.$attrs, ...props }, {
            ref: unref(forwardRef),
            checked: checked.value,
            required: required.value,
            disabled: disabled.value,
            "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => unref(rootContext).changeModelValue(_ctx.value)),
            onSelect: _cache[1] || (_cache[1] = ($event) => emits("select", $event)),
            onKeydown: _cache[2] || (_cache[2] = withKeys(withModifiers(() => {
            }, ["prevent"]), ["enter"])),
            onFocus: handleFocus
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                checked: checked.value,
                required: required.value,
                disabled: disabled.value
              })
            ]),
            _: 3
          }, 16, ["checked", "required", "disabled"])
        ]),
        _: 3
      }, 8, ["checked", "disabled", "focusable", "active"]);
    };
  }
});

export { _sfc_main as _, injectRadioGroupItemContext as i };
//# sourceMappingURL=RadioGroupItem.js.map
