import { Entity } from '@siren-js/core';
/**
 * [Decorates](https://en.wikipedia.org/wiki/Decorator_pattern) a
 * [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)
 * object with the `siren()` method for parsing JSON
 * [Siren](https://github.com/kevinswiber/siren) (`application/vnd.siren+json`).
 */
export default class ClientResponse implements Response {
    #private;
    constructor(response: Response);
    /**
     * Takes a `Response` stream and reads it to completion. It returns a
     * promise that resolves with the result of parsing the body text as a Siren
     * `Entity`.
     */
    siren(): Promise<Entity>;
    get headers(): Headers;
    get ok(): boolean;
    get redirected(): boolean;
    get status(): number;
    get statusText(): string;
    get type(): ResponseType;
    get url(): string;
    get body(): ReadableStream<Uint8Array> | null;
    get bodyUsed(): boolean;
    clone(): ClientResponse;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}
