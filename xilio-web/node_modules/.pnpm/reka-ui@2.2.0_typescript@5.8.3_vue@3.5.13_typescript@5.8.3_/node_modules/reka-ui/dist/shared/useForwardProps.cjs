'use strict';

const vue = require('vue');

function useForwardProps(props) {
  const vm = vue.getCurrentInstance();
  const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
    const defaultValue = (vm?.type.props[curr]).default;
    if (defaultValue !== void 0)
      prev[curr] = defaultValue;
    return prev;
  }, {});
  const refProps = vue.toRef(props);
  return vue.computed(() => {
    const preservedProps = {};
    const assignedProps = vm?.vnode.props ?? {};
    Object.keys(assignedProps).forEach((key) => {
      preservedProps[vue.camelize(key)] = assignedProps[key];
    });
    return Object.keys({ ...defaultProps, ...preservedProps }).reduce((prev, curr) => {
      if (refProps.value[curr] !== void 0)
        prev[curr] = refProps.value[curr];
      return prev;
    }, {});
  });
}

exports.useForwardProps = useForwardProps;
//# sourceMappingURL=useForwardProps.cjs.map
