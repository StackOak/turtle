'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Popper_PopperRoot = require('../Popper/PopperRoot.cjs');
const shared_createContext = require('../shared/createContext.cjs');

const [injectPopoverRootContext, providePopoverRootContext] = shared_createContext.createContext("PopoverRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "PopoverRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    modal: { type: Boolean, default: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { modal } = vue.toRefs(props);
    const open = core.useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = vue.ref();
    const hasCustomAnchor = vue.ref(false);
    providePopoverRootContext({
      contentId: "",
      triggerId: "",
      modal,
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      triggerElement,
      hasCustomAnchor
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperRoot._sfc_main), null, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { open: vue.unref(open) })
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectPopoverRootContext = injectPopoverRootContext;
//# sourceMappingURL=PopoverRoot.cjs.map
