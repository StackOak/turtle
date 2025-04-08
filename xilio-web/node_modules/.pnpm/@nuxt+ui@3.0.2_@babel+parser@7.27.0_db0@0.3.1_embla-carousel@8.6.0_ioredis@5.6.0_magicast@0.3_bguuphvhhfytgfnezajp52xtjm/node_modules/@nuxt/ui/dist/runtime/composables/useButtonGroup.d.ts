import type { InjectionKey, ComputedRef } from 'vue';
import type { ButtonGroupProps } from '../components/ButtonGroup.vue';
import type { GetObjectField } from '../types/utils';
export declare const buttonGroupInjectionKey: InjectionKey<ComputedRef<{
    size: ButtonGroupProps['size'];
    orientation: ButtonGroupProps['orientation'];
}>>;
type Props<T> = {
    size?: GetObjectField<T, 'size'>;
};
export declare function useButtonGroup<T>(props: Props<T>): {
    orientation: ComputedRef<any>;
    size: ComputedRef<any>;
};
export {};
