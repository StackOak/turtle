import * as _nuxt_schema from '@nuxt/schema';
export * from '../dist/runtime/types/index.js';

interface ModuleOptions {
    /**
     * Prefix for components
     * @defaultValue `U`
     * @link https://ui.nuxt.com/getting-started/installation/nuxt#prefix
     */
    prefix?: string;
    /**
     * Enable or disable `@nuxt/fonts` module
     * @defaultValue `true`
     * @link https://ui.nuxt.com/getting-started/installation/nuxt#fonts
     */
    fonts?: boolean;
    /**
     * Enable or disable `@nuxtjs/color-mode` module
     * @defaultValue `true`
     * @link https://ui.nuxt.com/getting-started/installation/nuxt#colormode
     */
    colorMode?: boolean;
    /**
     * Customize how the theme is generated
     * @link https://ui.nuxt.com/getting-started/theme
     */
    theme?: {
        /**
         * Define the color aliases available for components
         * @defaultValue `['primary', 'secondary', 'success', 'info', 'warning', 'error']`
         * @link https://ui.nuxt.com/getting-started/installation/nuxt#themecolors
         */
        colors?: string[];
        /**
         * Enable or disable transitions on components
         * @defaultValue `true`
         * @link https://ui.nuxt.com/getting-started/installation/nuxt#themetransitions
         */
        transitions?: boolean;
    };
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

export { _default as default };
export type { ModuleOptions };
