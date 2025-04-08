'use strict';

const vue = require('vue');
require('@floating-ui/vue');
const RangeCalendar_RangeCalendarHeading = require('../RangeCalendar/RangeCalendarHeading.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "DateRangePickerHeading",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RangeCalendar_RangeCalendarHeading._sfc_main), vue.normalizeProps(vue.guardReactiveProps(props)), {
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
//# sourceMappingURL=DateRangePickerHeading.cjs.map
