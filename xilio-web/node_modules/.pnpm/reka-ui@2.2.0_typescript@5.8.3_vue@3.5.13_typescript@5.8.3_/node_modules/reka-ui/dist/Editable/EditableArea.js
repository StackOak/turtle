import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { i as injectEditableRootContext } from './EditableRoot.js';
import { P as Primitive } from '../Primitive/Primitive.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EditableArea",
  props: {
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(__props) {
    const props = __props;
    const context = injectEditableRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        "data-placeholder-shown": unref(context).isEditing.value ? void 0 : "",
        "data-focus": unref(context).isEditing.value ? "" : void 0,
        "data-focused": unref(context).isEditing.value ? "" : void 0,
        "data-empty": unref(context).isEmpty.value ? "" : void 0,
        "data-readonly": unref(context).readonly.value ? "" : void 0,
        "data-disabled": unref(context).disabled.value ? "" : void 0,
        style: unref(context).autoResize.value ? { display: "inline-grid" } : void 0
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-placeholder-shown", "data-focus", "data-focused", "data-empty", "data-readonly", "data-disabled", "style"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=EditableArea.js.map
