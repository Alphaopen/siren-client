"use strict";
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
var _Entry_name, _Entry_value;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
/**
 * Represents an [entry](https://xhr.spec.whatwg.org/#concept-formdata-entry) as
 * defined in WHATWG's XMLHttpRequest standard.
 */
class Entry {
    /**
     * Implementation of a subset of the XMLHttpRequest standard's algorithm to
     * [create an entry](https://xhr.spec.whatwg.org/#create-an-entry). Namely,
     * `Blob` values and the optional `filename` parameter aren't currently
     * supported.
     */
    constructor(name, value) {
        _Entry_name.set(this, void 0);
        _Entry_value.set(this, void 0);
        __classPrivateFieldSet(this, _Entry_name, name, "f");
        __classPrivateFieldSet(this, _Entry_value, value, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _Entry_name, "f");
    }
    get value() {
        return __classPrivateFieldGet(this, _Entry_value, "f");
    }
}
exports.Entry = Entry;
_Entry_name = new WeakMap(), _Entry_value = new WeakMap();
