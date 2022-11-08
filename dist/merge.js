"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const type_guard_1 = require("@siren-js/core/dist/util/type-guard");
function merge(target, source, isTarget) {
    if (isTarget(source)) {
        source.forEach((value, name) => target.set(name, value));
    }
    else if (Array.isArray(source)) {
        source.forEach(([name, value]) => target.set(name, value));
    }
    else if ((0, type_guard_1.isRecord)(source)) {
        Object.keys(source).forEach((name) => target.set(name, source[name]));
    }
}
exports.merge = merge;
