import { Serializer } from './serializer';
export { Serializer } from './serializer';
export declare class Serializers extends Map<string, Serializer> {
    static get MULTIPART_FORM_DATA(): Serializer;
    static get PLAIN_TEXT_FORM_DATA(): Serializer;
    static get URL_ENCODED_FORM_DATA(): Serializer;
    constructor(init?: SerializersInit);
    delete(mediaType: string): boolean;
    get(mediaType: string): Serializer | undefined;
    has(mediaType: string): boolean;
    set(mediaType: string, serializer: Serializer): this;
    merge(that: SerializersInit): void;
}
export declare type SerializersInit = [string, Serializer][] | Record<string, Serializer> | Serializers;
