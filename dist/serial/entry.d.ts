/**
 * Represents an [entry](https://xhr.spec.whatwg.org/#concept-formdata-entry) as
 * defined in WHATWG's XMLHttpRequest standard.
 */
export declare class Entry {
    #private;
    /**
     * Implementation of a subset of the XMLHttpRequest standard's algorithm to
     * [create an entry](https://xhr.spec.whatwg.org/#create-an-entry). Namely,
     * `Blob` values and the optional `filename` parameter aren't currently
     * supported.
     */
    constructor(name: string, value: EntryValue);
    get name(): string;
    get value(): EntryValue;
}
export declare type EntryValue = File | string;
