'use strict';

const vue = require('vue');
const shared_useSingleOrMultipleValue = require('../shared/useSingleOrMultipleValue.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const [injectAccordionRootContext, provideAccordionRootContext] = shared_createContext.createContext("AccordionRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "AccordionRoot",
  props: {
    collapsible: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    dir: {},
    orientation: { default: "vertical" },
    unmountOnHide: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {},
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { dir, disabled, unmountOnHide } = vue.toRefs(props);
    const direction = shared_useDirection.useDirection(dir);
    const { modelValue, changeModelValue, isSingle } = shared_useSingleOrMultipleValue.useSingleOrMultipleValue(props, emits);
    const { forwardRef, currentElement: parentElement } = shared_useForwardExpose.useForwardExpose();
    provideAccordionRootContext({
      disabled,
      direction,
      orientation: props.orientation,
      parentElement,
      isSingle,
      collapsible: props.collapsible,
      modelValue,
      changeModelValue,
      unmountOnHide
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) })
        ]),
        _: 3
      }, 8, ["as-child", "as"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectAccordionRootContext = injectAccordionRootContext;
//# sourceMappingURL=AccordionRoot.cjs.map
