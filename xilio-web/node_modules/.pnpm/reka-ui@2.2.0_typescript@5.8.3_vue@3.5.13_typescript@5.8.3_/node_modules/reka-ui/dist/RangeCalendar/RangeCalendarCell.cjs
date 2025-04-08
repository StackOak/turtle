'use strict';

const vue = require('vue');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const RangeCalendar_RangeCalendarRoot = require('./RangeCalendarRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "RangeCalendarCell",
  props: {
    date: {},
    asChild: { type: Boolean },
    as: { default: "td" }
  },
  setup(__props) {
    const rootContext = RangeCalendar_RangeCalendarRoot.injectRangeCalendarRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        role: "gridcell",
        "aria-selected": vue.unref(rootContext).isSelected(_ctx.date) ? true : void 0,
        "aria-disabled": vue.unref(rootContext).isDateDisabled(_ctx.date) || vue.unref(rootContext).isDateUnavailable?.(_ctx.date),
        "data-disabled": vue.unref(rootContext).isDateDisabled(_ctx.date) ? "" : void 0
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-selected", "aria-disabled", "data-disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=RangeCalendarCell.cjs.map
