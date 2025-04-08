'use strict';

const core = require('@vueuse/core');
const vue = require('vue');

function useFormControl(el) {
  return vue.computed(() => core.toValue(el) ? Boolean(core.unrefElement(el)?.closest("form")) : true);
}

exports.useFormControl = useFormControl;
//# sourceMappingURL=useFormControl.cjs.map
