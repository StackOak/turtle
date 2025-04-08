'use strict';

const vue = require('vue');
const core = require('@vueuse/core');
const RovingFocus_utils = require('../RovingFocus/utils.cjs');
const Tree_utils = require('./utils.cjs');
const shared_createContext = require('../shared/createContext.cjs');
const shared_useTypeahead = require('../shared/useTypeahead.cjs');
const shared_useDirection = require('../shared/useDirection.cjs');
const shared_useSelectionBehavior = require('../shared/useSelectionBehavior.cjs');
const RovingFocus_RovingFocusGroup = require('../RovingFocus/RovingFocusGroup.cjs');
const Primitive_Primitive = require('../Primitive/Primitive.cjs');
const shared_getActiveElement = require('../shared/getActiveElement.cjs');

const [injectTreeRootContext, provideTreeRootContext] = shared_createContext.createContext("TreeRoot");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "TreeRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    items: {},
    expanded: {},
    defaultExpanded: {},
    getKey: {},
    getChildren: { type: Function, default: (val) => val.children },
    selectionBehavior: { default: "toggle" },
    multiple: { type: Boolean },
    dir: {},
    disabled: { type: Boolean },
    propagateSelect: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "ul" }
  },
  emits: ["update:modelValue", "update:expanded"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { items, multiple, disabled, propagateSelect, dir: propDir } = vue.toRefs(props);
    const { handleTypeaheadSearch } = shared_useTypeahead.useTypeahead();
    const dir = shared_useDirection.useDirection(propDir);
    const rovingFocusGroupRef = vue.ref();
    const isVirtual = vue.ref(false);
    const virtualKeydownHook = core.createEventHook();
    const modelValue = core.useVModel(props, "modelValue", emits, {
      // @ts-expect-error idk
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: props.modelValue === void 0,
      deep: true
    });
    const expanded = core.useVModel(props, "expanded", emits, {
      // @ts-expect-error idk
      defaultValue: props.defaultExpanded ?? [],
      passive: props.expanded === void 0,
      deep: true
    });
    const { onSelectItem, handleMultipleReplace } = shared_useSelectionBehavior.useSelectionBehavior(modelValue, props);
    const selectedKeys = vue.computed(() => {
      if (multiple.value && Array.isArray(modelValue.value))
        return modelValue.value.map((i) => props.getKey(i));
      else
        return [props.getKey(modelValue.value ?? {})];
    });
    function flattenItems(items2, level = 1, parentItem) {
      return items2.reduce((acc, item, index) => {
        const key = props.getKey(item);
        const children = props.getChildren(item);
        const isExpanded = expanded.value.includes(key);
        const flattenedItem = {
          _id: key,
          value: item,
          index,
          level,
          parentItem,
          hasChildren: !!children,
          bind: {
            "value": item,
            level,
            "aria-setsize": items2.length,
            "aria-posinset": index + 1
          }
        };
        acc.push(flattenedItem);
        if (children && isExpanded)
          acc.push(...flattenItems(children, level + 1, item));
        return acc;
      }, []);
    }
    const expandedItems = vue.computed(() => {
      const items2 = props.items;
      expanded.value.map((i) => i);
      return flattenItems(items2 ?? []);
    });
    function handleKeydown(event) {
      if (isVirtual.value) {
        virtualKeydownHook.trigger(event);
      } else {
        const collections = rovingFocusGroupRef.value?.getItems() ?? [];
        handleTypeaheadSearch(event.key, collections);
      }
    }
    function handleKeydownNavigation(event) {
      if (isVirtual.value)
        return;
      const intent = RovingFocus_utils.MAP_KEY_TO_FOCUS_INTENT[event.key];
      vue.nextTick(() => {
        handleMultipleReplace(
          intent,
          shared_getActiveElement.getActiveElement(),
          rovingFocusGroupRef.value?.getItems,
          expandedItems.value.map((i) => i.value)
        );
      });
    }
    provideTreeRootContext({
      modelValue,
      selectedKeys,
      onSelect: (val) => {
        const condition = (baseValue) => props.getKey(baseValue ?? {}) === props.getKey(val);
        const exist = props.multiple && Array.isArray(modelValue.value) ? modelValue.value?.findIndex(condition) !== -1 : void 0;
        onSelectItem(val, condition);
        if (props.propagateSelect && props.multiple && Array.isArray(modelValue.value)) {
          const children = Tree_utils.flatten(props.getChildren(val) ?? []);
          if (exist) {
            modelValue.value = [...modelValue.value].filter((i) => !children.some((child) => props.getKey(i ?? {}) === props.getKey(child)));
          } else {
            modelValue.value = [...modelValue.value, ...children];
          }
        }
      },
      expanded,
      onToggle(val) {
        const children = val ? props.getChildren(val) : void 0;
        if (!children)
          return;
        const key = props.getKey(val) ?? val;
        if (expanded.value.includes(key))
          expanded.value = expanded.value.filter((val2) => val2 !== key);
        else
          expanded.value.push(key);
      },
      getKey: props.getKey,
      getChildren: props.getChildren,
      items,
      expandedItems,
      disabled,
      multiple,
      dir,
      propagateSelect,
      isVirtual,
      virtualKeydownHook,
      handleMultipleReplace
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(RovingFocus_RovingFocusGroup._sfc_main), {
        ref_key: "rovingFocusGroupRef",
        ref: rovingFocusGroupRef,
        "as-child": "",
        orientation: "vertical",
        dir: vue.unref(dir)
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(Primitive_Primitive.Primitive), {
            role: "tree",
            as: _ctx.as,
            "as-child": _ctx.asChild,
            "aria-multiselectable": vue.unref(multiple) ? true : void 0,
            onKeydown: [
              handleKeydown,
              vue.withKeys(vue.withModifiers(handleKeydownNavigation, ["shift"]), ["up", "down"])
            ]
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", {
                flattenItems: expandedItems.value,
                modelValue: vue.unref(modelValue),
                expanded: vue.unref(expanded)
              })
            ]),
            _: 3
          }, 8, ["as", "as-child", "aria-multiselectable", "onKeydown"])
        ]),
        _: 3
      }, 8, ["dir"]);
    };
  }
});

exports._sfc_main = _sfc_main;
exports.injectTreeRootContext = injectTreeRootContext;
//# sourceMappingURL=TreeRoot.cjs.map
