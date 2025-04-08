import type { Ref } from 'vue';
import type { NuxtApp } from '#app';
export { useHead } from '@unhead/vue';
export { useRoute, useRouter } from 'vue-router';
export { defineShortcuts } from '../composables/defineShortcuts';
export { defineLocale } from '../composables/defineLocale';
export { useLocale } from '../composables/useLocale';
export declare const useColorMode: () => {
    forced: boolean;
    preference?: "system" | "light" | "dark";
    readonly value?: import("@vueuse/core").BasicColorMode;
} | {
    preference: "system" | "light" | "dark";
    readonly value: import("@vueuse/core").BasicColorMode;
    forced: boolean;
};
export declare const useAppConfig: () => any;
export declare const useCookie: <T = string>(_name: string, _options?: Record<string, any>) => {
    value: Ref<T, T>;
    get: () => T;
    set: () => void;
    update: () => void;
    refresh: () => Promise<Awaited<T>>;
    remove: () => void;
};
export declare const useState: <T>(key: string, init: () => T) => Ref<T>;
export declare function useNuxtApp(): {
    isHydrating: boolean;
    payload: {
        serverRendered: boolean;
    };
    hooks: import("hookable").Hookable<Record<string, any>, string>;
    hook: <NameT extends string>(name: NameT, function_: any, options?: {
        allowDeprecated?: boolean;
    }) => () => void;
};
export declare function useRuntimeHook(name: string, fn: (...args: any[]) => void): void;
export declare function defineNuxtPlugin(plugin: (nuxtApp: NuxtApp) => void): {
    install(app: import("vue").App<any>): void;
};
