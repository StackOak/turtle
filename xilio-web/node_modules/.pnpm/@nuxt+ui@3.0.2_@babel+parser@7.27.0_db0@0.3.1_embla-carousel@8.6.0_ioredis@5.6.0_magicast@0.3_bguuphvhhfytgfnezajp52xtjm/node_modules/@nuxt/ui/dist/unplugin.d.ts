import * as unplugin from 'unplugin';
import { Options } from 'unplugin-auto-import/types';
import { Options as Options$1 } from 'unplugin-vue-components/types';
import colors from 'tailwindcss/colors';
import * as ui from '#build/ui';
import { ModuleOptions } from './module.js';
import { DeepPartial } from '../dist/runtime/types/utils.js';
import '@nuxt/schema';
import '../dist/runtime/types/index.js';

declare const _default: {
    arrowLeft: string;
    arrowRight: string;
    check: string;
    chevronDoubleLeft: string;
    chevronDoubleRight: string;
    chevronDown: string;
    chevronLeft: string;
    chevronRight: string;
    chevronUp: string;
    close: string;
    ellipsis: string;
    external: string;
    folder: string;
    folderOpen: string;
    loading: string;
    minus: string;
    plus: string;
    search: string;
};

type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone';
type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {});
type AppConfigUI = {
    colors?: Record<string, Color> & {
        neutral?: NeutralColor;
    };
    icons?: Partial<typeof _default>;
} & DeepPartial<typeof ui>;
interface NuxtUIOptions extends Omit<ModuleOptions, 'fonts' | 'colorMode'> {
    /** Whether to generate declaration files for auto-imported components. */
    dts?: boolean;
    ui?: AppConfigUI;
    /**
     * Enable or disable `@vueuse/core` color-mode integration
     * @defaultValue `true`
     */
    colorMode?: boolean;
    /**
     * Override options for `unplugin-auto-import`
     */
    autoImport?: Partial<Options>;
    /**
     * Override options for `unplugin-vue-components`
     */
    components?: Partial<Options$1>;
}
declare const runtimeDir: string;
declare const NuxtUIPlugin: unplugin.UnpluginInstance<NuxtUIOptions | undefined, boolean>;

export { NuxtUIPlugin, runtimeDir };
export type { NuxtUIOptions };
