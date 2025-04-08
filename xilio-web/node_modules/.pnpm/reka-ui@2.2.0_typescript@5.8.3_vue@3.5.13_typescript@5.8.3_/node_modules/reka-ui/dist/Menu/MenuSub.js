import { defineComponent, ref, watchEffect, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { _ as _sfc_main$1 } from '../Popper/PopperRoot.js';
import { i as injectMenuContext, p as provideMenuContext } from './MenuRoot.js';
import { c as createContext } from '../shared/createContext.js';

const [injectMenuSubContext, provideMenuSubContext] = createContext("MenuSub");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenuSub",
  props: {
    open: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const open = useVModel(props, "open", emits, {
      defaultValue: false,
      passive: props.open === void 0
    });
    const parentMenuContext = injectMenuContext();
    const trigger = ref();
    const content = ref();
    watchEffect((cleanupFn) => {
      if (parentMenuContext?.open.value === false)
        open.value = false;
      cleanupFn(() => open.value = false);
    });
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
    provideMenuSubContext({
      triggerId: "",
      contentId: "",
      trigger,
      onTriggerChange: (element) => {
        trigger.value = element;
      }
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

export { _sfc_main as _, injectMenuSubContext as i };
//# sourceMappingURL=MenuSub.js.map
