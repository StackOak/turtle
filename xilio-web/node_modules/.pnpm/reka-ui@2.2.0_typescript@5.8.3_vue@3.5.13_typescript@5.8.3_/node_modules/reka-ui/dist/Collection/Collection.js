import { ref, provide, inject, defineComponent, watch, h, watchEffect, markRaw, computed } from 'vue';
import { u as usePrimitiveElement } from '../Primitive/usePrimitiveElement.js';
import { S as Slot } from '../Primitive/Slot.js';

const ITEM_DATA_ATTR = "data-reka-collection-item";
function useCollection(options = {}) {
  const { key = "", isProvider = false } = options;
  const injectionKey = `${key}CollectionProvider`;
  let context;
  if (isProvider) {
    const itemMap = ref(/* @__PURE__ */ new Map());
    const collectionRef = ref();
    context = {
      collectionRef,
      itemMap
    };
    provide(injectionKey, context);
  } else {
    context = inject(injectionKey);
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
  const CollectionSlot = defineComponent({
    name: "CollectionSlot",
    setup(_, { slots }) {
      const { primitiveElement, currentElement } = usePrimitiveElement();
      watch(currentElement, () => {
        context.collectionRef.value = currentElement.value;
      });
      return () => h(Slot, { ref: primitiveElement }, slots);
    }
  });
  const CollectionItem = defineComponent({
    name: "CollectionItem",
    inheritAttrs: false,
    props: {
      value: {
        // It accepts any value
        validator: () => true
      }
    },
    setup(props, { slots, attrs }) {
      const { primitiveElement, currentElement } = usePrimitiveElement();
      watchEffect((cleanupFn) => {
        if (currentElement.value) {
          const key2 = markRaw(currentElement.value);
          context.itemMap.value.set(key2, { ref: currentElement.value, value: props.value });
          cleanupFn(() => context.itemMap.value.delete(key2));
        }
      });
      return () => h(Slot, { ...attrs, [ITEM_DATA_ATTR]: "", ref: primitiveElement }, slots);
    }
  });
  const reactiveItems = computed(() => Array.from(context.itemMap.value.values()));
  const itemMapSize = computed(() => context.itemMap.value.size);
  return { getItems, reactiveItems, itemMapSize, CollectionSlot, CollectionItem };
}

export { useCollection as u };
//# sourceMappingURL=Collection.js.map
