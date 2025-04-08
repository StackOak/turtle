import { defineComponent, toRefs, ref, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { _ as _sfc_main$1 } from '../Popper/PopperRoot.js';
import { c as createContext } from '../shared/createContext.js';

const [injectPopoverRootContext, providePopoverRootContext] = createContext("PopoverRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PopoverRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    modal: { type: Boolean, default: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { modal } = toRefs(props);
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = ref();
    const hasCustomAnchor = ref(false);
    providePopoverRootContext({
      contentId: "",
      triggerId: "",
      modal,
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      triggerElement,
      hasCustomAnchor
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), null, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { open: unref(open) })
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _, injectPopoverRootContext as i };
//# sourceMappingURL=PopoverRoot.js.map
