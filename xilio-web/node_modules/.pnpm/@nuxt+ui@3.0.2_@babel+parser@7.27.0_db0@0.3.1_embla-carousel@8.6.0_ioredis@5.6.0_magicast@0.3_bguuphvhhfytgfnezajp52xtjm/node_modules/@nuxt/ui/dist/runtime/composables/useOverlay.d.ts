import type { Component } from 'vue';
import type { ComponentProps, ComponentEmit } from 'vue-component-type-helpers';
type CloseEventArgType<T> = T extends (event: 'close', args_0: infer R) => void ? R : never;
export type OverlayOptions<OverlayAttrs = Record<string, any>> = {
    defaultOpen?: boolean;
    props?: OverlayAttrs;
    destroyOnClose?: boolean;
};
type ManagedOverlayOptionsPrivate<T extends Component> = {
    component?: T;
    id: symbol;
    isMounted: boolean;
    modelValue: boolean;
    resolvePromise?: (value: unknown) => void;
};
export type Overlay = OverlayOptions<Component> & ManagedOverlayOptionsPrivate<Component>;
interface OverlayInstance<T> {
    open: (props?: ComponentProps<T>) => Promise<CloseEventArgType<ComponentEmit<T>>>;
    close: (value?: any) => void;
    patch: (props: Partial<ComponentProps<T>>) => void;
}
declare function _useOverlay(): {
    overlays: import("vue").ShallowReactive<Overlay[]>;
    open: <T extends Component>(id: symbol, props?: ComponentProps<T>) => Promise<any>;
    close: (id: symbol, value?: any) => void;
    create: <T extends Component>(component: T, _options?: OverlayOptions<ComponentProps<T>>) => OverlayInstance<T>;
    patch: <T extends Component>(id: symbol, props: Partial<ComponentProps<T>>) => void;
    unMount: (id: symbol) => void;
};
export declare const useOverlay: typeof _useOverlay;
export {};
