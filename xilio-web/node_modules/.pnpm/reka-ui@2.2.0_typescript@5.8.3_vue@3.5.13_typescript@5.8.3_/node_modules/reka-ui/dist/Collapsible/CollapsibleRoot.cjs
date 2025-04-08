'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectCollapsibleRootContext, provideCollapsibleRootContext] = shared_createContext.createContext("CollapsibleRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "CollapsibleRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    disabled: { type: Boolean },
    unmountOnHide: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = core.useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const { disabled, unmountOnHide } = vue.toRefs(props);
    provideCollapsibleRootContext({
      contentId: "",
      disabled,
      open,
      unmountOnHide,
      onOpenToggle: () => {
        open.value = !open.value;
      }
    });
    __expose({ open });
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        as: _ctx.as,
        "as-child": props.asChild,
        "data-state": vue.unref(open) ? "open" : "closed",
        "data-disabled": vue.unref(disabled) ? "" : void 0
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { open: vue.unref(open) })
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-state", "data-disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectCollapsibleRootContext = injectCollapsibleRootContext;
//# sourceMappingURL=CollapsibleRoot.cjs.map
