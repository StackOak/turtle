'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const Calendar_CalendarCellTrigger = require('../Calendar/CalendarCellTrigger.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DatePickerCellTrigger",
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Calendar_CalendarCellTrigger._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx((slotProps) => [
          vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.guardReactiveProps(slotProps)))
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DatePickerCellTrigger.cjs.map
