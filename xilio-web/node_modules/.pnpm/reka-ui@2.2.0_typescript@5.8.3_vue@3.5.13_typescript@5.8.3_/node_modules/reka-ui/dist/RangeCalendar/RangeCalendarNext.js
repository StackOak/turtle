import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createTextVNode } from 'vue';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectRangeCalendarRootContext } from './RangeCalendarRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarNext",
  props: {
    nextPage: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));
    const rootContext = injectRangeCalendarRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        "aria-label": "Next page",
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-disabled": disabled.value || void 0,
        "data-disabled": disabled.value || void 0,
        disabled: disabled.value,
        onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).nextPage(props.nextPage))
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [
            _cache[1] || (_cache[1] = createTextVNode(" Next page "))
          ])
        ]),
        _: 3
      }, 16, ["type", "aria-disabled", "data-disabled", "disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=RangeCalendarNext.js.map
