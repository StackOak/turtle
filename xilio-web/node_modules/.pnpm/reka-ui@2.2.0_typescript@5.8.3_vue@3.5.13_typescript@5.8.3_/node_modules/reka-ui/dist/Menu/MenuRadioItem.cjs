'use strict';

const vue = require('vue');
const Menu_utils = require('./utils.cjs');
const Menu_MenuItem = require('./MenuItem.cjs');
const Menu_MenuRadioGroup = require('./MenuRadioGroup.cjs');
const Menu_MenuItemIndicator = require('./MenuItemIndicator.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuRadioItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { value } = vue.toRefs(props);
    const radioGroupContext = Menu_MenuRadioGroup.injectMenuRadioGroupContext();
    const modelValue = vue.computed(
      () => radioGroupContext.modelValue.value === value?.value
    );
    Menu_MenuItemIndicator.provideMenuItemIndicatorContext({ modelValue });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Menu_MenuItem._sfc_main, vue.mergeProps({ role: "menuitemradio" }, props, {
        "aria-checked": modelValue.value,
        "data-state": vue.unref(Menu_utils.getCheckedState)(modelValue.value),
        onSelect: _cache[0] || (_cache[0] = async (event) => {
          emits("select", event);
          vue.unref(radioGroupContext).onValueChange(vue.unref(value));
        })
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-checked", "data-state"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenuRadioItem.cjs.map
