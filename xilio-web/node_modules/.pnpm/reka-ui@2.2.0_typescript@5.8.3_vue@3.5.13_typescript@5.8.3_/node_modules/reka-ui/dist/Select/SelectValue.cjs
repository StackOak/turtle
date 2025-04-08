'use strict';

const vue = require('vue');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const Select_SelectRoot = require('./SelectRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "SelectValue",
  props: {
    placeholder: { default: "" },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    const rootContext = Select_SelectRoot.injectSelectRootContext();
    vue.onMounted(() => {
      rootContext.valueElement = currentElement;
    });
    const selectedLabel = vue.computed(() => {
      let list = [];
      const options = Array.from(rootContext.optionsSet.value);
      const getOption = (value) => options.find((option) => option.value === value);
      if (Array.isArray(rootContext.modelValue.value)) {
        list = rootContext.modelValue.value.map((value) => getOption(value)?.textContent ?? "");
      } else {
        list = [getOption(rootContext.modelValue.value)?.textContent ?? ""];
      }
      return list.filter(Boolean);
    });
    const slotText = vue.computed(() => {
      return selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref: vue.unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        style: { pointerEvents: "none" },
        "data-placeholder": selectedLabel.value.length ? void 0 : props.placeholder
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            selectedLabel: selectedLabel.value,
            modelValue: vue.unref(rootContext).modelValue.value
          }, () => [
            vue.createTextVNode(vue.toDisplayString(slotText.value), 1)
          ])
        ]),
        _: 3
      }, 8, ["as", "as-child", "data-placeholder"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=SelectValue.cjs.map
