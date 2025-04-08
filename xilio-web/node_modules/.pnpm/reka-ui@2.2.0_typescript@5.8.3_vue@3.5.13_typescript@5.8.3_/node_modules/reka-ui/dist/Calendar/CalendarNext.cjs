'use strict';

const vue = require('vue');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Calendar_CalendarRoot = require('./CalendarRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "CalendarNext",
  props: {
    nextPage: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const disabled = vue.computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));
    const rootContext = Calendar_CalendarRoot.injectCalendarRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        as: props.as,
        "as-child": props.asChild,
        "aria-label": "Next page",
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-disabled": disabled.value || void 0,
        "data-disabled": disabled.value || void 0,
        disabled: disabled.value,
        onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(rootContext).nextPage(props.nextPage))
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [
            _cache[1] || (_cache[1] = vue.createTextVNode(" Next page "))
          ])
        ]),
        _: 3
      }, 8, ["as", "as-child", "type", "aria-disabled", "data-disabled", "disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=CalendarNext.cjs.map
