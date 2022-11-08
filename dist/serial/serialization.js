"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSerialization = void 0;
const type_guard_1 = require("@siren-js/core/dist/util/type-guard");
function isSerialization(value) {
    return ((0, type_guard_1.isRecord)(value) &&
        (typeof value.contentType === 'string' || value.contentType == null) &&
        (typeof value.body === 'object' || typeof value.body === 'string'));
}
exports.isSerialization = isSerialization;
