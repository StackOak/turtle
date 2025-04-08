'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const Calendar_CalendarHeading = require('../Calendar/CalendarHeading.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DatePickerHeading",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Calendar_CalendarHeading._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(({ headingValue }) => [
          vue.renderSlot(_ctx.$slots, "default", { headingValue }, () => [
            vue.createTextVNode(vue.toDisplayString(headingValue), 1)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DatePickerHeading.cjs.map
