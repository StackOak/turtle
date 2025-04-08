import { defineComponent, ref, toRefs, renderSlot, unref } from 'vue';
import { useVModel } from '@vueuse/core';
import { c as createContext } from '../shared/createContext.js';

const [injectDialogRootContext, provideDialogRootContext] = createContext("DialogRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: false },
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = ref();
    const contentElement = ref();
    const { modal } = toRefs(props);
    provideDialogRootContext({
      open,
      modal,
      openModal: () => {
        open.value = true;
      },
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement,
      contentElement
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default", { open: unref(open) });
    };
  }
});

export { _sfc_main as _, injectDialogRootContext as i };
//# sourceMappingURL=DialogRoot.js.map
