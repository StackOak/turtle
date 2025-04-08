'use strict';

const vue = require('vue');
const Menu_MenuRoot = require('../Menu/MenuRoot.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');

const [injectContextMenuRootContext, provideContextMenuRootContext] = shared_createContext.createContext("ContextMenuRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ContextMenuRoot",
  props: {
    dir: {},
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { dir: propDir, modal } = vue.toRefs(props);
    shared_useForwardExpose.useForwardExpose();
    const dir = shared_useDirection.useDirection(propDir);
    const open = vue.ref(false);
    const triggerElement = vue.ref();
    provideContextMenuRootContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      dir,
      modal,
      triggerElement
    });
    vue.watch(open, (value) => {
      emits("update:open", value);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuRoot._sfc_main), {
        open: open.value,
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
        dir: vue.unref(dir),
        modal: vue.unref(modal)
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["open", "dir", "modal"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectContextMenuRootContext = injectContextMenuRootContext;
//# sourceMappingURL=ContextMenuRoot.cjs.map
