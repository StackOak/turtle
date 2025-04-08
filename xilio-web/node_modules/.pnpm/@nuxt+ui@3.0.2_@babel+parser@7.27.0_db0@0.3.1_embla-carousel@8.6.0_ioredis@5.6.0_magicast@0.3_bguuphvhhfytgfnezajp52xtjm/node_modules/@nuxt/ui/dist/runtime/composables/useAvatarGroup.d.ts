import { type ComputedRef, type InjectionKey } from 'vue';
import type { AvatarGroupProps } from '../types';
export declare const avatarGroupInjectionKey: InjectionKey<ComputedRef<{
    size: AvatarGroupProps['size'];
}>>;
export declare function useAvatarGroup(props: {
    size: AvatarGroupProps['size'];
}): {
    size: ComputedRef<any>;
};
