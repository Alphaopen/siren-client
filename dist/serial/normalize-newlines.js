"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizeNewlines = (s) => s.replace(/\r\n|\r(?!\n)|\n/g, '\r\n');
exports.default = normalizeNewlines;
