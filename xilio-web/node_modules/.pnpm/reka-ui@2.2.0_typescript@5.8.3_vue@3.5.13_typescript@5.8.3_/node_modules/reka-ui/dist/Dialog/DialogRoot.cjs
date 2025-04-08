'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const shared_createContext = require('../shared/createContext.cjs');

const [injectDialogRootContext, provideDialogRootContext] = shared_createContext.createContext("DialogRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: false },
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = core.useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = vue.ref();
    const contentElement = vue.ref();
    const { modal } = vue.toRefs(props);
    provideDialogRootContext({
      open,
      modal,
      openModal: () => {
        open.value = true;
      },
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement,
      contentElement
    });
    return (_ctx, _cache) => {
      return vue.renderSlot(_ctx.$slots, "default", { open: vue.unref(open) });
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectDialogRootContext = injectDialogRootContext;
//# sourceMappingURL=DialogRoot.cjs.map
