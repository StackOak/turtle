export declare function pick<Data extends object, Keys extends keyof Data>(data: Data, keys: Keys[]): Pick<Data, Keys>;
export declare function omit<Data extends object, Keys extends keyof Data>(data: Data, keys: Keys[]): Omit<Data, Keys>;
export declare function get(object: Record<string, any> | undefined, path: (string | number)[] | string, defaultValue?: any): any;
export declare function set(object: Record<string, any>, path: (string | number)[] | string, value: any): void;
export declare function looseToNumber(val: any): any;
export declare function compare<T>(value?: T, currentValue?: T, comparator?: string | ((a: T, b: T) => boolean)): boolean;
export declare function isArrayOfArray<A>(item: A[] | A[][]): item is A[][];
