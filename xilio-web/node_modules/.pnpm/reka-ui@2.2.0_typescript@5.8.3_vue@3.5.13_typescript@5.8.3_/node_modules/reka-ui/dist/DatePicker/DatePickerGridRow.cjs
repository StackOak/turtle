'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const Calendar_CalendarGridRow = require('../Calendar/CalendarGridRow.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DatePickerGridRow",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Calendar_CalendarGridRow._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DatePickerGridRow.cjs.map
