import { defineComponent, toRefs, ref, computed, watch, createBlock, openBlock, unref, mergeProps, withCtx, renderSlot, createCommentVNode } from 'vue';
import { useVModel } from '@vueuse/core';
import { u as usePointerDownOutside, a as useFocusOutside } from '../DismissableLayer/utils.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { _ as _sfc_main$1 } from '../VisuallyHidden/VisuallyHiddenInput.js';

const [injectEditableRootContext, provideEditableRootContext] = createContext("EditableRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    } = toRefs(props);
    const inputRef = ref();
    const dir = useDirection(propDir);
    const isEditing = ref(startWithEditMode.value ?? false);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: defaultValue.value ?? "",
      passive: props.modelValue === void 0
    });
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const isFormControl = useFormControl(currentElement);
    const placeholder = computed(() => {
      return typeof propPlaceholder.value === "string" ? { edit: propPlaceholder.value, preview: propPlaceholder.value } : propPlaceholder.value;
    });
    const inputValue = ref(modelValue.value);
    watch(() => modelValue.value, () => {
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
    const pointerDownOutside = usePointerDownOutside(() => handleDismiss(), currentElement);
    const focusOutside = useFocusOutside(() => handleDismiss(), currentElement);
    const isEmpty = computed(() => modelValue.value === "");
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
      return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        as: _ctx.as,
        "as-child": _ctx.asChild,
        dir: unref(dir),
        "data-dismissable-layer": "",
        onFocusCapture: unref(focusOutside).onFocusCapture,
        onBlurCapture: unref(focusOutside).onBlurCapture,
        onPointerdownCapture: unref(pointerDownOutside).onPointerDownCapture
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            modelValue: unref(modelValue),
            isEditing: isEditing.value,
            isEmpty: isEmpty.value,
            submit,
            cancel,
            edit
          }),
          unref(isFormControl) && unref(name) ? (openBlock(), createBlock(unref(_sfc_main$1), {
            key: 0,
            type: "text",
            value: unref(modelValue),
            name: unref(name),
            disabled: unref(disabled),
            required: unref(required)
          }, null, 8, ["value", "name", "disabled", "required"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["as", "as-child", "dir", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]);
    };
  }
});

export { _sfc_main as _, injectEditableRootContext as i };
//# sourceMappingURL=EditableRoot.js.map
