import * as vite from 'vite';
import { NuxtUIOptions } from './unplugin.js';
import 'unplugin';
import 'unplugin-auto-import/types';
import 'unplugin-vue-components/types';
import 'tailwindcss/colors';
import '#build/ui';
import './module.js';
import '@nuxt/schema';
import '../dist/runtime/types/index.js';
import '../dist/runtime/types/utils.js';

declare const _default: (options?: NuxtUIOptions | undefined) => vite.Plugin<any> | vite.Plugin<any>[];

export { NuxtUIOptions, _default as default };
