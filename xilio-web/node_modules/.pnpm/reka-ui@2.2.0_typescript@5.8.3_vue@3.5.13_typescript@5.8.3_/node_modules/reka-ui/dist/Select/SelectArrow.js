import { defineComponent, createBlock, createCommentVNode, unref, openBlock, normalizeProps, mergeProps, withCtx, renderSlot } from 'vue';
import { _ as _sfc_main$1 } from '../Popper/PopperArrow.js';
import { i as injectSelectRootContext } from './SelectRoot.js';
import { i as injectSelectContentContext, S as SelectContentDefaultContextValue } from './SelectContentImpl.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectArrow",
  props: {
    width: { default: 10 },
    height: { default: 5 },
    rounded: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "svg" }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectSelectRootContext();
    const contentContext = injectSelectContentContext(SelectContentDefaultContextValue);
    return (_ctx, _cache) => {
      return unref(rootContext).open.value && unref(contentContext).position === "popper" ? (openBlock(), createBlock(unref(_sfc_main$1), normalizeProps(mergeProps({ key: 0 }, props)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)) : createCommentVNode("", true);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=SelectArrow.js.map
