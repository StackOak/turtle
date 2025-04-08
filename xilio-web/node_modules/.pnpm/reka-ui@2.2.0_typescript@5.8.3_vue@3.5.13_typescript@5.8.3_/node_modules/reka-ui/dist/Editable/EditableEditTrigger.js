import { defineComponent, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createTextVNode } from 'vue';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectEditableRootContext } from './EditableRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EditableEditTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const context = injectEditableRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        "aria-label": "edit",
        "aria-disabled": unref(context).disabled.value ? "" : void 0,
        "data-disabled": unref(context).disabled.value ? "" : void 0,
        disabled: unref(context).disabled.value,
        type: _ctx.as === "button" ? "button" : void 0,
        hidden: unref(context).isEditing.value ? "" : void 0,
        onClick: unref(context).edit
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            _cache[0] || (_cache[0] = createTextVNode("Edit"))
          ])
        ]),
        _: 3
      }, 16, ["aria-disabled", "data-disabled", "disabled", "type", "hidden", "onClick"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=EditableEditTrigger.js.map
