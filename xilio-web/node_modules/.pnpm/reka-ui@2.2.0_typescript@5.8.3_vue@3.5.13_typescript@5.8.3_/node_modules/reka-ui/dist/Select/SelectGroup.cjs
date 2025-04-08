'use strict';

const vue = require('vue');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useId = require('../shared/useId.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectSelectGroupContext, provideSelectGroupContext] = shared_createContext.createContext("SelectGroup");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectGroup",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const id = shared_useId.useId(void 0, "reka-select-group");
    provideSelectGroupContext({ id });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({ role: "group" }, props, { "aria-labelledby": vue.unref(id) }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-labelledby"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectSelectGroupContext = injectSelectGroupContext;
//# sourceMappingURL=SelectGroup.cjs.map
