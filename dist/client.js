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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Client_headers, _Client_serializers;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientResponse = void 0;
const core_1 = require("@siren-js/core");
const type_guard_1 = require("@siren-js/core/dist/util/type-guard");
const cross_fetch_1 = require("cross-fetch");
const merge_1 = require("./merge");
const response_1 = __importDefault(require("./response"));
const serial_1 = require("./serial");
var response_2 = require("./response");
Object.defineProperty(exports, "ClientResponse", { enumerable: true, get: function () { return __importDefault(response_2).default; } });
class Client {
    constructor(options) {
        _Client_headers.set(this, new cross_fetch_1.Headers({
            Accept: Client.DEFAULT_ACCEPT_PREFERENCE
        }));
        _Client_serializers.set(this, new serial_1.Serializers({
            'application/x-www-form-urlencoded': serial_1.Serializers.URL_ENCODED_FORM_DATA,
            'multipart/form-data': serial_1.Serializers.MULTIPART_FORM_DATA,
            'text/plain': serial_1.Serializers.PLAIN_TEXT_FORM_DATA
        }));
        if ((options === null || options === void 0 ? void 0 : options.headers) != null) {
            mergeHeaders(__classPrivateFieldGet(this, _Client_headers, "f"), options.headers);
        }
        if ((options === null || options === void 0 ? void 0 : options.serializers) != null) {
            __classPrivateFieldGet(this, _Client_serializers, "f").merge(options.serializers);
        }
    }
    static get DEFAULT_ACCEPT_PREFERENCE() {
        return 'application/vnd.siren+json,application/json;q=0.9,*/*;q=0.8';
    }
    get headers() {
        return __classPrivateFieldGet(this, _Client_headers, "f");
    }
    get serializers() {
        return __classPrivateFieldGet(this, _Client_serializers, "f");
    }
    fetch(input, init) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, cross_fetch_1.fetch)(input, makeRequestInit(this.headers, init));
            return new response_1.default(response);
        });
    }
    follow(link) {
        return isLinkLike(link) ? this.fetch(link.href) : Promise.reject('cannot follow a link without an href');
    }
    submit(action) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(action.href);
            const method = (_a = action.method) !== null && _a !== void 0 ? _a : 'GET';
            const requestInit = { method };
            if (action.fields != null && action.fields.length > 0) {
                if (['GET', 'DELETE'].includes(method)) {
                    yield this.serializeToQuery(core_1.Action.of(action), url);
                }
                else {
                    yield this.serializeToBody(core_1.Action.of(action), requestInit);
                }
            }
            return this.fetch(url.toString(), requestInit);
        });
    }
    serializeToQuery(action, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializer = __classPrivateFieldGet(this, _Client_serializers, "f").get('application/x-www-form-urlencoded');
            if (serializer == null) {
                throw new Error('No serializer found for application/x-www-form-urlencoded');
            }
            const serialization = yield serializer(action);
            url.search = serialization.toString();
        });
    }
    serializeToBody(action, requestInit) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const mimeType = (_a = action.type) !== null && _a !== void 0 ? _a : 'application/x-www-form-urlencoded';
            const serializer = __classPrivateFieldGet(this, _Client_serializers, "f").get(mimeType);
            if (serializer == null) {
                throw new Error(`No serializer found for ${mimeType}`);
            }
            const result = yield serializer(core_1.Action.of(action));
            if ((0, serial_1.isSerialization)(result)) {
                requestInit.body = result.body;
                requestInit.headers = {
                    'Content-Type': result.mediaType
                };
            }
            else {
                requestInit.body = result;
            }
        });
    }
}
exports.default = Client;
_Client_headers = new WeakMap(), _Client_serializers = new WeakMap();
function mergeHeaders(target, source) {
    (0, merge_1.merge)(target, source, (source) => source instanceof cross_fetch_1.Headers);
}
function makeRequestInit(headers, init) {
    headers = new cross_fetch_1.Headers(headers);
    if ((init === null || init === void 0 ? void 0 : init.headers) != null) {
        mergeHeaders(headers, init.headers);
    }
    return Object.assign(Object.assign({}, init), { headers });
}
function isLinkLike(value) {
    return (0, type_guard_1.isRecord)(value) && (0, type_guard_1.isString)(value.href);
}
