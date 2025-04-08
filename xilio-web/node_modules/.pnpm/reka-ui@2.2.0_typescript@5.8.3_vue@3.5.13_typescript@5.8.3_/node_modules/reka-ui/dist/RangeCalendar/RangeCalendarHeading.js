import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { i as injectRangeCalendarRootContext } from './RangeCalendarRoot.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarHeading",
  props: {
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectRangeCalendarRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        "data-disabled": unref(rootContext).disabled.value ? "" : void 0
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            headingValue: unref(rootContext).headingValue.value
          }, () => [
            createTextVNode(toDisplayString(unref(rootContext).headingValue.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["data-disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=RangeCalendarHeading.js.map
