'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const RovingFocus_RovingFocusGroup = require('../RovingFocus/RovingFocusGroup.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectMenubarRootContext, provideMenubarRootContext] = shared_createContext.createContext("MenubarRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { forwardRef } = shared_useForwardExpose.useForwardExpose();
    const { CollectionSlot } = Collection_Collection.useCollection({ key: "Menubar", isProvider: true });
    const modelValue = core.useVModel(props, "modelValue", emit, {
      defaultValue: props.defaultValue ?? "",
      passive: props.modelValue === void 0
    });
    const currentTabStopId = vue.ref(null);
    const { dir: propDir, loop } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
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
      return vue.openBlock(), vue.createBlock(vue.unref(CollectionSlot), null, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(RovingFocus_RovingFocusGroup._sfc_main), {
            "current-tab-stop-id": currentTabStopId.value,
            "onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentTabStopId.value = $event),
            orientation: "horizontal",
            loop: vue.unref(loop),
            dir: vue.unref(dir),
            "as-child": ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
                ref: vue.unref(forwardRef),
                role: "menubar"
              }, {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) })
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

exports._sfc_main = _sfc_main;
exports.injectMenubarRootContext = injectMenubarRootContext;
//# sourceMappingURL=MenubarRoot.cjs.map
