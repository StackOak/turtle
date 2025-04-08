'use strict';

const vue = require('vue');

function createContext(providerComponentName, contextName) {
  const symbolDescription = typeof providerComponentName === "string" && !contextName ? `${providerComponentName}Context` : contextName;
  const injectionKey = Symbol(symbolDescription);
  const injectContext = (fallback) => {
    const context = vue.inject(injectionKey, fallback);
    if (context)
      return context;
    if (context === null)
      return context;
    throw new Error(
      `Injection \`${injectionKey.toString()}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(
        ", "
      )}` : `\`${providerComponentName}\``}`
    );
  };
  const provideContext = (contextValue) => {
    vue.provide(injectionKey, contextValue);
    return contextValue;
  };
  return [injectContext, provideContext];
}

exports.createContext = createContext;
//# sourceMappingURL=createContext.cjs.map
