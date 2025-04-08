'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Popper_PopperRoot = require('../Popper/PopperRoot.cjs');
const Menu_MenuRoot = require('./MenuRoot.cjs');
const shared_createContext = require('../shared/createContext.cjs');

const [injectMenuSubContext, provideMenuSubContext] = shared_createContext.createContext("MenuSub");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuSub",
  props: {
    open: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const open = core.useVModel(props, "open", emits, {
      defaultValue: false,
      passive: props.open === void 0
    });
    const parentMenuContext = Menu_MenuRoot.injectMenuContext();
    const trigger = vue.ref();
    const content = vue.ref();
    vue.watchEffect((cleanupFn) => {
      if (parentMenuContext?.open.value === false)
        open.value = false;
      cleanupFn(() => open.value = false);
    });
    Menu_MenuRoot.provideMenuContext({
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
exports.injectMenuSubContext = injectMenuSubContext;
//# sourceMappingURL=MenuSub.cjs.map
