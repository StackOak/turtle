import { defineComponent, createBlock, openBlock, unref, withCtx, renderSlot } from 'vue';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectRangeCalendarRootContext } from './RangeCalendarRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarCell",
  props: {
    date: {},
    asChild: { type: Boolean },
    as: { default: "td" }
  },
  setup(__props) {
    const rootContext = injectRangeCalendarRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        role: "gridcell",
        "aria-selected": unref(rootContext).isSelected(_ctx.date) ? true : void 0,
        "aria-disabled": unref(rootContext).isDateDisabled(_ctx.date) || unref(rootContext).isDateUnavailable?.(_ctx.date),
        "data-disabled": unref(rootContext).isDateDisabled(_ctx.date) ? "" : void 0
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-selected", "aria-disabled", "data-disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=RangeCalendarCell.js.map
