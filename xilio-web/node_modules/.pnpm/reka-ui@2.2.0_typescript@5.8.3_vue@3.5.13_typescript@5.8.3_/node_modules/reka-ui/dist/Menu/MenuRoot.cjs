'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Popper_PopperRoot = require('../Popper/PopperRoot.cjs');
const shared_useIsUsingKeyboard = require('../shared/useIsUsingKeyboard.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_createContext = require('../shared/createContext.cjs');

const [injectMenuContext, provideMenuContext] = shared_createContext.createContext(["MenuRoot", "MenuSub"], "MenuContext");
const [injectMenuRootContext, provideMenuRootContext] = shared_createContext.createContext("MenuRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { modal, dir: propDir } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    const open = core.useVModel(props, "open", emits);
    const content = vue.ref();
    const isUsingKeyboardRef = shared_useIsUsingKeyboard.useIsUsingKeyboard();
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
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperRoot._sfc_main), null, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectMenuContext = injectMenuContext;
exports.injectMenuRootContext = injectMenuRootContext;
exports.provideMenuContext = provideMenuContext;
//# sourceMappingURL=MenuRoot.cjs.map
