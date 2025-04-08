import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectCalendarRootContext } from './CalendarRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CalendarGrid",
  props: {
    asChild: { type: Boolean },
    as: { default: "table" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectCalendarRootContext();
    const disabled = computed(() => rootContext.disabled.value ? true : void 0);
    const readonly = computed(() => rootContext.readonly.value ? true : void 0);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        tabindex: "-1",
        role: "grid",
        "aria-readonly": readonly.value,
        "aria-disabled": disabled.value,
        "data-readonly": readonly.value && "",
        "data-disabled": disabled.value && ""
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-readonly", "aria-disabled", "data-readonly", "data-disabled"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=CalendarGrid.js.map
