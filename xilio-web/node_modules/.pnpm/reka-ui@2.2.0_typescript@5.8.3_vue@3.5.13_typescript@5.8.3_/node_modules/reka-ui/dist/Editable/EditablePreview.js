import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { P as Primitive } from '../Primitive/Primitive.js';
import { i as injectEditableRootContext } from './EditableRoot.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EditablePreview",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const context = injectEditableRootContext();
    const placeholder = computed(() => context.placeholder.value?.preview);
    function handleFocus() {
      if (context.activationMode.value === "focus")
        context.edit();
    }
    function handleDoubleClick() {
      if (context.activationMode.value === "dblclick")
        context.edit();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        tabindex: "0",
        "data-placeholder-shown": unref(context).isEditing.value ? void 0 : "",
        hidden: unref(context).autoResize.value ? void 0 : unref(context).isEditing.value,
        style: unref(context).autoResize.value ? {
          whiteSpace: "pre",
          userSelect: "none",
          gridArea: "1 / 1 / auto / auto",
          visibility: unref(context).isEditing.value ? "hidden" : void 0,
          overflow: "hidden",
          textOverflow: "ellipsis"
        } : void 0,
        onFocusin: handleFocus,
        onDblclick: handleDoubleClick
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(unref(context).modelValue.value || placeholder.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["data-placeholder-shown", "hidden", "style"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=EditablePreview.js.map
