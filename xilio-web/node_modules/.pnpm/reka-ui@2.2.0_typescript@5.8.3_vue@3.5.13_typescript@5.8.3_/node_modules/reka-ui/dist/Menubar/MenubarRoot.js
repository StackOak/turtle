import { defineComponent, ref, toRefs, createBlock, openBlock, unref, withCtx, createVNode, renderSlot } from 'vue';
import { useVModel } from '@vueuse/core';
import { u as useCollection } from '../Collection/Collection.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useForwardExpose } from '../shared/useForwardExpose.js';
import { u as useDirection } from '../shared/useDirection.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusGroup.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const [injectMenubarRootContext, provideMenubarRootContext] = createContext("MenubarRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MenubarRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    dir: {},
    loop: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { forwardRef } = useForwardExpose();
    const { CollectionSlot } = useCollection({ key: "Menubar", isProvider: true });
    const modelValue = useVModel(props, "modelValue", emit, {
      defaultValue: props.defaultValue ?? "",
      passive: props.modelValue === void 0
    });
    const currentTabStopId = ref(null);
    const { dir: propDir, loop } = toRefs(props);
    const dir = useDirection(propDir);
    provideMenubarRootContext({
      modelValue,
      dir,
      loop,
      onMenuOpen: (value) => {
        modelValue.value = value;
        currentTabStopId.value = value;
      },
      onMenuClose: () => {
        modelValue.value = "";
      },
      onMenuToggle: (value) => {
        modelValue.value = modelValue.value ? "" : value;
        currentTabStopId.value = value;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionSlot), null, {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$1), {
            "current-tab-stop-id": currentTabStopId.value,
            "onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentTabStopId.value = $event),
            orientation: "horizontal",
            loop: unref(loop),
            dir: unref(dir),
            "as-child": ""
          }, {
            default: withCtx(() => [
              createVNode(unref(Primitive), {
                ref: unref(forwardRef),
                role: "menubar"
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })
                ]),
                _: 3
              }, 512)
            ]),
            _: 3
          }, 8, ["current-tab-stop-id", "loop", "dir"])
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _, injectMenubarRootContext as i };
//# sourceMappingURL=MenubarRoot.js.map
