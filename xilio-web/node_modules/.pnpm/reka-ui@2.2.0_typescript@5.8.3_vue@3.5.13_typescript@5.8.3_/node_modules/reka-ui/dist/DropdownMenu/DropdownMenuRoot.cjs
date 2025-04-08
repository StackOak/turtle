'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Menu_MenuRoot = require('../Menu/MenuRoot.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');

const [injectDropdownMenuRootContext, provideDropdownMenuRootContext] = shared_createContext.createContext("DropdownMenuRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DropdownMenuRoot",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean, default: void 0 },
    dir: {},
    modal: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    shared_useForwardExpose.useForwardExpose();
    const open = core.useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = vue.ref();
    const { modal, dir: propDir } = vue.toRefs(props);
    const dir = shared_useDirection.useDirection(propDir);
    provideDropdownMenuRootContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      triggerId: "",
      triggerElement,
      contentId: "",
      modal,
      dir
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuRoot._sfc_main), {
        open: vue.unref(open),
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => vue.isRef(open) ? open.value = $event : null),
        dir: vue.unref(dir),
        modal: vue.unref(modal)
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { open: vue.unref(open) })
        ]),
        _: 3
      }, 8, ["open", "dir", "modal"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectDropdownMenuRootContext = injectDropdownMenuRootContext;
//# sourceMappingURL=DropdownMenuRoot.cjs.map
