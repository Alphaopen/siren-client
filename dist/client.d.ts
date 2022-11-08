import { Link } from '@siren-js/core';
import { ActionLike } from './common';
import ClientResponse from './response';
import { Serializers, SerializersInit } from './serial';
export { default as ClientResponse } from './response';
export default class Client {
    #private;
    static get DEFAULT_ACCEPT_PREFERENCE(): string;
    constructor(options?: ClientOptions);
    get headers(): Headers;
    get serializers(): Serializers;
    fetch(input: RequestInfo, init?: RequestInit): Promise<ClientResponse>;
    follow(link: LinkLike): Promise<ClientResponse>;
    submit(action: ActionLike): Promise<ClientResponse>;
    private serializeToQuery;
    private serializeToBody;
}
export interface ClientOptions {
    headers?: HeadersInit;
    serializers?: SerializersInit;
}
export declare type HeadersInit = Headers | [string, string][] | Record<string, string>;
export declare type LinkLike = Pick<Link, 'href'>;
