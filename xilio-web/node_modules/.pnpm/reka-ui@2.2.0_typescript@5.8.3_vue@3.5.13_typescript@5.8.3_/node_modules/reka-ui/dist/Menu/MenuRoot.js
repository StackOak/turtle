import { defineComponent, toRefs, ref, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { _ as _sfc_main$1 } from '../Popper/PopperRoot.js';
import { u as useIsUsingKeyboard } from '../shared/useIsUsingKeyboard.js';
import { u as useDirection } from '../shared/useDirection.js';
import { c as createContext } from '../shared/createContext.js';

const [injectMenuContext, provideMenuContext] = createContext(["MenuRoot", "MenuSub"], "MenuContext");
const [injectMenuRootContext, provideMenuRootContext] = createContext("MenuRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenuRoot",
  props: {
    open: { type: Boolean, default: false },
    dir: {},
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { modal, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    const open = useVModel(props, "open", emits);
    const content = ref();
    const isUsingKeyboardRef = useIsUsingKeyboard();
    provideMenuContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      content,
      onContentChange: (element) => {
        content.value = element;
      }
    });
    provideMenuRootContext({
      onClose: () => {
        open.value = false;
      },
      isUsingKeyboardRef,
      dir,
      modal
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), null, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _, injectMenuRootContext as a, injectMenuContext as i, provideMenuContext as p };
//# sourceMappingURL=MenuRoot.js.map
