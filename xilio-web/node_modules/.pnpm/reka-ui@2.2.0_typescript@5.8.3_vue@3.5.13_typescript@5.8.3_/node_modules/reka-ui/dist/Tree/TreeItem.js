import { defineComponent, computed, createBlock, openBlock, unref, withCtx, createVNode, mergeProps, withModifiers, withKeys, renderSlot } from 'vue';
import { u as useCollection } from '../Collection/Collection.js';
import { f as flatten } from './utils.js';
import { i as injectTreeRootContext } from './TreeRoot.js';
import { _ as _sfc_main$1 } from '../RovingFocus/RovingFocusItem.js';
import { P as Primitive } from '../Primitive/Primitive.js';
import { g as getActiveElement } from '../shared/getActiveElement.js';
import { h as handleAndDispatchCustomEvent } from '../shared/handleAndDispatchCustomEvent.js';

const TREE_SELECT = "tree.select";
const TREE_TOGGLE = "tree.toggle";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "TreeItem",
  props: {
    value: {},
    level: {},
    asChild: { type: Boolean },
    as: { default: "li" }
  },
  emits: ["select", "toggle"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectTreeRootContext();
    const { getItems } = useCollection();
    const hasChildren = computed(() => !!rootContext.getChildren(props.value));
    const isExpanded = computed(() => {
      const key = rootContext.getKey(props.value);
      return rootContext.expanded.value.includes(key);
    });
    const isSelected = computed(() => {
      const key = rootContext.getKey(props.value);
      return rootContext.selectedKeys.value.includes(key);
    });
    const isIndeterminate = computed(() => {
      if (rootContext.propagateSelect.value && isSelected.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
        const children = flatten(rootContext.getChildren(props.value) || []);
        return !children.every((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child)));
      } else {
        return void 0;
      }
    });
    function handleKeydownRight(ev) {
      if (!hasChildren.value)
        return;
      if (isExpanded.value) {
        const collection = getItems().map((i) => i.ref);
        const currentElement = getActiveElement();
        const currentIndex = collection.indexOf(currentElement);
        const list = [...collection].slice(currentIndex);
        const nextElement = list.find((el) => Number(el.getAttribute("data-indent")) === props.level + 1);
        if (nextElement)
          nextElement.focus();
      } else {
        handleToggleCustomEvent(ev);
      }
    }
    function handleKeydownLeft(ev) {
      if (isExpanded.value) {
        handleToggleCustomEvent(ev);
      } else {
        const collection = getItems().map((i) => i.ref);
        const currentElement = getActiveElement();
        const currentIndex = collection.indexOf(currentElement);
        const list = [...collection].slice(0, currentIndex).reverse();
        const parentElement = list.find((el) => Number(el.getAttribute("data-indent")) === props.level - 1);
        if (parentElement)
          parentElement.focus();
      }
    }
    async function handleSelect(ev) {
      emits("select", ev);
      if (ev?.defaultPrevented)
        return;
      rootContext.onSelect(props.value);
    }
    async function handleToggle(ev) {
      emits("toggle", ev);
      if (ev?.defaultPrevented)
        return;
      rootContext.onToggle(props.value);
    }
    async function handleSelectCustomEvent(ev) {
      if (!ev)
        return;
      const eventDetail = { originalEvent: ev, value: props.value, isExpanded: isExpanded.value, isSelected: isSelected.value };
      handleAndDispatchCustomEvent(TREE_SELECT, handleSelect, eventDetail);
    }
    async function handleToggleCustomEvent(ev) {
      if (!ev)
        return;
      const eventDetail = { originalEvent: ev, value: props.value, isExpanded: isExpanded.value, isSelected: isSelected.value };
      handleAndDispatchCustomEvent(TREE_TOGGLE, handleToggle, eventDetail);
    }
    __expose({
      isExpanded,
      isSelected,
      isIndeterminate,
      handleToggle: () => rootContext.onToggle(props.value),
      handleSelect: () => rootContext.onSelect(props.value)
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$1), {
        "as-child": "",
        value: _ctx.value,
        "allow-shift-key": ""
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
            role: "treeitem",
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "aria-selected": isSelected.value,
            "aria-expanded": hasChildren.value ? isExpanded.value : void 0,
            "aria-level": _ctx.level,
            "data-indent": _ctx.level,
            "data-selected": isSelected.value ? "" : void 0,
            "data-expanded": isExpanded.value ? "" : void 0,
            onKeydown: [
              withKeys(withModifiers(handleSelectCustomEvent, ["self", "prevent"]), ["enter", "space"]),
              _cache[0] || (_cache[0] = withKeys(withModifiers((ev) => unref(rootContext).dir.value === "ltr" ? handleKeydownRight(ev) : handleKeydownLeft(ev), ["prevent"]), ["right"])),
              _cache[1] || (_cache[1] = withKeys(withModifiers((ev) => unref(rootContext).dir.value === "ltr" ? handleKeydownLeft(ev) : handleKeydownRight(ev), ["prevent"]), ["left"]))
            ],
            onClick: _cache[2] || (_cache[2] = withModifiers((ev) => {
              handleSelectCustomEvent(ev);
              handleToggleCustomEvent(ev);
            }, ["stop"]))
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                isExpanded: isExpanded.value,
                isSelected: isSelected.value,
                isIndeterminate: isIndeterminate.value,
                handleSelect: () => unref(rootContext).onSelect(_ctx.value),
                handleToggle: () => unref(rootContext).onToggle(_ctx.value)
              })
            ]),
            _: 3
          }, 16, ["as", "as-child", "aria-selected", "aria-expanded", "aria-level", "data-indent", "data-selected", "data-expanded", "onKeydown"])
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=TreeItem.js.map
