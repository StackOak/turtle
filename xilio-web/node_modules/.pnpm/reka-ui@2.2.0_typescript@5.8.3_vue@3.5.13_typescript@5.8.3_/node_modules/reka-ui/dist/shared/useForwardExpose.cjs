'use strict';

const core = require('@vueuse/core');
const vue = require('vue');

function useForwardExpose() {
  const instance = vue.getCurrentInstance();
  const currentRef = vue.ref();
  const currentElement = vue.computed(() => {
    return ["#text", "#comment"].includes(currentRef.value?.$el.nodeName) ? currentRef.value?.$el.nextElementSibling : core.unrefElement(currentRef);
  });
  const localExpose = Object.assign({}, instance.exposed);
  const ret = {};
  for (const key in instance.props) {
    Object.defineProperty(ret, key, {
      enumerable: true,
      configurable: true,
      get: () => instance.props[key]
    });
  }
  if (Object.keys(localExpose).length > 0) {
    for (const key in localExpose) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        configurable: true,
        get: () => localExpose[key]
      });
    }
  }
  Object.defineProperty(ret, "$el", {
    enumerable: true,
    configurable: true,
    get: () => instance.vnode.el
  });
  instance.exposed = ret;
  function forwardRef(ref2) {
    currentRef.value = ref2;
    if (!ref2)
      return;
    Object.defineProperty(ret, "$el", {
      enumerable: true,
      configurable: true,
      get: () => ref2 instanceof Element ? ref2 : ref2.$el
    });
    instance.exposed = ret;
  }
  return { forwardRef, currentRef, currentElement };
}

exports.useForwardExpose = useForwardExpose;
//# sourceMappingURL=useForwardExpose.cjs.map
