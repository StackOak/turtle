'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectTabsRootContext, provideTabsRootContext] = shared_createContext.createContext("TabsRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TabsRoot",
  props: {
    defaultValue: {},
    orientation: { default: "horizontal" },
    dir: {},
    activationMode: { default: "automatic" },
    modelValue: {},
    unmountOnHide: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { orientation, unmountOnHide, dir: propDir } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    shared_useForwardExpose.useForwardExpose();
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const tabsList = vue.ref();
    provideTabsRootContext({
      modelValue,
      changeModelValue: (value) => {
        modelValue.value = value;
      },
      orientation,
      dir,
      unmountOnHide,
      activationMode: props.activationMode,
      baseId: shared_useId.useId(void 0, "reka-tabs"),
      tabsList
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        dir: vue.unref(dir),
        "data-orientation": vue.unref(orientation),
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) })
        ]),
        _: 3
      }, 8, ["dir", "data-orientation", "as-child", "as"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectTabsRootContext = injectTabsRootContext;
//# sourceMappingURL=TabsRoot.cjs.map
