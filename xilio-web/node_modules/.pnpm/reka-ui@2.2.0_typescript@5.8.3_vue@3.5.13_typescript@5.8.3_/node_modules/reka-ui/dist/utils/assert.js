function assert(expectedCondition, message = "Assertion failed!") {
  if (!expectedCondition) {
    console.error(message);
    throw new Error(message);
  }
}

export { assert as a };
//# sourceMappingURL=assert.js.map
