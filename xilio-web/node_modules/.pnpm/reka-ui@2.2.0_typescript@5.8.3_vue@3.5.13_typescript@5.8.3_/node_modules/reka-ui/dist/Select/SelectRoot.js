import { defineComponent, toRefs, ref, computed, createBlock, openBlock, unref, withCtx, renderSlot, createCommentVNode, createElementBlock, Fragment, renderList, mergeProps } from 'vue';
import { _ as _sfc_main$2 } from './BubbleSelect.js';
import { _ as _sfc_main$1 } from '../Popper/PopperRoot.js';
import { useVModel } from '@vueuse/core';
import { c as compare } from './utils.js';
import { u as useCollection } from '../Collection/Collection.js';
import { c as createContext } from '../shared/createContext.js';
import { u as useDirection } from '../shared/useDirection.js';
import { u as useFormControl } from '../shared/useFormControl.js';
import { i as isNullish } from '../shared/nullish.js';

const _hoisted_1 = {
  key: 0,
  value: ""
};
const [injectSelectRootContext, provideSelectRootContext] = createContext("SelectRoot");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SelectRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean },
    defaultValue: {},
    modelValue: { default: void 0 },
    by: {},
    dir: {},
    multiple: { type: Boolean },
    autocomplete: {},
    disabled: { type: Boolean },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { required, disabled, multiple, dir: propDir } = toRefs(props);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: props.modelValue === void 0,
      deep: true
    });
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = ref();
    const valueElement = ref();
    const triggerPointerDownPosRef = ref({
      x: 0,
      y: 0
    });
    const isEmptyModelValue = computed(() => {
      if (multiple.value && Array.isArray(modelValue.value))
        return modelValue.value?.length === 0;
      else
        return isNullish(modelValue.value);
    });
    useCollection({ isProvider: true });
    const dir = useDirection(propDir);
    const isFormControl = useFormControl(triggerElement);
    const optionsSet = ref(/* @__PURE__ */ new Set());
    const nativeSelectKey = computed(() => {
      return Array.from(optionsSet.value).map((option) => option.value).join(";");
    });
    function handleValueChange(value) {
      if (multiple.value) {
        const array = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
        const index = array.findIndex((i) => compare(i, value, props.by));
        index === -1 ? array.push(value) : array.splice(index, 1);
        modelValue.value = [...array];
      } else {
        modelValue.value = value;
      }
    }
    provideSelectRootContext({
      triggerElement,
      onTriggerChange: (node) => {
        triggerElement.value = node;
      },
      valueElement,
      onValueElementChange: (node) => {
        valueElement.value = node;
      },
      contentId: "",
      modelValue,
      // @ts-expect-error Missing infer for AcceptableValue
      onValueChange: handleValueChange,
      by: props.by,
      open,
      multiple,
      required,
      onOpenChange: (value) => {
        open.value = value;
      },
      dir,
      triggerPointerDownPosRef,
      disabled,
      isEmptyModelValue,
      optionsSet,
      onOptionAdd: (option) => optionsSet.value.add(option),
      onOptionRemove: (option) => optionsSet.value.delete(option)
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), null, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            modelValue: unref(modelValue),
            open: unref(open)
          }),
          unref(isFormControl) ? (openBlock(), createBlock(_sfc_main$2, {
            key: nativeSelectKey.value,
            "aria-hidden": "true",
            tabindex: "-1",
            multiple: unref(multiple),
            required: unref(required),
            name: _ctx.name,
            autocomplete: _ctx.autocomplete,
            disabled: unref(disabled),
            value: unref(modelValue)
          }, {
            default: withCtx(() => [
              unref(isNullish)(unref(modelValue)) ? (openBlock(), createElementBlock("option", _hoisted_1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(Array.from(optionsSet.value), (option) => {
                return openBlock(), createElementBlock("option", mergeProps({
                  key: option.value ?? "",
                  ref_for: true
                }, option), null, 16);
              }), 128))
            ]),
            _: 1
          }, 8, ["multiple", "required", "name", "autocomplete", "disabled", "value"])) : createCommentVNode("", true)
        ]),
        _: 3
      });
    };
  }
});

export { _sfc_main as _, injectSelectRootContext as i, provideSelectRootContext as p };
//# sourceMappingURL=SelectRoot.js.map
