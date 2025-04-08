import { defineComponent, ref, toRefs, createBlock, openBlock, unref, isRef, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { _ as _sfc_main$1 } from '../Menu/MenuRoot.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useDirection } from '../shared/useDirection.js';

const [injectDropdownMenuRootContext, provideDropdownMenuRootContext] = createContext("DropdownMenuRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuRoot",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean, default: void 0 },
    dir: {},
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useForwardExpose();
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = ref();
    const { modal, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    provideDropdownMenuRootContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      triggerId: "",
      triggerElement,
      contentId: "",
      modal,
      dir
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        open: unref(open),
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null),
        dir: unref(dir),
        modal: unref(modal)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { open: unref(open) })
        ]),
        _: 3
      }, 8, ["open", "dir", "modal"]);
    };
  }
});

export { _sfc_main as _, injectDropdownMenuRootContext as i };
//# sourceMappingURL=DropdownMenuRoot.js.map
