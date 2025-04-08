import { defineComponent, toRefs, computed, createBlock, openBlock, mergeProps, unref, withCtx, renderSlot } from 'vue';
import { a as getCheckedState } from './utils.js';
import { _ as _sfc_main$1 } from './MenuItem.js';
import { i as injectMenuRadioGroupContext } from './MenuRadioGroup.js';
import { p as provideMenuItemIndicatorContext } from './MenuItemIndicator.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenuRadioItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { value } = toRefs(props);
    const radioGroupContext = injectMenuRadioGroupContext();
    const modelValue = computed(
      () => radioGroupContext.modelValue.value === value?.value
    );
    provideMenuItemIndicatorContext({ modelValue });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, mergeProps({ role: "menuitemradio" }, props, {
        "aria-checked": modelValue.value,
        "data-state": unref(getCheckedState)(modelValue.value),
        onSelect: _cache[0] || (_cache[0] = async (event) => {
          emits("select", event);
          unref(radioGroupContext).onValueChange(unref(value));
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-checked", "data-state"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=MenuRadioItem.js.map
