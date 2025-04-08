import { refAutoReset } from '@vueuse/shared';
import { g as getActiveElement } from './getActiveElement.js';

function useTypeahead(callback) {
  const search = refAutoReset("", 1e3);
  const handleTypeaheadSearch = (key, items) => {
    search.value = search.value + key;
    {
      const currentItem = getActiveElement();
      const itemsWithTextValue = items.map((item) => ({
        ...item,
        textValue: item.value?.textValue ?? item.ref.textContent?.trim() ?? ""
      }));
      const currentMatch = itemsWithTextValue.find((item) => item.ref === currentItem);
      const values = itemsWithTextValue.map((item) => item.textValue);
      const nextMatch = getNextMatch(values, search.value, currentMatch?.textValue);
      const newItem = itemsWithTextValue.find((item) => item.textValue === nextMatch);
      if (newItem)
        newItem.ref.focus();
      return newItem?.ref;
    }
  };
  const resetTypeahead = () => {
    search.value = "";
  };
  return {
    search,
    handleTypeaheadSearch,
    resetTypeahead
  };
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch)
    wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find(
    (value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextMatch !== currentMatch ? nextMatch : void 0;
}

export { getNextMatch as g, useTypeahead as u, wrapArray as w };
//# sourceMappingURL=useTypeahead.js.map
