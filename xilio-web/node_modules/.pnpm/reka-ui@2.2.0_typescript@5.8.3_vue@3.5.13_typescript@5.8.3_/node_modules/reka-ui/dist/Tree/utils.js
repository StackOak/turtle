function flatten(items) {
  return items.reduce((acc, item) => {
    acc.push(item);
    if (item.children)
      acc.push(...flatten(item.children));
    return acc;
  }, []);
}

export { flatten as f };
//# sourceMappingURL=utils.js.map
