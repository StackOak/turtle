import { defineComponent, createBlock, openBlock, unref, normalizeProps, guardReactiveProps, withCtx, renderSlot, createTextVNode, toDisplayString } from 'vue';
import '@floating-ui/vue';
import { _ as _sfc_main$1 } from '../RangeCalendar/RangeCalendarHeading.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DateRangePickerHeading",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(({ headingValue }) => [
          renderSlot(_ctx.$slots, "default", { headingValue }, () => [
            createTextVNode(toDisplayString(headingValue), 1)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=DateRangePickerHeading.js.map
