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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMultipartFormData = void 0;
const entry_list_1 = require("./entry-list");
const normalize_newlines_1 = __importDefault(require("./normalize-newlines"));
const CRLF = '\r\n';
function toMultipartFormData(entryList) {
    return __awaiter(this, void 0, void 0, function* () {
        const boundary = makeBoundaryString();
        const body = yield toMultipartBody(entryList, boundary);
        return {
            body,
            mediaType: `multipart/form-data; boundary="${boundary}"`
        };
    });
}
exports.toMultipartFormData = toMultipartFormData;
function makeBoundaryString() {
    const timestamp = Date.now().toString();
    const padding = Math.floor(Math.random() * 100000).toString();
    const boundary = `${timestamp}${padding}`;
    return `${'-'.repeat(50 - boundary.length)}${boundary}`;
}
function toMultipartBody(entryList, boundary) {
    return __awaiter(this, void 0, void 0, function* () {
        const parts = yield toParts(entryList);
        const boundaryLine = `--${boundary}${CRLF}`;
        return `${boundaryLine}${parts.join(boundaryLine)}--${boundary}--`;
    });
}
function toParts(entryList) {
    return Promise.all(entryList.map((entry) => toPart(normalize(entry))));
}
function normalize(entry) {
    const name = (0, normalize_newlines_1.default)(entry.name);
    const value = typeof entry.value === 'string' ? (0, normalize_newlines_1.default)(entry.value) : entry.value;
    return new entry_list_1.Entry(name, value);
}
function toPart(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const headerFields = headers(entry);
        const value = typeof entry.value === 'string' ? entry.value : yield entry.value.text();
        return `${headerFields}${CRLF}${CRLF}${value}${CRLF}`;
    });
}
function headers(entry) {
    let result = `Content-Disposition: form-data; name="${escape(entry.name)}"`;
    if (typeof entry.value !== 'string') {
        result += `; filename="${escape(entry.value.name)}"`;
        result += CRLF;
        const mediaType = entry.value.type === '' ? 'application/octet-stream' : entry.value.type;
        result += `Content-Type: ${mediaType}`;
    }
    return result;
}
const escape = (s) => s.replace(/\n/g, '%0A').replace(/\r/g, '%0D').replace(/"/g, '%22');
