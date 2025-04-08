'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const DateField_DateFieldInput = require('../DateField/DateFieldInput.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DatePickerInput",
  props: {
    part: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(DateField_DateFieldInput._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DatePickerInput.cjs.map
