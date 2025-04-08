'use strict';

const core = require('@vueuse/core');
const ariaHidden = require('aria-hidden');
const vue = require('vue');

function useHideOthers(target) {
  let undo;
  vue.watch(() => core.unrefElement(target), (el) => {
    if (el)
      undo = ariaHidden.hideOthers(el);
    else if (undo)
      undo();
  });
  vue.onUnmounted(() => {
    if (undo)
      undo();
  });
}

exports.useHideOthers = useHideOthers;
//# sourceMappingURL=useHideOthers.cjs.map
