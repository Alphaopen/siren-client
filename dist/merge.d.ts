export declare function merge<T>(target: Target<T>, source: Source<T>, isTarget: (source: Source<T>) => source is Target<T>): void;
export interface Target<T> {
    set(key: string, value: T): void;
    forEach(callback: (value: T, key: string) => void): void;
}
export declare type Source<T> = Target<T> | [string, T][] | Record<string, T>;
