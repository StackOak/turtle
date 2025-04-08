'use strict';

const vue = require('vue');
const Primitive_usePrimitiveElement = require('../Primitive/usePrimitiveElement.cjs');
const Primitive_Slot = require('../Primitive/Slot.cjs');

const ITEM_DATA_ATTR = "data-reka-collection-item";
function useCollection(options = {}) {
  const { key = "", isProvider = false } = options;
  const injectionKey = `${key}CollectionProvider`;
  let context;
  if (isProvider) {
    const itemMap = vue.ref(/* @__PURE__ */ new Map());
    const collectionRef = vue.ref();
    context = {
      collectionRef,
      itemMap
    };
    vue.provide(injectionKey, context);
  } else {
    context = vue.inject(injectionKey);
  }
  const getItems = (includeDisabledItem = false) => {
    const collectionNode = context.collectionRef.value;
    if (!collectionNode)
      return [];
    const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
    const items = Array.from(context.itemMap.value.values());
    const orderedItems = items.sort(
      (a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref)
    );
    if (includeDisabledItem)
      return orderedItems;
    else
      return orderedItems.filter((i) => i.ref.dataset.disabled !== "");
  };
  const CollectionSlot = vue.defineComponent({
    name: "CollectionSlot",
    setup(_, { slots }) {
      const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
      vue.watch(currentElement, () => {
        context.collectionRef.value = currentElement.value;
      });
      return () => vue.h(Primitive_Slot.Slot, { ref: primitiveElement }, slots);
    }
  });
  const CollectionItem = vue.defineComponent({
    name: "CollectionItem",
    inheritAttrs: false,
    props: {
      value: {
        // It accepts any value
        validator: () => true
      }
    },
    setup(props, { slots, attrs }) {
      const { primitiveElement, currentElement } = Primitive_usePrimitiveElement.usePrimitiveElement();
      vue.watchEffect((cleanupFn) => {
        if (currentElement.value) {
          const key2 = vue.markRaw(currentElement.value);
          context.itemMap.value.set(key2, { ref: currentElement.value, value: props.value });
          cleanupFn(() => context.itemMap.value.delete(key2));
        }
      });
      return () => vue.h(Primitive_Slot.Slot, { ...attrs, [ITEM_DATA_ATTR]: "", ref: primitiveElement }, slots);
    }
  });
  const reactiveItems = vue.computed(() => Array.from(context.itemMap.value.values()));
  const itemMapSize = vue.computed(() => context.itemMap.value.size);
  return { getItems, reactiveItems, itemMapSize, CollectionSlot, CollectionItem };
}

exports.useCollection = useCollection;
//# sourceMappingURL=Collection.cjs.map
