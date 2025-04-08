import { defineComponent, ref, createBlock, openBlock, unref, withCtx, createVNode, renderSlot } from 'vue';
import { i as isIndeterminate, a as getCheckedState } from './utils.js';
import { c as createContext } from '../shared/createContext.js';
import { P as Presence } from '../Presence/Presence.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext] = createContext(
  ["MenuCheckboxItem", "MenuRadioItem"],
  "MenuItemIndicatorContext"
);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenuItemIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const indicatorContext = injectMenuItemIndicatorContext({
      modelValue: ref(false)
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(isIndeterminate)(unref(indicatorContext).modelValue.value) || unref(indicatorContext).modelValue.value === true
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "data-state": unref(getCheckedState)(unref(indicatorContext).modelValue.value)
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "as-child", "data-state"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

export { _sfc_main as _, provideMenuItemIndicatorContext as p };
//# sourceMappingURL=MenuItemIndicator.js.map
