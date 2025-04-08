'use strict';

const vue = require('vue');
const Menu_utils = require('./utils.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const Presence_Presence = require('../Presence/Presence.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext] = shared_createContext.createContext(
  ["MenuCheckboxItem", "MenuRadioItem"],
  "MenuItemIndicatorContext"
);
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuItemIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const indicatorContext = injectMenuItemIndicatorContext({
      modelValue: vue.ref(false)
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Presence_Presence.Presence), {
        present: _ctx.forceMount || vue.unref(Menu_utils.isIndeterminate)(vue.unref(indicatorContext).modelValue.value) || vue.unref(indicatorContext).modelValue.value === true
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "data-state": vue.unref(Menu_utils.getCheckedState)(vue.unref(indicatorContext).modelValue.value)
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["as", "as-child", "data-state"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.provideMenuItemIndicatorContext = provideMenuItemIndicatorContext;
//# sourceMappingURL=MenuItemIndicator.cjs.map
