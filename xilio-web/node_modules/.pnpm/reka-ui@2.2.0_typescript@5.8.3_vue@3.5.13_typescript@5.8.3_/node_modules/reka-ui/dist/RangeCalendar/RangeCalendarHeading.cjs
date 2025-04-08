'use strict';

const vue = require('vue');
const RangeCalendar_RangeCalendarRoot = require('./RangeCalendarRoot.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "RangeCalendarHeading",
  props: {
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = RangeCalendar_RangeCalendarRoot.injectRangeCalendarRootContext();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(props, {
        "data-disabled": vue.unref(rootContext).disabled.value ? "" : void 0
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            headingValue: vue.unref(rootContext).headingValue.value
          }, () => [
            vue.createTextVNode(vue.toDisplayString(vue.unref(rootContext).headingValue.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["data-disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=RangeCalendarHeading.cjs.map
