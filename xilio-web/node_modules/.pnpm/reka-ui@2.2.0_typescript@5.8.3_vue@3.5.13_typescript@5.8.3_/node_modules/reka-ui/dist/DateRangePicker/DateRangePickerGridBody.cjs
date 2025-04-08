'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const RangeCalendar_RangeCalendarGridBody = require('../RangeCalendar/RangeCalendarGridBody.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DateRangePickerGridBody",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RangeCalendar_RangeCalendarGridBody._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=DateRangePickerGridBody.cjs.map
