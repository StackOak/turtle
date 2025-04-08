'use strict';

const vue = require('vue');
const TagsInput_TagsInputRoot = require('./TagsInputRoot.cjs');
const shared_useForwardExpose = require('../shared/useForwardExpose.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TagsInputInput",
  props: {
    placeholder: {},
    autoFocus: { type: Boolean },
    maxLength: {},
    asChild: { type: Boolean },
    as: { default: "input" }
  },
  setup(__props) {
    const props = __props;
    const context = TagsInput_TagsInputRoot.injectTagsInputRootContext();
    const { forwardRef, currentElement } = shared_useForwardExpose.useForwardExpose();
    function handleBlur(event) {
      if (!context.addOnBlur.value)
        return;
      const target = event.target;
      if (!target.value)
        return;
      const isAdded = context.onAddValue(target.value);
      if (isAdded)
        target.value = "";
    }
    function handleTab(event) {
      if (!context.addOnTab.value)
        return;
      handleCustomKeydown(event);
    }
    const isComposing = vue.ref(false);
    function onCompositionStart() {
      isComposing.value = true;
    }
    function onCompositionEnd() {
      requestAnimationFrame(() => {
        isComposing.value = false;
      });
    }
    async function handleCustomKeydown(event) {
      if (isComposing.value)
        return;
      await vue.nextTick();
      if (event.defaultPrevented)
        return;
      const target = event.target;
      if (!target.value)
        return;
      const isAdded = context.onAddValue(target.value);
      if (isAdded)
        target.value = "";
      event.preventDefault();
    }
    function handleInput(event) {
      context.isInvalidInput.value = false;
      if (event.data === null)
        return;
      const delimiter = context.delimiter.value;
      const matchesDelimiter = delimiter === event.data || delimiter instanceof RegExp && delimiter.test(event.data);
      if (matchesDelimiter) {
        const target = event.target;
        target.value = target.value.replace(delimiter, "");
        const isAdded = context.onAddValue(target.value);
        if (isAdded)
          target.value = "";
      }
    }
    function handlePaste(event) {
      if (context.addOnPaste.value) {
        event.preventDefault();
        const clipboardData = event.clipboardData;
        if (!clipboardData)
          return;
        const value = clipboardData.getData("text");
        if (context.delimiter.value) {
          const splitValue = value.split(context.delimiter.value);
          splitValue.forEach((v) => {
            context.onAddValue(v);
          });
        } else {
          context.onAddValue(value);
        }
      }
    }
    vue.onMounted(() => {
      const inputEl = currentElement.value.nodeName === "INPUT" ? currentElement.value : currentElement.value.querySelector("input");
      if (!inputEl)
        return;
      setTimeout(() => {
        if (props.autoFocus)
          inputEl?.focus();
      }, 1);
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        id: vue.unref(context).id?.value,
        ref: vue.unref(forwardRef),
        type: "text",
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        maxlength: _ctx.maxLength,
        placeholder: _ctx.placeholder,
        disabled: vue.unref(context).disabled.value,
        "data-invalid": vue.unref(context).isInvalidInput.value ? "" : void 0,
        onInput: handleInput,
        onKeydown: [
          vue.withKeys(handleCustomKeydown, ["enter"]),
          vue.withKeys(handleTab, ["tab"]),
          vue.unref(context).onInputKeydown
        ],
        onBlur: handleBlur,
        onCompositionstart: onCompositionStart,
        onCompositionend: onCompositionEnd,
        onPaste: handlePaste
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "as", "as-child", "maxlength", "placeholder", "disabled", "data-invalid", "onKeydown"]);
    };
  }
});

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TagsInputInput.cjs.map
