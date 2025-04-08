'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const DismissableLayer_utils = require('../DismissableLayer/utils.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');

const [injectEditableRootContext, provideEditableRootContext] = shared_createContext.createContext("EditableRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "EditableRoot",
  props: {
    defaultValue: {},
    modelValue: {},
    placeholder: { default: "Enter text..." },
    dir: {},
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean },
    activationMode: { default: "focus" },
    selectOnFocus: { type: Boolean, default: false },
    submitMode: { default: "blur" },
    startWithEditMode: { type: Boolean },
    maxLength: {},
    autoResize: { type: Boolean, default: false },
    id: {},
    asChild: { type: Boolean },
    as: { default: "div" },
    name: {},
    required: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "submit", "update:state"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      id,
      name,
      defaultValue,
      startWithEditMode,
      placeholder: propPlaceholder,
      maxLength,
      disabled,
      dir: propDir,
      submitMode,
      activationMode,
      selectOnFocus,
      readonly,
      autoResize,
      required
    } = vue.toRefs(props);
    const inputRef = vue.ref();
    const dir = shared_useDirection.useDirection(propDir);
    const isEditing = vue.ref(startWithEditMode.value ?? false);
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: defaultValue.value ?? "",
      passive: props.modelValue === void 0
    });
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const isFormControl = shared_useFormControl.useFormControl(currentElement);
    const placeholder = vue.computed(() => {
      return typeof propPlaceholder.value === "string" ? { edit: propPlaceholder.value, preview: propPlaceholder.value } : propPlaceholder.value;
    });
    const inputValue = vue.ref(modelValue.value);
    vue.watch(() => modelValue.value, () => {
      inputValue.value = modelValue.value;
    }, { immediate: true, deep: true });
    function cancel() {
      isEditing.value = false;
      emits("update:state", "cancel");
    }
    function edit() {
      isEditing.value = true;
      inputValue.value = modelValue.value;
      emits("update:state", "edit");
    }
    function submit() {
      modelValue.value = inputValue.value;
      isEditing.value = false;
      emits("update:state", "submit");
      emits("submit", modelValue.value);
    }
    function handleDismiss() {
      if (isEditing.value) {
        if (submitMode.value === "blur" || submitMode.value === "both")
          submit();
        else
          cancel();
      }
    }
    const pointerDownOutside = DismissableLayer_utils.usePointerDownOutside(() => handleDismiss(), currentElement);
    const focusOutside = DismissableLayer_utils.useFocusOutside(() => handleDismiss(), currentElement);
    const isEmpty = vue.computed(() => modelValue.value === "");
    __expose({
      /** Function to submit the value of the editable */
      submit,
      /** Function to cancel the value of the editable */
      cancel,
      /** Function to set the editable in edit mode */
      edit
    });
    provideEditableRootContext({
      id,
      name,
      disabled,
      isEditing,
      maxLength,
      modelValue,
      inputValue,
      placeholder,
      edit,
      cancel,
      submit,
      activationMode,
      submitMode,
      selectOnFocus,
      inputRef,
      startWithEditMode,
      isEmpty,
      readonly,
      autoResize
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        as: _ctx.as,
        "as-child": _ctx.asChild,
        dir: vue.unref(dir),
        "data-dismissable-layer": "",
        onFocusCapture: vue.unref(focusOutside).onFocusCapture,
        onBlurCapture: vue.unref(focusOutside).onBlurCapture,
        onPointerdownCapture: vue.unref(pointerDownOutside).onPointerDownCapture
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            modelValue: vue.unref(modelValue),
            isEditing: isEditing.value,
            isEmpty: isEmpty.value,
            submit,
            cancel,
            edit
          }),
          vue.unref(isFormControl) && vue.unref(name) ? (vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHiddenInput._sfc_main), {
            key: 0,
            type: "text",
            value: vue.unref(modelValue),
            name: vue.unref(name),
            disabled: vue.unref(disabled),
            required: vue.unref(required)
          }, null, 8, ["value", "name", "disabled", "required"])) : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["as", "as-child", "dir", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectEditableRootContext = injectEditableRootContext;
//# sourceMappingURL=EditableRoot.cjs.map
