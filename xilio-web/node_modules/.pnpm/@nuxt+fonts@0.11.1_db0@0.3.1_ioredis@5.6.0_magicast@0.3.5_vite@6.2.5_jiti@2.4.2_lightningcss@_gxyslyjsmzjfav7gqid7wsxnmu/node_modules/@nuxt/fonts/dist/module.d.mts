import * as _nuxt_schema from '@nuxt/schema';
import { M as ModuleHooks, a as ModuleOptions } from './shared/fonts.ngqyLnIq.mjs';
export { b as FontFallback, c as FontFamilyManualOverride, d as FontFamilyOverrides, e as FontFamilyProviderOverride, F as FontProvider, f as FontProviderName, g as FontSource } from './shared/fonts.ngqyLnIq.mjs';
export { FontFaceData, LocalFontSource, FontFaceData as NormalizedFontFaceData, RemoteFontSource, ResolveFontOptions as ResolveFontFacesOptions, ResolveFontOptions } from 'unifont';

declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

declare module '@nuxt/schema' {
    interface NuxtHooks extends ModuleHooks {
    }
}

export { ModuleOptions, _default as default };
