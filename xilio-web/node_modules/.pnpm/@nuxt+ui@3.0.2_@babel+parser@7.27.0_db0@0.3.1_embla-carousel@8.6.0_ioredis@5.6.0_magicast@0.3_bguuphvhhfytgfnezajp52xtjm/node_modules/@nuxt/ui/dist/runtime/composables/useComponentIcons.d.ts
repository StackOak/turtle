import { type MaybeRefOrGetter } from 'vue';
import type { AvatarProps } from '../types';
export interface UseComponentIconsProps {
    /**
     * Display an icon based on the `leading` and `trailing` props.
     * @IconifyIcon
     */
    icon?: string;
    /** Display an avatar on the left side. */
    avatar?: AvatarProps;
    /** When `true`, the icon will be displayed on the left side. */
    leading?: boolean;
    /**
     * Display an icon on the left side.
     * @IconifyIcon
     */
    leadingIcon?: string;
    /** When `true`, the icon will be displayed on the right side. */
    trailing?: boolean;
    /**
     * Display an icon on the right side.
     * @IconifyIcon
     */
    trailingIcon?: string;
    /** When `true`, the loading icon will be displayed. */
    loading?: boolean;
    /**
     * The icon when the `loading` prop is `true`.
     * @defaultValue appConfig.ui.icons.loading
     * @IconifyIcon
     */
    loadingIcon?: string;
}
export declare function useComponentIcons(componentProps: MaybeRefOrGetter<UseComponentIconsProps>): {
    isLeading: import("vue").ComputedRef<boolean>;
    isTrailing: import("vue").ComputedRef<boolean>;
    leadingIconName: import("vue").ComputedRef<any>;
    trailingIconName: import("vue").ComputedRef<any>;
};
