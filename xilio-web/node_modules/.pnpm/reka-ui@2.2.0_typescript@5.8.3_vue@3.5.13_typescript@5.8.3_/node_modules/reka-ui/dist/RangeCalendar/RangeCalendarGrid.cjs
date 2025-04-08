'use strict';

const vue = require('vue');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const RangeCalendar_RangeCalendarRoot = require('./RangeCalendarRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "RangeCalendarGrid",
  props: {
    asChild: { type: Boolean },
    as: { default: "table" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = RangeCalendar_RangeCalendarRoot.injectRangeCalendarRootContext();
    const disabled = vue.computed(() => rootContext.disabled.value ? true : void 0);
    const readonly = vue.computed(() => rootContext.readonly.value ? true : void 0);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        tabindex: "-1",
        role: "grid",
        "aria-readonly": readonly.value,
        "aria-disabled": disabled.value,
        "data-readonly": readonly.value && "",
        "data-disabled": disabled.value && ""
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-readonly", "aria-disabled", "data-readonly", "data-disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=RangeCalendarGrid.cjs.map
