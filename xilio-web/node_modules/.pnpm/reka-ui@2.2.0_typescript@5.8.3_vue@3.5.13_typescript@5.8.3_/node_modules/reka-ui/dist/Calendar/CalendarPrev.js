import { defineComponent, computed, createBlock, openBlock, unref, withCtx, renderSlot, createTextVNode } from 'vue';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectCalendarRootContext } from './CalendarRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CalendarPrev",
  props: {
    prevPage: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));
    const rootContext = injectCalendarRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        "aria-label": "Previous page",
        as: props.as,
        "as-child": props.asChild,
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-disabled": disabled.value || void 0,
        "data-disabled": disabled.value || void 0,
        disabled: disabled.value,
        onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).prevPage(props.prevPage))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [
            _cache[1] || (_cache[1] = createTextVNode(" Prev page "))
          ])
        ]),
        _: 3
      }, 8, ["as", "as-child", "type", "aria-disabled", "data-disabled", "disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=CalendarPrev.js.map
