"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEntryList = exports.Entry = void 0;
const type_guard_1 = require("@siren-js/core/dist/util/type-guard");
const file_1 = require("@web-std/file");
const entry_1 = require("./entry");
var entry_2 = require("./entry");
Object.defineProperty(exports, "Entry", { enumerable: true, get: function () { return entry_2.Entry; } });
/**
 * Converts an `Action` to an `EntryList`. This is an implementation of the
 * algorithm for
 * [constructing the entry list](https://github.com/siren-js/spec-extensions#constructing-the-entry-list),
 * as defined in our Siren specification extensions.
 */
function toEntryList(action) {
    if (!isArray(action.fields)) {
        return [];
    }
    const entryList = [];
    for (const field of action.fields) {
        if (isSkippableField(field)) {
            continue;
        }
        switch (field.type) {
            case 'checkbox':
                appendCheckbox(entryList, field);
                break;
            case 'file':
                appendFileUpload(entryList, field);
                break;
            case 'radio':
                appendRadioButton(entryList, field);
                break;
            case 'select':
                appendSelect(entryList, field);
                break;
            default:
                appendEntry(entryList, field.name, coerceToString(field.value));
        }
    }
    return entryList;
}
exports.toEntryList = toEntryList;
const isArray = Array.isArray;
const isSkippableField = (field) => field.name == null || field.name === '' || !!field.disabled || field.type === 'image';
/**
 * Appends a [`checkbox` field](https://github.com/siren-js/spec-extensions#checkbox-fields)
 * to the given `entryList`, if it is
 * [checked](https://github.com/siren-js/spec-extensions#checked)
 * @see appendEntry
 */
function appendCheckbox(entryList, field) {
    if (field.checked) {
        appendEntry(entryList, field.name, coerceToString(field.value, 'on'));
    }
}
/**
 * Implementation of the algorithm to
 * [append an entry](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#append-an-entry)
 * to `entryList` given a `name` and a `value`, as defined in the HTML standard.
 */
function appendEntry(entryList, name, value) {
    name = convert(name);
    value = typeof value === 'string' ? convert(value) : value;
    entryList.push(new entry_1.Entry(name, value));
}
/**
 * Converts a string into a [scalar string value](https://infra.spec.whatwg.org/#javascript-string-convert)
 */
const convert = (s) => s.replace(/[\uD800-\uDFFF]/g, '\uFFFD');
const isBlob = (value) => (0, type_guard_1.isRecord)(value) &&
    typeof value.size === 'number' &&
    typeof value.type === 'string' &&
    typeof value.arrayBuffer === 'function' &&
    typeof value.slice === 'function' &&
    typeof value.stream === 'function' &&
    typeof value.text === 'function';
const isFile = (value) => (0, type_guard_1.isRecord)(value) && typeof value.lastModified === 'number' && typeof value.name === 'string' && isBlob(value);
/**
 * Appends a [`file` field](https://github.com/siren-js/spec-extensions#file-fields)
 * to the given `entryList`
 * @see appendEntry
 */
function appendFileUpload(entryList, field) {
    const { name, files } = field;
    if (isArray(files)) {
        const selectedFiles = files.filter(isFile);
        if (selectedFiles.length > 0) {
            selectedFiles.forEach((file) => {
                appendEntry(entryList, name, file);
            });
        }
        else {
            appendEntry(entryList, name, emptyFile());
        }
    } /* istanbul ignore next: can't test in Node */
    else if (isFileList(files) && files.length > 0) {
        [...files].forEach((file) => {
            appendEntry(entryList, name, file);
        });
    }
    else {
        appendEntry(entryList, name, emptyFile());
    }
}
const emptyFile = () => new file_1.File([], '', { type: 'application/octet-stream' });
/**
 * Cross-platform type guard for `FileList`
 */
/* istanbul ignore next: can't test in Node */
const isFileList = (value) => typeof FileList !== 'undefined' && value instanceof FileList;
/**
 * Appends the first [checked](https://github.com/siren-js/spec-extensions#checked-1)
 * [radio button](https://github.com/siren-js/spec-extensions#radio-object) of a
 * [`radio` field](https://github.com/siren-js/spec-extensions#radio-fields) to
 * the given `entryList`
 * @see appendEntry
 */
function appendRadioButton(entryList, field) {
    if (isArray(field.group)) {
        const radio = field.group.find(isCheckedRadio);
        if (radio !== undefined) {
            appendEntry(entryList, field.name, coerceToString(radio.value, 'on'));
        }
    }
}
const isCheckedRadio = (value) => (0, type_guard_1.isRecord)(value) && !!value.checked;
/**
 * Appends all [selected](https://github.com/siren-js/spec-extensions#selected)
 * [`options`](https://github.com/siren-js/spec-extensions#options) of a
 * [`select` field](https://github.com/siren-js/spec-extensions#select-fields) to
 * the given `entryList`
 * @see appendEntry
 */
function appendSelect(entryList, field) {
    if (isArray(field.options)) {
        field.options.forEach((option) => {
            if (isSelectedOption(option)) {
                appendEntry(entryList, field.name, coerceToString(option.value, option.title));
            }
        });
    }
}
const isSelectedOption = (value) => (0, type_guard_1.isRecord)(value) && isPrimitive(value.title) && !!value.selected && !value.disabled;
const isPrimitive = (value) => ['string', 'number', 'boolean'].includes(typeof value);
const coerceToString = (value, defaultValue = '') => String(value !== null && value !== void 0 ? value : defaultValue);
