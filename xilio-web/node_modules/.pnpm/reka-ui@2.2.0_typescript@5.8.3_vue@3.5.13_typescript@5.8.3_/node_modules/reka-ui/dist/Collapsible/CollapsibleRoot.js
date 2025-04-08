import { defineComponent, toRefs, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectCollapsibleRootContext, provideCollapsibleRootContext] = createContext("CollapsibleRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    disabled: { type: Boolean },
    unmountOnHide: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const { disabled, unmountOnHide } = toRefs(props);
    provideCollapsibleRootContext({
      contentId: "",
      disabled,
      open,
      unmountOnHide,
      onOpenToggle: () => {
        open.value = !open.value;
      }
    });
    __expose({ open });
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": props.asChild,
        "data-state": unref(open) ? "open" : "closed",
        "data-disabled": unref(disabled) ? "" : void 0
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { open: unref(open) })
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-state", "data-disabled"]);
    };
  }
});

export { _sfc_main as _, injectCollapsibleRootContext as i };
//# sourceMappingURL=CollapsibleRoot.js.map
