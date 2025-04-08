'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const Listbox_utils = require('./utils.cjs');
const Collection_Collection = require('../Collection/Collection.cjs');
require('@floating-ui/vue');
const RovingFocus_utils = require('../RovingFocus/utils.cjs');
const shared_useTypeahead = require('../shared/useTypeahead.cjs');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useFormControl = require('../shared/useFormControl.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const VisuallyHidden_VisuallyHiddenInput = require('../VisuallyHidden/VisuallyHiddenInput.cjs');
const shared_useKbd = require('../shared/useKbd.cjs');
const shared_arrays = require('../shared/arrays.cjs');

const [injectListboxRootContext, provideListboxRootContext] = shared_createContext.createContext("ListboxRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ListboxRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    multiple: { type: Boolean },
    orientation: { default: "vertical" },
    dir: {},
    disabled: { type: Boolean },
    selectionBehavior: { default: "toggle" },
    highlightOnHover: { type: Boolean },
    by: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "highlight", "entryFocus", "leave"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { multiple, highlightOnHover, orientation, disabled, selectionBehavior, dir: propDir } = vue.toRefs(props);
    const { getItems } = Collection_Collection.useCollection({ isProvider: true });
    const { handleTypeaheadSearch } = shared_useTypeahead.useTypeahead();
    const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
    const kbd = shared_useKbd.useKbd();
    const dir = shared_useDirection.useDirection(propDir);
    const isFormControl = shared_useFormControl.useFormControl(currentElement);
    const firstValue = vue.ref();
    const isUserAction = vue.ref(false);
    const focusable = vue.ref(true);
    const modelValue = core.useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: props.modelValue === void 0,
      deep: true
    });
    function onValueChange(val) {
      isUserAction.value = true;
      if (props.multiple) {
        const modelArray = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
        const index = modelArray.findIndex((i) => Listbox_utils.compare(i, val, props.by));
        if (props.selectionBehavior === "toggle") {
          index === -1 ? modelArray.push(val) : modelArray.splice(index, 1);
          modelValue.value = modelArray;
        } else {
          modelValue.value = [val];
          firstValue.value = val;
        }
      } else {
        if (props.selectionBehavior === "toggle") {
          if (Listbox_utils.compare(modelValue.value, val, props.by))
            modelValue.value = void 0;
          else
            modelValue.value = val;
        } else {
          modelValue.value = val;
        }
      }
      setTimeout(() => {
        isUserAction.value = false;
      }, 1);
    }
    const highlightedElement = vue.ref(null);
    const previousElement = vue.ref(null);
    const isVirtual = vue.ref(false);
    const isComposing = vue.ref(false);
    const virtualFocusHook = core.createEventHook();
    const virtualKeydownHook = core.createEventHook();
    const virtualHighlightHook = core.createEventHook();
    function getCollectionItem() {
      return getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
    }
    function changeHighlight(el, scrollIntoView = true) {
      if (!el)
        return;
      highlightedElement.value = el;
      if (focusable.value)
        highlightedElement.value.focus();
      if (scrollIntoView)
        highlightedElement.value.scrollIntoView({ block: "nearest" });
      const highlightedItem = getItems().find((i) => i.ref === el);
      emits("highlight", highlightedItem);
    }
    function highlightItem(value) {
      if (isVirtual.value) {
        virtualHighlightHook.trigger(value);
      } else {
        const item = getItems().find((i) => Listbox_utils.compare(i.value, value, props.by));
        if (item) {
          highlightedElement.value = item.ref;
          changeHighlight(item.ref);
        }
      }
    }
    function onKeydownEnter(event) {
      if (highlightedElement.value && highlightedElement.value.isConnected) {
        event.preventDefault();
        event.stopPropagation();
        if (!isComposing.value) {
          highlightedElement.value.click();
        }
      }
    }
    function onKeydownTypeAhead(event) {
      if (!focusable.value)
        return;
      isUserAction.value = true;
      if (isVirtual.value) {
        virtualKeydownHook.trigger(event);
      } else {
        const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
        if (isMetaKey && event.key === "a" && multiple.value) {
          const collection = getItems();
          const values = collection.map((i) => i.value);
          modelValue.value = [...values];
          event.preventDefault();
          changeHighlight(collection[collection.length - 1].ref);
        } else if (!isMetaKey) {
          const el = handleTypeaheadSearch(event.key, getItems());
          if (el)
            changeHighlight(el);
        }
      }
      setTimeout(() => {
        isUserAction.value = false;
      }, 1);
    }
    function onCompositionStart() {
      isComposing.value = true;
    }
    function onCompositionEnd() {
      requestAnimationFrame(() => {
        isComposing.value = false;
      });
    }
    function highlightFirstItem() {
      vue.nextTick(() => {
        const event = new KeyboardEvent("keydown", { key: "PageUp" });
        onKeydownNavigation(event);
      });
    }
    function onLeave(event) {
      const el = highlightedElement.value;
      if (el?.isConnected) {
        previousElement.value = el;
      }
      highlightedElement.value = null;
      emits("leave", event);
    }
    function onEnter(event) {
      const entryFocusEvent = new CustomEvent("listbox.entryFocus", { bubbles: false, cancelable: true });
      event.currentTarget?.dispatchEvent(entryFocusEvent);
      emits("entryFocus", entryFocusEvent);
      if (entryFocusEvent.defaultPrevented)
        return;
      if (previousElement.value) {
        changeHighlight(previousElement.value);
      } else {
        const el = getCollectionItem()?.[0];
        changeHighlight(el);
      }
    }
    function onKeydownNavigation(event) {
      const intent = RovingFocus_utils.getFocusIntent(event, orientation.value, dir.value);
      if (!intent)
        return;
      let collection = getCollectionItem();
      if (highlightedElement.value) {
        if (intent === "last") {
          collection.reverse();
        } else if (intent === "prev" || intent === "next") {
          if (intent === "prev")
            collection.reverse();
          const currentIndex = collection.indexOf(highlightedElement.value);
          collection = collection.slice(currentIndex + 1);
        }
        handleMultipleReplace(event, collection[0]);
      }
      if (collection.length) {
        const index = !highlightedElement.value && intent === "prev" ? collection.length - 1 : 0;
        changeHighlight(collection[index]);
      }
      if (isVirtual.value)
        return virtualKeydownHook.trigger(event);
    }
    function handleMultipleReplace(event, targetEl) {
      if (isVirtual.value || props.selectionBehavior !== "replace" || !multiple.value || !Array.isArray(modelValue.value))
        return;
      const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
      if (isMetaKey && !event.shiftKey)
        return;
      if (event.shiftKey) {
        const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
        let lastValue = collection.find((i) => i.ref === targetEl)?.value;
        if (event.key === kbd.END)
          lastValue = collection[collection.length - 1].value;
        else if (event.key === kbd.HOME)
          lastValue = collection[0].value;
        if (!lastValue || !firstValue.value)
          return;
        const values = shared_arrays.findValuesBetween(collection.map((i) => i.value), firstValue.value, lastValue);
        modelValue.value = values;
      }
    }
    async function highlightSelected(event) {
      await vue.nextTick();
      if (isVirtual.value) {
        virtualFocusHook.trigger(event);
      } else {
        const collection = getCollectionItem();
        const item = collection.find((i) => i.dataset.state === "checked");
        if (item)
          changeHighlight(item);
        else if (collection.length)
          changeHighlight(collection[0]);
      }
    }
    vue.watch(modelValue, () => {
      if (!isUserAction.value) {
        vue.nextTick(() => {
          highlightSelected();
        });
      }
    }, { immediate: true, deep: true });
    __expose({
      highlightedElement,
      highlightItem,
      highlightFirstItem,
      highlightSelected,
      getItems
    });
    provideListboxRootContext({
      modelValue,
      // @ts-expect-error ignoring
      onValueChange,
      multiple,
      orientation,
      dir,
      disabled,
      highlightOnHover,
      highlightedElement,
      isVirtual,
      virtualFocusHook,
      virtualKeydownHook,
      virtualHighlightHook,
      by: props.by,
      firstValue,
      selectionBehavior,
      focusable,
      onLeave,
      onEnter,
      changeHighlight,
      onKeydownEnter,
      onKeydownNavigation,
      onKeydownTypeAhead,
      onCompositionStart,
      onCompositionEnd,
      highlightFirstItem
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(Primitive_Primitive.Primitive), {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        as: _ctx.as,
        "as-child": _ctx.asChild,
        dir: vue.unref(dir),
        "data-disabled": vue.unref(disabled) ? "" : void 0,
        onPointerleave: onLeave,
        onFocusout: _cache[0] || (_cache[0] = async (event) => {
          const target = event.relatedTarget || event.target;
          await vue.nextTick();
          if (highlightedElement.value && vue.unref(currentElement) && !vue.unref(currentElement).contains(target)) {
            onLeave(event);
          }
        })
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", { modelValue: vue.unref(modelValue) }),
          vue.unref(isFormControl) && _ctx.name ? (vue.openBlock(), vue.createBlock(vue.unref(VisuallyHidden_VisuallyHiddenInput._sfc_main), {
            key: 0,
            name: _ctx.name,
            value: vue.unref(modelValue),
            disabled: vue.unref(disabled),
            required: _ctx.required
          }, null, 8, ["name", "value", "disabled", "required"])) : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["as", "as-child", "dir", "data-disabled"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectListboxRootContext = injectListboxRootContext;
//# sourceMappingURL=ListboxRoot.cjs.map
