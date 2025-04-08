import { defineComponent, createBlock, openBlock, normalizeProps, guardReactiveProps, withCtx, renderSlot, unref } from 'vue';
import { useVModel } from '@vueuse/core';
import { _ as _sfc_main$1 } from './MenuGroup.js';
import { c as createContext } from '../shared/createContext.js';

const [injectMenuRadioGroupContext, provideMenuRadioGroupContext] = createContext("MenuRadioGroup");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenuRadioGroup",
  props: {
    modelValue: { default: "" },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits);
    provideMenuRadioGroupContext({
      modelValue,
      onValueChange: (payload) => {
        modelValue.value = payload;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _, injectMenuRadioGroupContext as i };
//# sourceMappingURL=MenuRadioGroup.js.map
