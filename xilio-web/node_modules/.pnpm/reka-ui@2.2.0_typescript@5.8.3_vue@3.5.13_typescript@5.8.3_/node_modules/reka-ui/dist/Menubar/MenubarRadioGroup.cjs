'use strict';

const vue = require('vue');
const Menu_MenuRadioGroup = require('../Menu/MenuRadioGroup.cjs');
const shared_useEmitAsProps = require('../shared/useEmitAsProps.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "MenubarRadioGroup",
  props: {
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const emitsAsProps = shared_useEmitAsProps.useEmitAsProps(emits);
    shared_useForwardExpose.useForwardExpose();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Menu_MenuRadioGroup._sfc_main), vue.normalizeProps(vue.guardReactiveProps({ ...props, ...vue.unref(emitsAsProps) })), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=MenubarRadioGroup.cjs.map
