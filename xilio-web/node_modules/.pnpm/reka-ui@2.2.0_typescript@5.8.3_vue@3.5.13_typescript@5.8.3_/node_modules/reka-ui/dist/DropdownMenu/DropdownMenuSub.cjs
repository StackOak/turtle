'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Menu_MenuSub = require('../Menu/MenuSub.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DropdownMenuSub",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = core.useVModel(props, "open", emit, {
      passive: props.open === void 0,
      defaultValue: props.defaultOpen ?? false
    });
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuSub._sfc_main), {
        open: vue.unref(open),
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => vue.isRef(open) ? open.value = $event : null)
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { open: vue.unref(open) })
        ]),
        _: 3
      }, 8, ["open"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DropdownMenuSub.cjs.map
