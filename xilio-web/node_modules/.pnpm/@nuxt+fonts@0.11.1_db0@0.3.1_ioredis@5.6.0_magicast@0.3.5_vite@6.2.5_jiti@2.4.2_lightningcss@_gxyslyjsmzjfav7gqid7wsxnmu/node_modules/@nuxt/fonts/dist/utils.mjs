import { useNuxt } from '@nuxt/kit';
import { defineFontProvider as defineFontProvider$1 } from 'unifont';

function defineFontProvider(options) {
  return options;
}
function toUnifontProvider(name, provider) {
  return defineFontProvider$1(name, async (options) => {
    const nuxt = useNuxt();
    await provider.setup?.(options, nuxt);
    return {
      async resolveFont(fontFamily, options2) {
        const result = await provider.resolveFontFaces(fontFamily, options2);
        return result || void 0;
      }
    };
  });
}

export { defineFontProvider, toUnifontProvider };
