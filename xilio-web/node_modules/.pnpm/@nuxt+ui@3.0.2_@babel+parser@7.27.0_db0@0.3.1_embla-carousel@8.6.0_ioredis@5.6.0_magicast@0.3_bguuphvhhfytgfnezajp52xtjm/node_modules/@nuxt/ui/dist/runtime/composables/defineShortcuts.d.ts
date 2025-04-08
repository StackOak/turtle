import type { MaybeRef } from 'vue';
type Handler = (e?: any) => void;
export interface ShortcutConfig {
    handler: Handler;
    usingInput?: string | boolean;
}
export interface ShortcutsConfig {
    [key: string]: ShortcutConfig | Handler | false | null | undefined;
}
export interface ShortcutsOptions {
    chainDelay?: number;
}
export declare function extractShortcuts(items: any[] | any[][]): Record<string, Handler>;
export declare function defineShortcuts(config: MaybeRef<ShortcutsConfig>, options?: ShortcutsOptions): import("@vueuse/core").Fn;
export {};
