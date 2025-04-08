import type { ToastProps, ToastEmits } from '../types';
import type { EmitsToProps } from '../types/utils';
export interface Toast extends Omit<ToastProps, 'defaultOpen'>, EmitsToProps<ToastEmits> {
    id: string | number;
    onClick?: (toast: Toast) => void;
}
export declare function useToast(): {
    toasts: import("vue").Ref<Toast[], Toast[]>;
    add: (toast: Partial<Toast>) => Toast;
    update: (id: string | number, toast: Omit<Partial<Toast>, "id">) => void;
    remove: (id: string | number) => void;
    clear: () => void;
};
