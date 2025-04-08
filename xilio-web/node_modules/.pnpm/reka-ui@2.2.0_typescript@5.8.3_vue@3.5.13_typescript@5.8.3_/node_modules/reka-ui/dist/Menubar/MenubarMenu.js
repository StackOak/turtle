import { defineComponent, ref, computed, watch, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Menu/MenuRoot.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useId } from '../shared/useId.js';
import { i as injectMenubarRootContext } from './MenubarRoot.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';

const [injectMenubarMenuContext, provideMenubarMenuContext] = createContext("MenubarMenu");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenubarMenu",
  props: {
    value: {}
  },
  setup(__props) {
    const props = __props;
    const value = useId(props.value);
    const rootContext = injectMenubarRootContext();
    useForwardExpose();
    const triggerElement = ref();
    const wasKeyboardTriggerOpenRef = ref(false);
    const open = computed(() => rootContext.modelValue.value === value);
    watch(open, () => {
      if (!open.value)
        wasKeyboardTriggerOpenRef.value = false;
    });
    provideMenubarMenuContext({
      value,
      triggerElement,
      triggerId: value,
      contentId: "",
      wasKeyboardTriggerOpenRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        open: open.value,
        modal: false,
        dir: unref(rootContext).dir.value,
        "onUpdate:open": _cache[0] || (_cache[0] = (value2) => {
          if (!value2) unref(rootContext).onMenuClose();
        })
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["open", "dir"]);
    };
  }
});

export { _sfc_main as _, injectMenubarMenuContext as i };
//# sourceMappingURL=MenubarMenu.js.map
