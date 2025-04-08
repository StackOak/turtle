'use strict';

const vue = require('vue');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_useKbd = require('../shared/useKbd.cjs');
const Editable_EditableRoot = require('./EditableRoot.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "EditableInput",
  props: {
    asChild: { type: Boolean },
    as: { default: "input" }
  },
  setup(__props) {
    const props = __props;
    const kbd = shared_useKbd.useKbd();
    const context = Editable_EditableRoot.injectEditableRootContext();
    const disabled = vue.computed(() => context.disabled.value);
    const placeholder = vue.computed(() => context.placeholder.value?.edit);
    const { primitiveElement, currentElement: inputRef } = Primitive_usePrimitiveElement.usePrimitiveElement();
    vue.onMounted(() => {
      context.inputRef.value = inputRef.value;
      if (context.startWithEditMode.value) {
        context.inputRef.value?.focus({ preventScroll: true });
        if (context.selectOnFocus.value)
          context.inputRef.value?.select();
      }
    });
    vue.watch(context.isEditing, (value) => {
      if (value) {
        vue.nextTick(() => {
          context.inputRef.value?.focus({ preventScroll: true });
          if (context.selectOnFocus.value)
            context.inputRef.value?.select();
        });
      }
    });
    function handleSubmitKeyDown(event) {
      if ((context.submitMode.value === "enter" || context.submitMode.value === "both") && event.key === kbd.ENTER && !event.shiftKey && !event.metaKey)
        context.submit();
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement
      }, props, {
        value: vue.unref(context).inputValue.value,
        placeholder: placeholder.value,
        disabled: disabled.value,
        maxlength: vue.unref(context).maxLength.value,
        "data-disabled": disabled.value ? "" : void 0,
        "data-readonly": vue.unref(context).readonly.value ? "" : void 0,
        readonly: vue.unref(context).readonly.value,
        "aria-label": "editable input",
        hidden: vue.unref(context).autoResize.value ? void 0 : !vue.unref(context).isEditing.value,
        style: vue.unref(context).autoResize.value ? { all: "unset", gridArea: "1 / 1 / auto / auto", visibility: !vue.unref(context).isEditing.value ? "hidden" : void 0 } : void 0,
        onInput: _cache[0] || (_cache[0] = ($event) => vue.unref(context).inputValue.value = $event.target.value),
        onKeydown: [
          vue.withKeys(handleSubmitKeyDown, ["enter", "space"]),
          vue.withKeys(vue.unref(context).cancel, ["esc"])
        ]
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["value", "placeholder", "disabled", "maxlength", "data-disabled", "data-readonly", "readonly", "hidden", "style", "onKeydown"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=EditableInput.cjs.map
