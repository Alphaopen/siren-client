"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ClientResponse_response;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@siren-js/core");
/**
 * [Decorates](https://en.wikipedia.org/wiki/Decorator_pattern) a
 * [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)
 * object with the `siren()` method for parsing JSON
 * [Siren](https://github.com/kevinswiber/siren) (`application/vnd.siren+json`).
 */
class ClientResponse {
    constructor(response) {
        _ClientResponse_response.set(this, void 0);
        __classPrivateFieldSet(this, _ClientResponse_response, response, "f");
    }
    /**
     * Takes a `Response` stream and reads it to completion. It returns a
     * promise that resolves with the result of parsing the body text as a Siren
     * `Entity`.
     */
    siren() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield __classPrivateFieldGet(this, _ClientResponse_response, "f").json();
            return new core_1.Entity(body);
        });
    }
    /////////////////////////////////////////
    // delegated Response and Body members //
    /////////////////////////////////////////
    get headers() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").headers;
    }
    get ok() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").ok;
    }
    get redirected() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").redirected;
    }
    get status() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").status;
    }
    get statusText() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").statusText;
    }
    get type() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").type;
    }
    get url() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").url;
    }
    get body() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").body;
    }
    get bodyUsed() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").bodyUsed;
    }
    clone() {
        return new ClientResponse(__classPrivateFieldGet(this, _ClientResponse_response, "f").clone());
    }
    arrayBuffer() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").arrayBuffer();
    }
    blob() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").blob();
    }
    formData() {
        /* istanbul ignore next: formData method is undefined in the implementation */
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").formData();
    }
    json() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").json();
    }
    text() {
        return __classPrivateFieldGet(this, _ClientResponse_response, "f").text();
    }
}
exports.default = ClientResponse;
_ClientResponse_response = new WeakMap();
