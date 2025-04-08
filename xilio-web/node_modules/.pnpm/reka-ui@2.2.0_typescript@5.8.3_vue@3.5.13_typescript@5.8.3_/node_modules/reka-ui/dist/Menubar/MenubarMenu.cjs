'use strict';

const vue = require('vue');
const Menu_MenuRoot = require('../Menu/MenuRoot.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useId = require('../shared/useId.cjs');
const Menubar_MenubarRoot = require('./MenubarRoot.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');

const [injectMenubarMenuContext, provideMenubarMenuContext] = shared_createContext.createContext("MenubarMenu");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenubarMenu",
  props: {
    value: {}
  },
  setup(__props) {
    const props = __props;
    const value = shared_useId.useId(props.value);
    const rootContext = Menubar_MenubarRoot.injectMenubarRootContext();
    shared_useForwardExpose.useForwardExpose();
    const triggerElement = vue.ref();
    const wasKeyboardTriggerOpenRef = vue.ref(false);
    const open = vue.computed(() => rootContext.modelValue.value === value);
    vue.watch(open, () => {
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
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuRoot._sfc_main), {
        open: open.value,
        modal: false,
        dir: vue.unref(rootContext).dir.value,
        "onUpdate:open": _cache[0] || (_cache[0] = (value2) => {
          if (!value2) vue.unref(rootContext).onMenuClose();
        })
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["open", "dir"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectMenubarMenuContext = injectMenubarMenuContext;
//# sourceMappingURL=MenubarMenu.cjs.map
