'use strict';

const vue = require('vue');
const Select_BubbleSelect = require('./BubbleSelect.cjs');
const Popper_PopperRoot = require('../Popper/PopperRoot.cjs');
const core = require('@vueuse/core');
const Select_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const shared_nullish = require('../shared/nullish.cjs');

const _hoisted_1 = {
  key: 0,
  value: ""
};
const [injectSelectRootContext, provideSelectRootContext] = shared_createContext.createContext("SelectRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const { required, disabled, multiple, dir: propDir } = vue.toRefs(props);
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: props.modelValue === void 0,
      deep: true
    });
    const open = core.useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = vue.ref();
    const valueElement = vue.ref();
    const triggerPointerDownPosRef = vue.ref({
      x: 0,
      y: 0
    });
    const isEmptyModelValue = vue.computed(() => {
      if (multiple.value && Array.isArray(modelValue.value))
        return modelValue.value?.length === 0;
      else
        return shared_nullish.isNullish(modelValue.value);
    });
    Collection_Collection.useCollection({ isProvider: true });
    const dir = shared_useDirection.useDirection(propDir);
    const isFormControl = shared_useFormControl.useFormControl(triggerElement);
    const optionsSet = vue.ref(/* @__PURE__ */ new Set());
    const nativeSelectKey = vue.computed(() => {
      return Array.from(optionsSet.value).map((option) => option.value).join(";");
    });
    function handleValueChange(value) {
      if (multiple.value) {
        const array = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
        const index = array.findIndex((i) => Select_utils.compare(i, value, props.by));
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
      return vue.openBlock(), vue.createBlock(vue.unref(Popper_PopperRoot._sfc_main), null, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {
            modelValue: vue.unref(modelValue),
            open: vue.unref(open)
          }),
          vue.unref(isFormControl) ? (vue.openBlock(), vue.createBlock(Select_BubbleSelect._sfc_main, {
            key: nativeSelectKey.value,
            "aria-hidden": "true",
            tabindex: "-1",
            multiple: vue.unref(multiple),
            required: vue.unref(required),
            name: _ctx.name,
            autocomplete: _ctx.autocomplete,
            disabled: vue.unref(disabled),
            value: vue.unref(modelValue)
          }, {
            default: vue.withCtx(() => [
              vue.unref(shared_nullish.isNullish)(vue.unref(modelValue)) ? (vue.openBlock(), vue.createElementBlock("option", _hoisted_1)) : vue.createCommentVNode("", true),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(Array.from(optionsSet.value), (option) => {
                return vue.openBlock(), vue.createElementBlock("option", vue.mergeProps({
                  key: option.value ?? "",
                  ref_for: true
                }, option), null, 16);
              }), 128))
            ]),
            _: 1
          }, 8, ["multiple", "required", "name", "autocomplete", "disabled", "value"])) : vue.createCommentVNode("", true)
        ]),
        _: 3
      });
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectSelectRootContext = injectSelectRootContext;
exports.provideSelectRootContext = provideSelectRootContext;
//# sourceMappingURL=SelectRoot.cjs.map
