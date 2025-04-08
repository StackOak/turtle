import type { Locale, Direction } from '../types/locale';
interface DefineLocaleOptions<M> {
    name: string;
    code: string;
    dir?: Direction;
    messages: M;
}
export declare function defineLocale<M>(options: DefineLocaleOptions<M>): Locale<M>;
export {};
