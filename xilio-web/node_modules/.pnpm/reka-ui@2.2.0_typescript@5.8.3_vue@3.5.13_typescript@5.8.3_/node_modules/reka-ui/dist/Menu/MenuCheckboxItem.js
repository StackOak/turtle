import { defineComponent, createBlock, openBlock, mergeProps, unref, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { i as isIndeterminate, a as getCheckedState } from './utils.js';
import { _ as _sfc_main$1 } from './MenuItem.js';
import { p as provideMenuItemIndicatorContext } from './MenuItemIndicator.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenuCheckboxItem",
  props: {
    modelValue: { type: [Boolean, String], default: false },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits);
    provideMenuItemIndicatorContext({ modelValue });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, mergeProps({ role: "menuitemcheckbox" }, props, {
        "aria-checked": unref(isIndeterminate)(unref(modelValue)) ? "mixed" : unref(modelValue),
        "data-state": unref(getCheckedState)(unref(modelValue)),
        onSelect: _cache[0] || (_cache[0] = async (event) => {
          emits("select", event);
          if (unref(isIndeterminate)(unref(modelValue))) {
            modelValue.value = true;
          } else {
            modelValue.value = !unref(modelValue);
          }
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })
        ]),
        _: 3
      }, 16, ["aria-checked", "data-state"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=MenuCheckboxItem.js.map
