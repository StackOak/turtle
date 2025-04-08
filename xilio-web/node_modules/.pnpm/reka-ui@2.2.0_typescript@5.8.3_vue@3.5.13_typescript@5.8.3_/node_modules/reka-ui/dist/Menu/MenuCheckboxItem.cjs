'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Menu_utils = require('./utils.cjs');
const Menu_MenuItem = require('./MenuItem.cjs');
const Menu_MenuItemIndicator = require('./MenuItemIndicator.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenuCheckboxItem",
  props: {
    modelValue: { type: [Boolean, String], default: false },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["select", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = core.useVModel(props, "modelValue", emits);
    Menu_MenuItemIndicator.provideMenuItemIndicatorContext({ modelValue });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(Menu_MenuItem._sfc_main, vue.mergeProps({ role: "menuitemcheckbox" }, props, {
        "aria-checked": vue.unref(Menu_utils.isIndeterminate)(vue.unref(modelValue)) ? "mixed" : vue.unref(modelValue),
        "data-state": vue.unref(Menu_utils.getCheckedState)(vue.unref(modelValue)),
        onSelect: _cache[0] || (_cache[0] = async (event) => {
          emits("select", event);
          if (vue.unref(Menu_utils.isIndeterminate)(vue.unref(modelValue))) {
            modelValue.value = true;
          } else {
            modelValue.value = !vue.unref(modelValue);
          }
        })
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) })
        ]),
        _: 3
      }, 16, ["aria-checked", "data-state"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenuCheckboxItem.cjs.map
