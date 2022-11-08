"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNameValuePairs = void 0;
const normalize_newlines_1 = __importDefault(require("./normalize-newlines"));
/**
 * Implementation of the algorithm to
 * [convert an entry list to a list of name-value pairs](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#converting-an-entry-list-to-a-list-of-name-value-pairs),
 * from the WHATWG's HTML standard.
 */
function toNameValuePairs(entryList) {
    return entryList.map(toNameValuePair);
}
exports.toNameValuePairs = toNameValuePairs;
function toNameValuePair(entry) {
    const name = (0, normalize_newlines_1.default)(entry.name);
    const value = typeof entry.value === 'string' ? entry.value : entry.value.name;
    return [name, (0, normalize_newlines_1.default)(value)];
}
