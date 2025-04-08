'use strict';

const vue = require('vue');
const Collection_Collection = require('../Collection/Collection.cjs');
const Tree_utils = require('./utils.cjs');
const Tree_TreeRoot = require('./TreeRoot.cjs');
const RovingFocus_RovingFocusItem = require('../RovingFocus/RovingFocusItem.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');
const shared_handleAndDispatchCustomEvent = require('../shared/handleAndDispatchCustomEvent.cjs');

const TREE_SELECT = "tree.select";
const TREE_TOGGLE = "tree.toggle";
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
    const rootContext = Tree_TreeRoot.injectTreeRootContext();
    const { getItems } = Collection_Collection.useCollection();
    const hasChildren = vue.computed(() => !!rootContext.getChildren(props.value));
    const isExpanded = vue.computed(() => {
      const key = rootContext.getKey(props.value);
      return rootContext.expanded.value.includes(key);
    });
    const isSelected = vue.computed(() => {
      const key = rootContext.getKey(props.value);
      return rootContext.selectedKeys.value.includes(key);
    });
    const isIndeterminate = vue.computed(() => {
      if (rootContext.propagateSelect.value && isSelected.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
        const children = Tree_utils.flatten(rootContext.getChildren(props.value) || []);
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
        const currentElement = shared_getActiveElement.getActiveElement();
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
        const currentElement = shared_getActiveElement.getActiveElement();
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
      shared_handleAndDispatchCustomEvent.handleAndDispatchCustomEvent(TREE_SELECT, handleSelect, eventDetail);
    }
    async function handleToggleCustomEvent(ev) {
      if (!ev)
        return;
      const eventDetail = { originalEvent: ev, value: props.value, isExpanded: isExpanded.value, isSelected: isSelected.value };
      shared_handleAndDispatchCustomEvent.handleAndDispatchCustomEvent(TREE_TOGGLE, handleToggle, eventDetail);
    }
    __expose({
      isExpanded,
      isSelected,
      isIndeterminate,
      handleToggle: () => rootContext.onToggle(props.value),
      handleSelect: () => rootContext.onSelect(props.value)
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RovingFocus_RovingFocusItem._sfc_main), {
        "as-child": "",
        value: _ctx.value,
        "allow-shift-key": ""
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), vue.mergeProps(_ctx.$attrs, {
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
              vue.withKeys(vue.withModifiers(handleSelectCustomEvent, ["self", "prevent"]), ["enter", "space"]),
              _cache[0] || (_cache[0] = vue.withKeys(vue.withModifiers((ev) => vue.unref(rootContext).dir.value === "ltr" ? handleKeydownRight(ev) : handleKeydownLeft(ev), ["prevent"]), ["right"])),
              _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers((ev) => vue.unref(rootContext).dir.value === "ltr" ? handleKeydownLeft(ev) : handleKeydownRight(ev), ["prevent"]), ["left"]))
            ],
            onClick: _cache[2] || (_cache[2] = vue.withModifiers((ev) => {
              handleSelectCustomEvent(ev);
              handleToggleCustomEvent(ev);
            }, ["stop"]))
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", {
                isExpanded: isExpanded.value,
                isSelected: isSelected.value,
                isIndeterminate: isIndeterminate.value,
                handleSelect: () => vue.unref(rootContext).onSelect(_ctx.value),
                handleToggle: () => vue.unref(rootContext).onToggle(_ctx.value)
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

exports._sfc_main = _sfc_main;
//# sourceMappingURL=TreeItem.cjs.map
