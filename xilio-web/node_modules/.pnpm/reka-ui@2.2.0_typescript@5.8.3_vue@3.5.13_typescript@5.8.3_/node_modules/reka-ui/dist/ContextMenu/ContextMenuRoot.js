import { defineComponent, toRefs, ref, watch, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Menu/MenuRoot.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useDirection } from '../shared/useDirection.js';

const [injectContextMenuRootContext, provideContextMenuRootContext] = createContext("ContextMenuRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ContextMenuRoot",
  props: {
    dir: {},
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { dir: propDir, modal } = toRefs(props);
    useForwardExpose();
    const dir = useDirection(propDir);
    const open = ref(false);
    const triggerElement = ref();
    provideContextMenuRootContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      dir,
      modal,
      triggerElement
    });
    watch(open, (value) => {
      emits("update:open", value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        open: open.value,
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
        dir: unref(dir),
        modal: unref(modal)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["open", "dir", "modal"]);
    };
  }
});

export { _sfc_main as _, injectContextMenuRootContext as i };
//# sourceMappingURL=ContextMenuRoot.js.map
