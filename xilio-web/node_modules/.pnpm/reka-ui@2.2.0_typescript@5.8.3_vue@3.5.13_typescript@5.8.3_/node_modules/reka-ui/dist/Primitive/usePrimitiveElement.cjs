'use strict';

const core = require('@vueuse/core');
const vue = require('vue');

function usePrimitiveElement() {
  const primitiveElement = vue.ref();
  const currentElement = vue.computed(() => ["#text", "#comment"].includes(primitiveElement.value?.$el.nodeName) ? primitiveElement.value?.$el.nextElementSibling : core.unrefElement(primitiveElement));
  return {
    primitiveElement,
    currentElement
  };
}

exports.usePrimitiveElement = usePrimitiveElement;
//# sourceMappingURL=usePrimitiveElement.cjs.map
